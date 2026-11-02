#!/usr/bin/env python3
"""
verify.py — 把"做完了"变成可执行断言。

用法：
    python checks/verify.py <verdict.json>
    python checks/verify.py <verdict.json> --selftest
    python checks/verify.py <verdict.json> --root <交付物根目录>
    python checks/verify.py <verdict.json> --no-log

退出码：
    0  判决合法且 pass，且声明的交付物全部核验通过
    1  判决不合法（schema 违规 / 逻辑自相矛盾 / 声明的交付物核验失败）
    2  判决合法但 pass=false（打回）
    3  --selftest 未通过（拒绝出判决）

设计要点：
    · **verdict 缺失 = fail**，不是 pass。沉默绝不等于通过。
    · `--selftest` 红不了就拒绝出判决——不靠"建议先跑"的纪律。
    · 失败项必须有 repro，否则不可信，直接判不合法。
    · **脚本只证明它核验过的部分**。摘要末尾固定列出「未核验」，
      防止把 [PASS] 误读成"整体合格"。
    · 每次运行把完整记录落盘到 .verdict-log/，主代理按需调取，不必进上下文。
"""

import fnmatch
import hashlib
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

# Windows 控制台默认 GBK，中文会乱码；输出是给模型/人读的，强制 UTF-8。
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

VALID_IMPACT = {"high", "med", "low"}
SCHEMA_VERSION = 2


def fail(msg: str, code: int = 1) -> None:
    print(f"[INVALID] {msg}", file=sys.stderr)
    sys.exit(code)


def load(path: Path) -> dict:
    if not path.exists():
        fail(f"verdict 文件不存在：{path}（缺失即视为 fail，不是 pass）")
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        fail(f"JSON 解析失败：{e}")


def validate(v: dict) -> list[str]:
    """返回错误列表。空列表表示合法。只查判决自身的结构与自相矛盾。"""
    errs: list[str] = []

    for k in ("pass", "failed", "reviewed_at"):
        if k not in v:
            errs.append(f"缺少必填字段：{k}")

    if not isinstance(v.get("pass"), bool):
        errs.append("pass 必须是布尔值")

    failed = v.get("failed")
    if not isinstance(failed, list):
        errs.append("failed 必须是数组")
        return errs

    # 逻辑自检：pass=true 却不能有失败项
    if v.get("pass") is True and failed:
        errs.append("pass=true 但 failed 非空——自相矛盾")

    # pass=false 却没有任何失败项，等于没说清为什么打回
    if v.get("pass") is False and not failed:
        errs.append("pass=false 但 failed 为空——打回必须给出具体失败项")

    for i, f in enumerate(failed):
        if not isinstance(f, dict):
            errs.append(f"failed[{i}] 不是对象")
            continue
        for k in ("item", "impact", "repro"):
            if k not in f:
                errs.append(f"failed[{i}] 缺少 {k}")
        if f.get("impact") not in VALID_IMPACT:
            errs.append(f"failed[{i}].impact 必须是 {VALID_IMPACT}，实际 {f.get('impact')!r}")
        # 没有 repro 的失败项不可信
        if not str(f.get("repro", "")).strip():
            errs.append(f"failed[{i}].repro 为空——无复现方式的失败项不可信")

    # artifacts 结构
    arts = v.get("artifacts")
    if arts is not None:
        if not isinstance(arts, list):
            errs.append("artifacts 必须是数组")
        else:
            for i, a in enumerate(arts):
                if not isinstance(a, dict):
                    errs.append(f"artifacts[{i}] 不是对象")
                    continue
                if not str(a.get("path", "")).strip():
                    errs.append(f"artifacts[{i}].path 为空")
                sha = a.get("sha256")
                if sha is not None:
                    s = str(sha)
                    if len(s) != 64 or any(c not in "0123456789abcdef" for c in s):
                        errs.append(f"artifacts[{i}].sha256 必须是 64 位小写十六进制")

    # scope 结构
    scope = v.get("scope")
    if scope is not None:
        if not isinstance(scope, dict):
            errs.append("scope 必须是对象")
        else:
            for k in ("base", "allow"):
                if k not in scope:
                    errs.append(f"scope 缺少 {k}")
            if not isinstance(scope.get("allow", []), list):
                errs.append("scope.allow 必须是数组")
            if not str(scope.get("base", "")).strip():
                errs.append("scope.base 不能为空")

    return errs


