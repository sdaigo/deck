# Git運用ルール

プロジェクト固有の scope 等は `docs/development-guidelines.md` を参照。

## ブランチ戦略

- `main` - 本番デプロイ可能
- `develop` - 開発最新 → main
- `feature/[機能名]` → develop
- `fix/[修正内容]` → develop
- `hotfix/[修正内容]` → main + develop

## コミットメッセージ

Conventional Commits 形式: `<type>(<scope>): <subject>`

主要 type: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`

subject は命令形で簡潔に。句点なし。

## プルリクエスト

作成前チェック: Lint + Format、型チェック、ユニットテスト

レビュープロセス: セルフレビュー → CI → レビュアー → フィードバック対応 → Squash merge

## コードレビュー基準

- 機能性: 要件充足、エッジケース、エラーハンドリング
- 可読性: 命名、関数サイズ、ネスト深度
- パフォーマンス: 不要な再レンダリング、N+1クエリ
- セキュリティ: 入力バリデーション、認可チェック
- アクセシビリティ: aria属性、タッチターゲット、カラーコントラスト
