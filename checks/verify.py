#!/usr/bin/env python3
"""
verify.py — 把"做完了"变成可执行断言。

用法：
    python checks/verify.py <verdict.json>
    python checks/verify.py <verdict.json> --selftest

退出码：
    0  判决合法且 pass
    1  判决不合法（schema 违规 / 逻辑自相矛盾）
    2  判决合法但 pass=false（打回）
    3  --selftest 未通过（拒绝出判决）

设计要点：
    · **verdict 缺失 = fail**，不是 pass。沉默绝不等于通过。
    · `--selftest` 红不了就拒绝出判决——不靠"建议先跑"的纪律。
    · 失败项必须有 repro，否则不可信，直接判不合法。
"""

import json
import sys
from pathlib import Path

# Windows 控制台默认 GBK，中文会乱码；输出是给模型/人读的，强制 UTF-8。
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

VALID_IMPACT = {"high", "med", "low"}


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
    """返回错误列表。空列表表示合法。"""
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

    return errs


def selftest() -> None:
    """负样本自检：故意喂错误判决，必须全部被拒。红不了就拒绝出判决。"""
    cases = [
        ("pass=true 但有失败项", {"pass": True, "failed": [{"item": "x", "impact": "high", "repro": "y"}], "reviewed_at": "t"}),
        ("pass=false 但无失败项", {"pass": False, "failed": [], "reviewed_at": "t"}),
        ("缺少 repro", {"pass": False, "failed": [{"item": "x", "impact": "high", "repro": ""}], "reviewed_at": "t"}),
        ("impact 非法", {"pass": False, "failed": [{"item": "x", "impact": "urgent", "repro": "y"}], "reviewed_at": "t"}),
        ("缺少 pass", {"failed": [], "reviewed_at": "t"}),
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

    print(f"[SELFTEST OK] {len(cases)} 个负样本全部被拒，正样本通过")


def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    do_selftest = "--selftest" in sys.argv

    if do_selftest:
        selftest()
        if not args:
            return

    if not args:
        fail("用法：verify.py <verdict.json> [--selftest]")

    v = load(Path(args[0]))
    errs = validate(v)
    if errs:
        for e in errs:
            print(f"[INVALID] {e}", file=sys.stderr)
        sys.exit(1)

    # 摘要：主代理只读这一行
    if v["pass"]:
        print("[PASS]")
    else:
        highs = [f for f in v["failed"] if f["impact"] == "high"]
        print(f"[FAIL] {len(v['failed'])} 项失败，其中 high {len(highs)} 项")
        for f in highs:
            print(f"  high: {f['item']}")
            print(f"        repro: {f['repro']}")
        sys.exit(2)


if __name__ == "__main__":
    main()
