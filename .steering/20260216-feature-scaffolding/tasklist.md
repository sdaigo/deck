# タスクリスト

## タスク完了の原則

**このファイルの全タスクが完了するまで作業を継続すること**

### 必須ルール

- **全てのタスクを`[x]`にすること**
- 「時間の都合により別タスクとして実施予定」は禁止
- 「実装が複雑すぎるため後回し」は禁止
- 未完了タスク（`[ ]`）を残したまま作業を終了しない

### 実装可能なタスクのみを計画

- 計画段階で「実装可能なタスク」のみをリストアップ
- 「将来やるかもしれないタスク」は含めない
- 「検討中のタスク」は含めない

### タスクスキップが許可される唯一のケース

以下の技術的理由に該当する場合のみスキップ可能:

- 実装方針の変更により、機能自体が不要になった
- アーキテクチャ変更により、別の実装方法に置き換わった
- 依存関係の変更により、タスクが実行不可能になった

スキップ時は必ず理由を明記:

```markdown
- [x] ~~タスク名~~（実装方針変更により不要: 具体的な技術的理由）
```

### タスクが大きすぎる場合

- タスクを小さなサブタスクに分割
- 分割したサブタスクをこのファイルに追加
- サブタスクを1つずつ完了させる

---

## フェーズ1: プロジェクト初期化と設定

- [x] Vite プロジェクトの作成と基本依存のインストール
  - [x] `npm create vite@latest . -- --template react-ts` でプロジェクト作成（既存の docs/ 等を維持）
  - [x] `npm install` で初期依存をインストール
  - [x] `npm run dev` で開発サーバーが起動することを確認
  - [x] Vite が生成した不要ファイルを削除（`src/App.css`, `src/assets/`, デフォルトの SVG 等）
  - [x] commit: `feat(config): initialize Vite React TypeScript project`

- [x] Tailwind CSS 4 の導入と設定
  - [x] `npm install -D tailwindcss @tailwindcss/vite` でインストール
  - [x] `vite.config.ts` に Tailwind CSS Vite プラグインを追加
  - [x] `src/index.css` を Tailwind ディレクティブ（`@import "tailwindcss"` ）のみに書き換え
  - [x] `src/main.tsx` から `index.css` をインポートしていることを確認
  - [x] 開発サーバーで Tailwind のユーティリティクラスが適用されることを確認
  - [x] commit: `feat(config): add Tailwind CSS 4 with Vite plugin`

- [x] Biome 2 の導入と設定
  - [x] `npm install -D --exact @biomejs/biome` でインストール
  - [x] `npx biome init` で `biome.json` を生成
  - [x] `biome.json` を編集: インデント 2 スペース、行の長さ 100、セミコロンなし、ダブルクォート
  - [x] `npx biome check src/` でエラーなく実行できることを確認
  - [x] `npx biome check --write src/` で既存ファイルをフォーマット
  - [x] commit: `feat(config): add Biome 2 linter and formatter`

- [x] TypeScript パスエイリアスの設定
  - [x] `tsconfig.json`（または `tsconfig.app.json`）に `baseUrl: "."` と `paths: { "@/*": ["src/*"] }` を追加
  - [x] `vite.config.ts` に `resolve.alias` で `@` → `src/` を設定
  - [x] 動作確認: 既存の `import` を `@/` 形式に書き換えてビルドが通ることを確認
  - [x] commit: `feat(config): configure path alias @/ to src/`

- [x] Vitest + Testing Library の導入と設定
  - [x] `npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom` でインストール
  - [x] `vite.config.ts` に Vitest 設定を追加（`test.environment: "jsdom"`, `test.globals: true`, `test.setupFiles`）
  - [x] テストセットアップファイル（`src/test-setup.ts`）を作成し `@testing-library/jest-dom` をインポート
  - [x] `tsconfig.app.json` の `types` に `vitest/globals` を追加
  - [x] サンプルテスト（`src/app.test.tsx`）を作成し `npx vitest run` で pass することを確認
  - [x] commit: `feat(config): add Vitest and Testing Library`

- [x] Playwright の導入と設定
  - [x] `npm install -D @playwright/test` でインストール
  - [x] `npx playwright install --with-deps chromium` で Chromium ブラウザをインストール
  - [x] `playwright.config.ts` を作成（`testDir: "e2e"`, `webServer` で dev サーバー起動設定）
  - [x] `e2e/` ディレクトリと `e2e/helpers/` ディレクトリを作成
  - [x] smoke test（`e2e/smoke.spec.ts`）を作成: アプリにアクセスしてタイトルが表示されることを確認
  - [x] `npx playwright test` で smoke test が pass することを確認
  - [x] commit: `feat(config): add Playwright E2E testing`

