---
description: アクセシビリティ監査をサブエージェントで実行
---

# アクセシビリティ監査

引数: `/audit-a11y [対象パス]`

## 手順

1. 対象ファイル数に応じてエージェントを起動:
   - **10件以下**: a11y-auditor (sonnet) を1つ起動。対象: `$ARGUMENTS`（指定なしの場合は全UIファイル）
   - **10件超**: 3エージェントを並行起動（`src/app/`、`src/features/**/components/`、`src/components/` で分担）
2. 結果を統合してユーザーに報告
