---
description: 小規模なバグ修正・改善を軽量プロセスで実行する
---

# パッチ

引数: `/patch [修正内容の説明]`

## 対象

- バグ修正、小規模な改善、リファクタリング
- 新しい設計判断を伴わないもの
- 変更ファイルが数個〜10個程度

**判断基準**: 要件定義やUX設計が必要なら `/feature-design` を使う。1-2行で済むなら `/hotfix` を検討する。

## ステップ1: 準備

1. コンテキストを確立する:
   - 修正名: `$ARGUMENTS` から簡潔な名前を生成（例: `login-validation-bug`）
   - 日付: `[現在の日付をYYYYMMDD形式で取得]`
   - ステアリングディレクトリ: `.steering/[日付]-patch-[修正名]/`
2. ステアリングディレクトリを作成する
3. `fix/[修正名]` ブランチを作成する

## ステップ2: changeset.md を作成

`.steering/[日付]-patch-[修正名]/changeset.md` を以下のテンプレートで作成する:

```markdown
# Patch: [修正内容]

- 日付: [YYYY-MM-DD]
- タイプ: patch
- ブランチ: fix/[修正名]

## 変更理由

[なぜこの修正が必要か。問題の再現手順やエラー内容を含める]

## 影響範囲

[変更するファイルと影響を受ける箇所をリストアップ]

## 修正方針

[どのように修正するか。簡潔に方針を記述]

## タスク

- [ ] [タスク1]
- [ ] [タスク2]
- [ ] ...

## 完了チェック

- [ ] 全タスク完了
- [ ] テスト通過
- [ ] レビュー通過
```

ユーザーに changeset.md の内容を報告し、承認を得る。

## ステップ3: 修正の実施

1. changeset.md のタスクを順に実施する
2. 各タスク完了時に changeset.md のチェックボックスを更新する
3. タスクの粒度が大きい場合は、タスクごとにコミットする

## ステップ4: レビューとテスト

以下を**並行起動**する:

### code-reviewer

```
Task({
  subagent_type: "code-reviewer",
  description: "code-reviewer: patch レビュー",
  prompt: `
    変更されたファイルをレビューしてください。
    patch のため、既存の動作への影響がないことを重点的に確認してください。
  `
})
```

### security-reviewer（認証・API・入力処理に関わる場合）

```
Task({
  subagent_type: "security-reviewer",
  description: "security-reviewer: patch セキュリティレビュー",
  prompt: `
    .claude/agents/security-reviewer.md を読み込み、ワークフローに従ってレビューしてください。
    変更されたファイルを対象にしてください。
  `
})
```

### test-runner

```
Task({
  subagent_type: "test-runner",
  description: "test-runner: patch テスト",
  prompt: `
    .claude/agents/test-runner.md を読み込み、テストを実行してください。
    モード: --full
  `
})
```

- レビュー指摘があれば修正する
- テスト失敗があれば修正する
- 修正後、再度レビュー・テストを実行する

## ステップ5: 完了

1. changeset.md の完了チェックを更新する
2. 変更ファイルと changeset.md をコミットする
   - メッセージ: `fix: [修正内容]`（バグ修正の場合）
   - メッセージ: `refactor: [修正内容]`（リファクタの場合）
3. ユーザーに完了を報告し、マージ方法を確認する
