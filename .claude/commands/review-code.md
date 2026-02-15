---
description: コードレビューをサブエージェントチームで並行実行
---

# コードレビュー

引数: `/review-code [対象パス|--staged]`

## 手順

1. 以下のエージェントを**並行起動**:
   - code-reviewer (sonnet): 品質レビュー。対象: `$ARGUMENTS`
   - security-reviewer (sonnet): セキュリティレビュー。対象: `$ARGUMENTS`
   - a11y-auditor (sonnet): アクセシビリティ監査（UI変更がある場合のみ）。対象: `$ARGUMENTS`
2. 全エージェントの結果を統合してユーザーに報告
