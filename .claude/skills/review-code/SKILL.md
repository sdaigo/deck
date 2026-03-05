---
name: review-code
description: code-reviewer、security-reviewer、a11y-auditorをサブエージェントで並行起動する。コード変更のレビューが必要なときに使用する。
user-invocable: true
allowed-tools: Read, Bash, Glob, Grep, Task
---

# コードレビュー

引数: `/review-code [対象パス|--staged]`

以下を**並行起動**:
- code-reviewer (sonnet): 品質レビュー。対象: `$ARGUMENTS`
- security-reviewer (sonnet): セキュリティレビュー。対象: `$ARGUMENTS`
- a11y-auditor (sonnet): アクセシビリティ監査（UI変更がある場合のみ）

全エージェントの結果を統合してユーザーに報告する。
