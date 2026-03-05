---
name: pre-deploy
description: テスト、ビルド、セキュリティ、環境変数のゲートチェックを実行する。staging/productionへのデプロイ前に使用する。
user-invocable: true
allowed-tools: Read, Bash, Glob, Grep, Task
---

# デプロイ前チェック

引数: `/pre-deploy [staging|production]`（デフォルト: staging）

## 必須チェック（全環境共通）

1. **テスト・Lint**: `docs/development-guidelines.md` のコマンドを実行
2. **ビルド**: ビルドエラーがあれば中断
3. **環境変数**: `.env.example` と照合し設定漏れをユーザーに確認
4. **セキュリティ**: security-reviewer でハードコードされたシークレット等をチェック

## 追加チェック（production のみ）

- a11y-auditor で主要画面のアクセシビリティ確認
- `console.log` の残留チェック
- `TODO` / `FIXME` コメントの残留チェック

## 結果サマリー

```
## Pre-Deploy Check: [環境] - [日時]

### 結果: [PASS / FAIL]

| チェック項目 | 結果 |
|:---|:---|
| テスト | OK / NG |
| 型チェック | OK / NG |
| Lint | OK / NG |
| ビルド | OK / NG |
| 環境変数 | OK / 確認必要 |
| セキュリティ | OK / 指摘あり |
| a11y (prodのみ) | OK / 指摘あり |
```