def sha256_of(p: Path) -> str:
    h = hashlib.sha256()
    with p.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def resolve_artifact(root: Path, rel: str) -> Path:
    p = Path(rel)
    return p if p.is_absolute() else (root / p)


def check_artifacts(v: dict, root: Path) -> tuple[list[str], list[str]]:
    """核验交付物白名单。返回 (错误列表, 未核验说明列表)。"""
    errs: list[str] = []
    unchecked: list[str] = []
    arts = v.get("artifacts")

    if not arts:
        unchecked.append("交付物：判决未声明 artifacts，本次未核验任何产出文件")
        return errs, unchecked

    for i, a in enumerate(arts):
        rel = str(a.get("path", "")).strip()
        if not rel:
            continue
        target = resolve_artifact(root, rel)

        if not target.exists():
            errs.append(f"artifacts[{i}] 声明的交付物不存在：{target}")
            continue
        if not target.is_file():
            errs.append(f"artifacts[{i}] 不是普通文件：{target}")
            continue
        if target.stat().st_size == 0:
            errs.append(f"artifacts[{i}] 是空文件：{target}")

        want = a.get("sha256")
        if want is None:
            unchecked.append(f"交付物 {rel}：只核验了存在与大小，未核验内容（未提供 sha256）")
            continue
        got = sha256_of(target)
        if got != want:
            errs.append(f"artifacts[{i}] sha256 不匹配：{rel}（期望 {want}，实际 {got}）")

    return errs, unchecked


def _git(args: list[str], cwd: Path) -> subprocess.CompletedProcess | None:
    """跑 git，强制 UTF-8。仓库路径常含中文，Windows 默认 GBK 会解码崩溃。"""
    try:
        return subprocess.run(
            ["git", *args], cwd=str(cwd), capture_output=True,
            encoding="utf-8", errors="replace", timeout=60,
        )
    except (OSError, subprocess.SubprocessError):
        return None


def git_changed_files(base: str, cwd: Path) -> tuple[list[str] | None, str | None]:
    """返回 (改动文件列表, 失败原因)。失败不当作违规，只当作未核验。"""
    # 必须用 `git diff <base>`（工作区 vs base），不能用 `base...HEAD`：
    # 后者在 base=HEAD 时恒为空，会把未提交改动全部漏掉。
    top = _git(["rev-parse", "--show-toplevel"], cwd)
    if top is None:
        return None, "无法执行 git"
    if top.returncode != 0:
        return None, f"git 仓库定位失败：{(top.stderr or '').strip()[:200]}"
    repo = (top.stdout or "").strip()
    try:
        prefix = str(Path(cwd).resolve().relative_to(Path(repo).resolve())).replace("\\", "/")
    except (ValueError, OSError):
        prefix = ""

    r = _git(["diff", "--name-only", base], cwd)
    if r is None:
        return None, "无法执行 git diff"
    if r.returncode != 0:
        return None, f"git diff 失败：{(r.stderr or '').strip()[:200]}"

    # 未跟踪文件同样算改动，否则新建文件可绕过白名单
    u = _git(["ls-files", "--others", "--exclude-standard"], cwd)
    untracked = [x for x in (u.stdout or "").splitlines() if x.strip()] if (u and u.returncode == 0) else []

    files = [x for x in (r.stdout or "").splitlines() if x.strip()]
    seen = set(files)
    for f in untracked:
        if f not in seen:
            files.append(f)
            seen.add(f)

    # git 在子目录执行时返回的已是相对 cwd 的路径；补上 cwd 相对仓库根的层级，
    # 使 allow 始终按仓库根路径书写，判定不随调用位置漂移。
    if prefix:
        files = [f if f.startswith(prefix + "/") else f"{prefix}/{f}" for f in files]

    # 排除本脚本自己的日志目录，否则落盘记录会把判决本身判成越界
    files = [f for f in files
             if not f.startswith(".verdict-log/") and "/.verdict-log/" not in f]
    return files, None


