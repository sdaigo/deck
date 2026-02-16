# 要求内容

## 概要

SimpleTodo プロジェクトの初期構築。Vite + React + TypeScript + Tailwind CSS の開発環境をセットアップし、`docs/project-structure.md` で定義されたディレクトリ構造と基盤コードを作成する。

## 背景

`/setup` で 6 つの設計ドキュメントが完成したが、実際のプロジェクトコード（package.json, src/ 等）がまだ存在しない。機能実装の前に、開発環境と基盤コードを構築する必要がある。

## 実装対象の機能

### 1. プロジェクト初期化

- Vite で React + TypeScript プロジェクトを作成
- Tailwind CSS 4 を導入・設定
- Biome 2 を導入・設定
- Vitest + Testing Library を導入・設定
- Playwright を導入・設定
- パスエイリアス（`@/` → `src/`）を設定

### 2. ディレクトリ構造の構築

- `docs/project-structure.md` に定義された `src/` 配下のディレクトリを作成
- 各ディレクトリに barrel file（index.ts）を配置
- 型定義ファイル（`src/types/todo.ts`）を作成

### 3. 基盤コンポーネントの作成

- App コンポーネント（レイアウトの骨格のみ）
- ErrorFallback コンポーネント（Error Boundary のフォールバック UI）
- Toast コンポーネント + useToast フック

### 4. ストレージレイヤーの基盤

- todoStorage（localStorage アダプター）の空実装（interface のみ）
- todoValidator の空実装（interface のみ）

## 受け入れ条件

### プロジェクト初期化

- [ ] `npm run dev` で開発サーバーが起動し、ブラウザで表示できる
- [ ] `npm run build` でエラーなくビルドが完了する
- [ ] `npx biome check src/` で Lint エラーがない
- [ ] `npx tsc --noEmit` で型エラーがない
- [ ] `npx vitest run` でテストが実行できる（最低 1 件のテストが pass）
- [ ] `npx playwright test` で E2E テストが実行できる（最低 1 件のテストが pass）

### ディレクトリ構造

- [ ] `docs/project-structure.md` のディレクトリ構成と一致している
- [ ] パスエイリアス `@/` が `src/` を参照する

### 基盤コンポーネント

- [ ] App コンポーネントが Error Boundary でラップされている
- [ ] ErrorFallback に「再読み込み」と「データをリセット」ボタンがある
- [ ] 「データをリセット」ボタンは確認ダイアログで承認後に実行される
- [ ] ErrorFallback のメッセージが日本語で表示される
- [ ] Toast コンポーネントが error / warning / info の 3 種類を表示できる
- [ ] Toast の error は手動消去のみ（自動消去しない）
- [ ] Toast の warning は 10 秒後、info は 5 秒後に自動消去される
- [ ] Toast にプログレスバーが表示される（warning / info のみ）
- [ ] Toast の error は `aria-live="assertive"`、他は `"polite"` で読み上げられる

### 型定義

- [ ] Todo, FilterType, ToastMessage, StorageSchema の型が定義されている
- [ ] `docs/functional-design.md` のデータモデルと一致している

## 技術的制約

- `docs/architecture.md` のテクノロジースタック・バージョンに準拠
- `docs/development-guidelines.md` のコーディング規約に準拠
- レイヤードアーキテクチャの依存方向を守る（UI → hooks → lib）
- Tailwind CSS のみでスタイリング（カスタム CSS 禁止、index.css の Tailwind ディレクティブを除く）

## 成功指標

- 全受け入れ条件がクリアされている
- `npm run build` のバンドルサイズが 50KB（gzip）以下
- 新しい機能（Todo CRUD 等）の実装にすぐ着手できる状態

## スコープ外

以下はこのフェーズでは実装しない:

- Todo の CRUD 機能（追加・完了・削除）
- useTodos フック
- TodoInput, TodoList, TodoItem, TodoFilter コンポーネント
- フィルタリングロジック
- todoStorage / todoValidator の具体的な実装（interface のみ）
- CI/CD パイプライン
- デプロイ設定

## 参照ドキュメント

- `docs/product-requirements.md` - プロダクト要求定義書
- `docs/functional-design.md` - 機能設計書
- `docs/architecture.md` - アーキテクチャ設計書
- `docs/glossary.md` - 用語集