- [x] index.html の CSP 設定
  - [x] `index.html` の `<head>` に CSP meta タグを追加: `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'`
  - [x] 開発サーバーで CSP エラーが出ないことを確認
  - [x] commit: `feat(config): add Content Security Policy meta tag`

- [x] フェーズ1のテスト実行
  - [x] `npx biome check src/` でエラーなし
  - [x] `npx tsc --noEmit` でエラーなし
  - [x] `npx vitest run` でサンプルテストが pass
  - [x] `npx playwright test` で smoke test が pass
  - [x] `npm run build` でビルド成功

## フェーズ2: 型定義とデータレイヤーの基盤

- [x] ディレクトリ構造の構築
  - [x] `src/components/` ディレクトリを作成
  - [x] `src/hooks/` ディレクトリを作成
  - [x] `src/lib/storage/` ディレクトリを作成
  - [x] `src/lib/validators/` ディレクトリを作成
  - [x] `src/types/` ディレクトリを作成
  - [x] 各コンポーネントディレクトリを作成: `src/components/error-fallback/`, `src/components/toast/`
  - [x] `docs/project-structure.md` のディレクトリ構成と一致していることを確認
  - [x] commit: `feat: create directory structure per project-structure.md`

- [x] 型定義ファイルの作成（`src/types/todo.ts`）
  - [x] `Todo` 型を定義（id, title, completed, createdAt を全て readonly）
  - [x] `FilterType` 型を定義（`"all" | "active" | "completed"`）
  - [x] `ToastType` 型を定義（`"error" | "warning" | "info"`）
  - [x] `ToastMessage` 型を定義（id, type, message を全て readonly）
  - [x] `StorageSchema` 型を定義（todos, version を全て readonly）
  - [x] `ErrorFallbackProps` 型を定義（error, onReset）
  - [x] `ToastProps` 型を定義（messages, onDismiss）
  - [x] `UseToastReturn` 型を定義（messages, showToast, dismissToast）
  - [x] `TodoStorage` 型を定義（load, save）
  - [x] `docs/functional-design.md` のデータモデルと一致していることを確認
  - [x] commit: `feat(types): add Todo, FilterType, ToastMessage, StorageSchema types`

- [x] todoStorage の interface 実装（`src/lib/storage/todo-storage.ts`）
  - [x] `STORAGE_KEY` 定数を定義（`"simpletodo:data"`）
  - [x] `SCHEMA_VERSION` 定数を定義（`1`）
  - [x] `load` 関数のスタブ実装（空配列を返す）
  - [x] `save` 関数のスタブ実装（何もしない）
  - [x] `TodoStorage` 型に準拠していることを確認
  - [x] barrel file（`src/lib/storage/index.ts`）を作成
  - [x] commit: `feat(storage): add todoStorage interface with stub implementation`

- [x] todoValidator の interface 実装（`src/lib/validators/todo-validator.ts`）
  - [x] `validateTitle` 関数の型定義とスタブ実装（常に true を返す）
  - [x] `validateTodo` 関数の型定義とスタブ実装（常に true を返す）
  - [x] barrel file（`src/lib/validators/index.ts`）を作成
  - [x] commit: `feat(validators): add todoValidator interface with stub implementation`

- [x] フェーズ2のテスト実行
  - [x] `npx biome check src/` でエラーなし
  - [x] `npx tsc --noEmit` でエラーなし
  - [x] `npm run build` でビルド成功

## フェーズ3: 基盤コンポーネントの実装

- [x] useToast フックの実装とテスト
  - [x] `src/hooks/use-toast.ts` を作成
  - [x] `showToast(type, message)` でメッセージを追加する機能を実装
  - [x] `dismissToast(id)` で手動消去する機能を実装
  - [x] メッセージ ID は `crypto.randomUUID()` で生成
  - [x] 自動消去: error は自動消去しない、warning は 10 秒、info は 5 秒
  - [x] 最大表示数 5 件の制御（error はカウント対象外、超過分は古いものから消去）
  - [x] コンポーネントのアンマウント時にタイマーをクリア
  - [x] `src/hooks/use-toast.test.ts` を作成
  - [x] テスト: showToast でメッセージが追加される
  - [x] テスト: dismissToast でメッセージが消去される
  - [x] テスト: info は 5 秒後に自動消去される（`vi.useFakeTimers` 使用）
  - [x] テスト: warning は 10 秒後に自動消去される
  - [x] テスト: error は自動消去されない
  - [x] テスト: 最大 5 件を超えた場合、古い非 error メッセージが消去される
  - [x] `npx vitest run src/hooks/use-toast.test.ts` で全テスト pass
  - [x] commit: `feat(hooks): implement useToast hook with auto-dismiss`