def path_allowed(path: str, allow: list[str]) -> bool:
    norm = path.replace("\\", "/")
    # git 在仓库根执行时可能返回 `./x` 前缀，先归一化掉
    while norm.startswith("./"):
        norm = norm[2:]
    for pat in allow:
        p = str(pat).replace("\\", "/").strip().rstrip("/")
        while p.startswith("./"):
            p = p[2:]
        if not p:
            continue
        if any(ch in p for ch in "*?["):
            if fnmatch.fnmatch(norm, p):
                return True
            # `docs/*.md` 允许匹配到子目录里的同名模式
            if fnmatch.fnmatch(norm, p.replace("*", "**")):
                return True
        elif norm == p or norm.startswith(p + "/"):
            return True
    return False


def check_scope(v: dict, cwd: Path) -> tuple[list[str], list[str], dict]:
    """核验变更范围。返回 (错误列表, 未核验说明列表, 明细)。"""
    errs: list[str] = []
    unchecked: list[str] = []
    detail: dict = {}
    scope = v.get("scope")

    if scope is None:
        unchecked.append("变更范围：判决未声明 scope，本次未核验改动是否越界")
        return errs, unchecked, detail

    base = str(scope.get("base", "")).strip()
    allow = scope.get("allow", [])
    files, why = git_changed_files(base, cwd)
    if files is None:
        unchecked.append(f"变更范围：{why}")
        return errs, unchecked, detail

    detail = {"base": base, "changed": files, "allow": allow}
    outside = [f for f in files if not path_allowed(f, allow)]
    if outside:
        detail["outside"] = outside
        preview = "、".join(outside[:5])
        more = f" 等 {len(outside)} 个" if len(outside) > 5 else ""
        errs.append(f"改动越界：{preview}{more} 不在 scope.allow 内")
    return errs, unchecked, detail


def selftest() -> None:
    """负样本自检：故意喂错误判决，必须全部被拒。红不了就拒绝出判决。"""
    cases = [
        ("pass=true 但有失败项", {"pass": True, "failed": [{"item": "x", "impact": "high", "repro": "y"}], "reviewed_at": "t"}),
        ("pass=false 但无失败项", {"pass": False, "failed": [], "reviewed_at": "t"}),
        ("缺少 repro", {"pass": False, "failed": [{"item": "x", "impact": "high", "repro": ""}], "reviewed_at": "t"}),
        ("impact 非法", {"pass": False, "failed": [{"item": "x", "impact": "urgent", "repro": "y"}], "reviewed_at": "t"}),
        ("缺少 pass", {"failed": [], "reviewed_at": "t"}),
        ("artifacts 缺 path", {"pass": True, "failed": [], "reviewed_at": "t", "artifacts": [{"note": "n"}]}),
        ("sha256 非法", {"pass": True, "failed": [], "reviewed_at": "t", "artifacts": [{"path": "a", "sha256": "zzz"}]}),
        ("scope 缺 allow", {"pass": True, "failed": [], "reviewed_at": "t", "scope": {"base": "HEAD"}}),
        ("scope.base 为空", {"pass": True, "failed": [], "reviewed_at": "t", "scope": {"base": " ", "allow": []}}),
    ]
    for name, case in cases:
        if not validate(case):
            print(f"[SELFTEST FAILED] 该被拒却通过了：{name}", file=sys.stderr)
            sys.exit(3)

    # 正样本必须通过
    good = {"pass": False, "failed": [{"item": "x", "impact": "high", "repro": "cmd"}], "reviewed_at": "t"}
    if validate(good):
        print("[SELFTEST FAILED] 合法判决被误拒", file=sys.stderr)
        sys.exit(3)

    # 路径白名单匹配逻辑
    if not path_allowed("src/a/b.py", ["src/a"]):
        print("[SELFTEST FAILED] 前缀匹配失效", file=sys.stderr)
        sys.exit(3)
    if not path_allowed("docs/x.md", ["docs/*.md"]):
        print("[SELFTEST FAILED] glob 匹配失效", file=sys.stderr)
        sys.exit(3)
    if path_allowed("src/other.py", ["src/a"]):
        print("[SELFTEST FAILED] 越界路径被误判为允许", file=sys.stderr)
        sys.exit(3)

    print(f"[SELFTEST OK] {len(cases)} 个负样本全部被拒，正样本与路径匹配通过")


