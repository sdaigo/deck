---
name: audit-a11y
description: a11y-auditorサブエージェントでWCAG 2.1 AA準拠のアクセシビリティ監査を実行する。UIコンポーネントの監査が必要なときに使用する。
user-invocable: true
allowed-tools: Read, Bash, Glob, Grep, Task
---

# アクセシビリティ監査

引数: `/audit-a11y [対象パス]`

対象ファイル数に応じてエージェントを起動:
- **10件以下**: a11y-auditor (sonnet) を1つ起動
- **10件超**: 3エージェントを並行起動（`src/app/`、`src/features/**/components/`、`src/components/` で分担）

結果を統合してユーザーに報告する。
