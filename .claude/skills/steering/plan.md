# 計画モード

## 目的

新しい機能や変更のためのステアリングファイルを作成する。

## 手順

### 1. ステアリングディレクトリの作成

現在の日付を取得し、`.steering/[YYYYMMDD]-[機能名]/` の形式でディレクトリを作成する。

### 2. 永続ドキュメントの確認

**注意**: `/feature-design` コマンドのステップ2で既に `docs/` を読み込んでいる場合はスキップする。

直接呼び出された場合のみ、以下を読んでプロジェクトの方針を理解する:

- `docs/product-requirements.md` - プロダクト要求定義書
- `docs/functional-design.md` - 機能設計書
- `docs/architecture.md` - アーキテクチャ設計書
- `docs/project-structure.md` - プロジェクト構造定義書
- `docs/development-guidelines.md` - 開発ガイドライン
- `docs/glossary.md` - 用語集

### 3. テンプレートからファイル作成

以下のテンプレートを読み込み、プレースホルダーを具体的な内容に置き換えてファイルを作成:

- `.claude/skills/steering/templates/requirements.md` → `.steering/[日付]-[機能名]/requirements.md`
- `.claude/skills/steering/templates/design.md` → `.steering/[日付]-[機能名]/design.md`
- `.claude/skills/steering/templates/tasklist.md` → `.steering/[日付]-[機能名]/tasklist.md`

**tasklist.md の責務分担**: plan.md はテンプレートの配置と基本構造（フェーズ見出し等）の作成のみ行う。具体的なタスク分解は `/feature-design` のステップ6で planner エージェント（opus）が実行する。plan.md でタスクの詳細を書き込まないこと。

**重要**: ファイルを作成したらユーザーにレビューを依頼すること。ユーザーから明示的に承認がない限り次のステップには進まないこと。