def write_log(record: dict, verdict_path: Path) -> Path | None:
    try:
        logdir = verdict_path.parent / ".verdict-log"
        logdir.mkdir(parents=True, exist_ok=True)
        stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ")
        out = logdir / f"verdict-{stamp}.json"
        out.write_text(json.dumps(record, ensure_ascii=False, indent=2), encoding="utf-8")
        return out
    except OSError as e:
        print(f"[WARN] 完整记录落盘失败：{e}", file=sys.stderr)
        return None


def main() -> None:
    argv = sys.argv[1:]
    args = [a for a in argv if not a.startswith("--")]
    do_selftest = "--selftest" in argv
    no_log = "--no-log" in argv

    root = None
    if "--root" in argv:
        i = argv.index("--root")
        if i + 1 >= len(argv):
            fail("--root 需要跟一个目录")
        # 相对路径按当前工作目录解析，不按 verdict 文件位置——
        # 否则 `--root ..` 会随 verdict 文件所在目录漂移，难以预期。
        root = Path(argv[i + 1]).resolve()
        if not root.is_dir():
            fail(f"--root 不是目录：{root}")
        args = [a for a in args if a != argv[i + 1]]

    if do_selftest:
        selftest()
        if not args:
            return

    if not args:
        fail("用法：verify.py <verdict.json> [--selftest] [--root DIR] [--no-log]")

    verdict_path = Path(args[0])
    v = load(verdict_path)

    # ── 1. 判决自身 ──
    errs = validate(v)
    if errs:
        for e in errs:
            print(f"[INVALID] {e}", file=sys.stderr)
        sys.exit(1)

    # ── 2. 交付物白名单 ──
    base_dir = root if root is not None else verdict_path.parent
    art_errs, unchecked = check_artifacts(v, base_dir)
    errs.extend(art_errs)

    # ── 3. 变更范围 ──
    scope_errs, scope_unchecked, scope_detail = check_scope(v, base_dir)
    errs.extend(scope_errs)
    unchecked.extend(scope_unchecked)

    record = {
        "schema_version": SCHEMA_VERSION,
        "verified_at": datetime.now(timezone.utc).isoformat(),
        "verdict_path": str(verdict_path.resolve()),
        "root": str(base_dir.resolve()),
        "verdict": v,
        "artifact_errors": art_errs,
        "scope_errors": scope_errs,
        "scope_detail": scope_detail,
        "unchecked": unchecked,
        "result": None,
    }

    if errs:
        for e in errs:
            print(f"[INVALID] {e}", file=sys.stderr)
        record["result"] = "invalid"
        if not no_log:
            p = write_log(record, verdict_path)
            if p:
                print(f"[LOG] 完整记录：{p}", file=sys.stderr)
        sys.exit(1)

    # ── 摘要：主代理只读这一段 ──
    if v["pass"]:
        checked = []
        if v.get("artifacts"):
            checked.append(f"{len(v['artifacts'])} 个交付物")
        if scope_detail.get("changed") is not None:
            checked.append(f"{len(scope_detail['changed'])} 处改动未越界")
        head = f"[PASS] 已核验：{'、'.join(checked)}" if checked else "[PASS]"
        print(head)
        record["result"] = "pass"
        code = 0
    else:
        highs = [f for f in v["failed"] if f["impact"] == "high"]
        print(f"[FAIL] {len(v['failed'])} 项失败，其中 high {len(highs)} 项")
        for f in highs:
            print(f"  high: {f['item']}")
            print(f"        repro: {f['repro']}")
        record["result"] = "reject"
        code = 2

    # 固定输出未核验项——这是防止把 PASS 当"整体合格"的关键
    if unchecked:
        print("未核验（下列内容不在本次判决的证明范围内）：")
        for u in unchecked:
            print(f"  - {u}")

    if not no_log:
        p = write_log(record, verdict_path)
        if p:
            print(f"[LOG] 完整记录：{p}")

    sys.exit(code)


if __name__ == "__main__":
    main()
