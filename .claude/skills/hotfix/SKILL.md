---
name: hotfix
description: 1-3ファイルの緊急軽微修正を最小プロセスで実行する。typo、設定値修正など1文で説明できる修正に使用する。
user-invocable: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task
---

# ホットフィックス

引数: `/hotfix [修正内容の簡潔な説明]`

**判断基準**: 1文で説明できなければ `/patch` を使う。

## ステップ1: 準備

1. 修正名を `$ARGUMENTS` から生成（例: `fix-typo-header`）
2. `.steering/[YYYYMMDD]-hotfix-[修正名]/` を作成
3. `main` から `hotfix/[修正名]` ブランチを作成

## ステップ2: changeset.md を作成

```markdown
# Hotfix: [修正内容]

- 日付: [YYYY-MM-DD]
- タイプ: hotfix
- ブランチ: hotfix/[修正名]

## 変更理由
## 影響範囲

## 完了チェック
- [ ] 修正完了
- [ ] テスト通過
- [ ] レビュー通過
```

## ステップ3: 修正の実施

対象ファイルを修正し、changeset.md の「影響範囲」を更新。

## ステップ4: レビューとテスト

以下を**並行起動**:
- code-reviewer (sonnet): 変更が最小限かつ副作用がないか確認
- test-runner (haiku)

## ステップ5: 完了と PR 作成

1. コミット（`fix: [修正内容]`）
2. `git push -u origin hotfix/[修正名]` + `gh pr create --base main`
3. PR URL を報告。main マージ後 develop にも反映が必要と伝える
4. ステアリングディレクトリは削除可能と案内
