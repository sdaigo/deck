---
name: patch
description: changeset.mdベースの軽量プロセスでバグ修正・小規模改善を実行する。変更ファイルが数個〜10個程度の修正に使用する。
user-invocable: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task
---

# パッチ

引数: `/patch [修正内容の説明]`

**判断基準**: 要件定義やUX設計が必要なら `/feature-design`、1-2行で済むなら `/hotfix` を使う。

## ステップ1: 準備

1. 修正名を `$ARGUMENTS` から生成（例: `login-validation-bug`）
2. `.steering/[YYYYMMDD]-patch-[修正名]/` を作成
3. `develop` から `fix/[修正名]` ブランチを作成

## ステップ2: changeset.md を作成

テンプレート:

```markdown
# Patch: [修正内容]

- 日付: [YYYY-MM-DD]
- タイプ: patch
- ブランチ: fix/[修正名]

## 変更理由
## 影響範囲
## 修正方針

## タスク
- [ ] [タスク1]
- [ ] ...

## 完了チェック
- [ ] 全タスク完了
- [ ] テスト通過
- [ ] レビュー通過
```

ユーザーの承認を得る。

## ステップ3: 修正の実施

タスクを順に実施し、changeset.md のチェックボックスを更新する。

## ステップ4: レビューとテスト

以下を**並行起動**:
- code-reviewer (sonnet)
- security-reviewer (sonnet) - 認証・API・入力処理に関わる場合のみ
- test-runner (haiku)

指摘・失敗があれば修正して再実行。

## ステップ5: 完了と PR 作成

1. changeset.md の完了チェックを更新
2. コミット（`fix:` or `refactor:`）
3. `git push -u origin fix/[修正名]` + `gh pr create --base develop`
4. PR URL を報告。ステアリングディレクトリは削除可能と案内