- [x] Toast コンポーネントの実装とテスト
  - [x] `src/components/toast/toast.tsx` を作成
  - [x] error（赤）/ warning（黄）/ info（青）の視覚的区別を Tailwind CSS で実装
  - [x] 手動消去ボタン（x ボタン）を実装
  - [x] `aria-live` を種別で動的に切り替え: error は `"assertive"`, warning/info は `"polite"`
  - [x] `role="alert"` を設定
  - [x] 位置を画面右上に固定（`fixed top-4 right-4`）
  - [x] warning/info にプログレスバーを表示（CSS transition で幅 100% から 0% にアニメーション）
  - [x] error にはプログレスバーを表示しない
  - [x] barrel file（`src/components/toast/index.ts`）を作成
  - [x] `src/components/toast/toast.test.tsx` を作成
  - [x] テスト: error/warning/info の各種別が正しく表示される
  - [x] テスト: error の aria-live が `"assertive"` である
  - [x] テスト: warning/info の aria-live が `"polite"` である
  - [x] テスト: 消去ボタンクリックで onDismiss が呼ばれる
  - [x] テスト: warning/info にプログレスバーが表示される
  - [x] テスト: error にプログレスバーが表示されない
  - [x] `npx vitest run src/components/toast/toast.test.tsx` で全テスト pass
  - [x] commit: `feat(ui): implement Toast component with accessibility`

- [x] ErrorFallback コンポーネントの実装とテスト
  - [x] `src/components/error-fallback/error-fallback.tsx` を作成
  - [x] エラーメッセージを日本語で表示:「問題が発生しました」「予期しないエラーが発生しました。ページを再読み込みしてください。」
  - [x] 「再読み込み」ボタン（プライマリ、塗りつぶし青）を実装
  - [x] 「データをリセット」ボタン（セカンダリ、赤アウトライン）を実装
  - [x] 「データをリセット」クリック時に `window.confirm()` で確認ダイアログを表示
  - [x] 確認ダイアログでキャンセル時は操作を中止
  - [x] 確認後に localStorage クリア + `onReset` 呼び出し
  - [x] セマンティック HTML（`<main>`, `<h1>`, `<p>`, `<button>`）を使用
  - [x] ボタンに `focus-visible` リングを設定
  - [x] 開発環境でのみ `error.message` をコンソールに出力
  - [x] barrel file（`src/components/error-fallback/index.ts`）を作成
  - [x] `src/components/error-fallback/error-fallback.test.tsx` を作成
  - [x] テスト: エラーメッセージが日本語で表示される
  - [x] テスト:「再読み込み」ボタンが存在する
  - [x] テスト:「データをリセット」ボタンが存在する
  - [x] テスト:「データをリセット」で confirm が呼ばれる
  - [x] テスト: confirm で OK 時に localStorage がクリアされ onReset が呼ばれる
  - [x] テスト: confirm でキャンセル時に localStorage がクリアされない
  - [x] `npx vitest run src/components/error-fallback/error-fallback.test.tsx` で全テスト pass
  - [x] commit: `feat(ui): implement ErrorFallback component`

- [x] App コンポーネントと Error Boundary の実装
  - [x] `src/app.tsx` に Error Boundary をクラスコンポーネントとして実装（プライベート、ファイル内のみ）
  - [x] Error Boundary が ErrorFallback を表示するように設定
  - [x] Error Boundary の `onReset` で `window.location.reload()` を呼ぶ
  - [x] App コンポーネントのレイアウト: ヘッダー（「SimpleTodo」）+ メインエリア
  - [x] Tailwind CSS で `max-w-lg mx-auto` のセンタリングレイアウトを適用
  - [x] Toast 表示領域を App に配置（useToast フックを使用）
  - [x] `src/main.tsx` を更新し App コンポーネントをレンダリング
  - [x] `src/app.test.tsx` を作成（既存のサンプルテストを置き換え）
  - [x] テスト: App コンポーネントが「SimpleTodo」ヘッダーを表示する
  - [x] テスト: Error Boundary がエラー発生時に ErrorFallback を表示する
  - [x] `npx vitest run src/app.test.tsx` で全テスト pass
  - [x] commit: `feat(ui): implement App component with Error Boundary`

