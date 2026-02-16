# Git運用ルール

プロジェクト固有の scope 等は `docs/development-guidelines.md` を参照。

## ブランチ戦略

- `main` - 本番デプロイ可能
- `develop` - 開発統合ブランチ。リリース準備が整ったら main にマージ
- `feature/[機能名]` - develop から分岐 → develop にマージ
- `fix/[修正内容]` - develop から分岐 → develop にマージ
- `hotfix/[修正内容]` - main から分岐 → main にマージ後、develop にも反映

### マージフロー

```
feature/xxx ──PR──→ develop ──リリース──→ main
fix/xxx     ──PR──→ develop
hotfix/xxx  ──PR──→ main（マージ後 develop にも反映）
```

## コミットメッセージ

Conventional Commits 形式: `<type>(<scope>): <subject>`

主要 type: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`

subject は命令形で簡潔に。句点なし。

## プルリクエスト

作成前チェック: Lint + Format、型チェック、ユニットテスト

PR 作成: `gh pr create` で作成。マージ先は上記マージフローに従う。

レビュープロセス: セルフレビュー → CI → レビュアー → フィードバック対応 → Squash merge

## コードレビュー基準

- 機能性: 要件充足、エッジケース、エラーハンドリング
- 可読性: 命名、関数サイズ、ネスト深度
- パフォーマンス: 不要な再レンダリング、N+1クエリ
- セキュリティ: 入力バリデーション、認可チェック
- アクセシビリティ: aria属性、タッチターゲット、カラーコントラスト