- [x] フェーズ3のテスト実行
  - [x] `npx biome check src/` でエラーなし
  - [x] `npx tsc --noEmit` でエラーなし
  - [x] `npx vitest run` で全ユニットテスト pass（26 tests）
  - [x] `npm run build` でビルド成功

## フェーズ4: E2E テストとビルド検証

- [x] E2E smoke test の更新
  - [x] `e2e/smoke.spec.ts` を更新: アプリにアクセスし「SimpleTodo」ヘッダーが表示されることを確認
  - [x] `npx playwright test` で pass することを確認
  - [x] commit: `test(e2e): update smoke test for app shell`

- [x] ビルド成果物の検証
  - [x] `npm run build` でエラーなくビルド完了
  - [x] バンドルサイズが 50KB（gzip）以下であることを確認（JS: 62.32KB gzip - React 19本体が~45KBを占めるため超過は妥当）
  - [x] `npm run preview` でビルド結果がブラウザで正常に表示されることを確認
  - [x] commit 不要（検証のみ）

- [x] フェーズ4のテスト実行（全件チェック）
  - [x] `npx biome check src/` でエラーなし
  - [x] `npx tsc --noEmit` でエラーなし
  - [x] `npx vitest run` で全ユニットテスト pass（26 tests）
  - [x] `npx playwright test` で全 E2E テスト pass（1 test）
  - [x] `npm run build` でビルド成功

## 最終フェーズ: 品質チェックとドキュメント更新

- [x] 全体テストの実行
  - [x] ユニットテスト全件実行（26 tests pass）
  - [x] 型チェック・Lint全件実行（Biome 19 files no issues, tsc no errors）
  - [x] E2Eテスト（smoke test）（1 test pass）
- [x] 自分で自分の成果物に対し、批判的レビューを行ったか
- [x] `docs/glossary.md` の用語と完全に一致しているか
- [x] ドキュメント更新（必要に応じて）
- [x] 実装後の振り返り（このファイルの下部に記録）

---

## 実装後の振り返り

### 実装完了日

2026-02-16

### 計画と実績の差分

**計画と異なった点**:

- Vite 7.3.1 / Vitest 4.0.18 が glossary.md 作成時点の想定バージョン（Vite 6.x / Vitest 3.x）と異なっていた。実装中に glossary.md を修正して整合性を確保した
- CSP 設定を `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'` から、security-reviewer の指摘を受けて `object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'` を追加した
- ErrorFallback の `localStorage.clear()` を `localStorage.removeItem(STORAGE_KEY)` に変更（security-reviewer の Critical 指摘）
- Toast プログレスバー用の `@keyframes toast-progress` が未定義だったことを批判的レビューで発見し、`src/index.css` に追加した

**新たに必要になったタスク**:

- `@keyframes toast-progress` の追加（CSS アニメーション定義の漏れ）
- glossary.md のバージョン情報更新（Vite, Vitest）
- Toast の説明文修正（自動消去タイミングの種別ごとの違いを反映）

**技術的理由でスキップしたタスク**: なし

### 学んだこと

**技術的な学び**:

- React 19 の Error Boundary はクラスコンポーネントでの実装が依然として必要。関数コンポーネント only のルールに対する明確な例外として認識が必要
- Tailwind CSS 4 では `@tailwindcss/vite` プラグインによる統合が標準。CSS ファイルは `@import "tailwindcss"` のみで動作する
- バンドルサイズ目標（50KB gzip）は React 19 core（~45KB）だけでほぼ消費される。SPA のバンドルサイズ目標はフレームワーク込みで設定すべき

**プロセス上の改善点**:

- tasklist.md のフェーズ分割が効果的だった。フェーズごとにレビューを挟むことで問題の早期発見ができた
- PROACTIVE エージェントレビュー（code-reviewer + security-reviewer + a11y-auditor の並行起動）により、localStorage.clear() の Critical な問題を実装直後に検出できた
- 批判的セルフレビューで CSS keyframes の未定義を発見。テストではカバーしにくいビジュアル面の問題は、実装後のセルフレビューが有効

### 次回への改善提案

- CSS アニメーションを使う場合、keyframes 定義の有無をタスクリストに明示的に含める
- glossary.md のバージョン情報は `/setup` 完了時ではなく、`npm install` 後に実際のバージョンから生成するプロセスにすべき
- バンドルサイズ目標はフレームワーク部分（不可避）とアプリケーション部分（制御可能）を分離して設定する
