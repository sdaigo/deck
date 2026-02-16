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

- [ ] Vite プロジェクトの作成と基本依存のインストール
  - [ ] `npm create vite@latest . -- --template react-ts` でプロジェクト作成（既存の docs/ 等を維持）
  - [ ] `npm install` で初期依存をインストール
  - [ ] `npm run dev` で開発サーバーが起動することを確認
  - [ ] Vite が生成した不要ファイルを削除（`src/App.css`, `src/assets/`, デフォルトの SVG 等）
  - [ ] commit: `feat(config): initialize Vite React TypeScript project`

- [ ] Tailwind CSS 4 の導入と設定
  - [ ] `npm install -D tailwindcss @tailwindcss/vite` でインストール
  - [ ] `vite.config.ts` に Tailwind CSS Vite プラグインを追加
  - [ ] `src/index.css` を Tailwind ディレクティブ（`@import "tailwindcss"` ）のみに書き換え
  - [ ] `src/main.tsx` から `index.css` をインポートしていることを確認
  - [ ] 開発サーバーで Tailwind のユーティリティクラスが適用されることを確認
  - [ ] commit: `feat(config): add Tailwind CSS 4 with Vite plugin`

- [ ] Biome 2 の導入と設定
  - [ ] `npm install -D --exact @biomejs/biome` でインストール
  - [ ] `npx biome init` で `biome.json` を生成
  - [ ] `biome.json` を編集: インデント 2 スペース、行の長さ 100、セミコロンなし、ダブルクォート
  - [ ] `npx biome check src/` でエラーなく実行できることを確認
  - [ ] `npx biome check --write src/` で既存ファイルをフォーマット
  - [ ] commit: `feat(config): add Biome 2 linter and formatter`

- [ ] TypeScript パスエイリアスの設定
  - [ ] `tsconfig.json`（または `tsconfig.app.json`）に `baseUrl: "."` と `paths: { "@/*": ["src/*"] }` を追加
  - [ ] `vite.config.ts` に `resolve.alias` で `@` → `src/` を設定
  - [ ] 動作確認: 既存の `import` を `@/` 形式に書き換えてビルドが通ることを確認
  - [ ] commit: `feat(config): configure path alias @/ to src/`

- [ ] Vitest + Testing Library の導入と設定
  - [ ] `npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom` でインストール
  - [ ] `vite.config.ts` に Vitest 設定を追加（`test.environment: "jsdom"`, `test.globals: true`, `test.setupFiles`）
  - [ ] テストセットアップファイル（`src/test-setup.ts`）を作成し `@testing-library/jest-dom` をインポート
  - [ ] `tsconfig.app.json` の `include` にテストファイルパターンを追加（必要に応じて）
  - [ ] サンプルテスト（`src/app.test.tsx`）を作成し `npx vitest run` で pass することを確認
  - [ ] commit: `feat(config): add Vitest and Testing Library`

- [ ] Playwright の導入と設定
  - [ ] `npm install -D @playwright/test` でインストール
  - [ ] `npx playwright install --with-deps chromium` で Chromium ブラウザをインストール
  - [ ] `playwright.config.ts` を作成（`testDir: "e2e"`, `webServer` で dev サーバー起動設定）
  - [ ] `e2e/` ディレクトリと `e2e/helpers/` ディレクトリを作成
  - [ ] smoke test（`e2e/smoke.spec.ts`）を作成: アプリにアクセスしてタイトルが表示されることを確認
  - [ ] `npx playwright test` で smoke test が pass することを確認
  - [ ] commit: `feat(config): add Playwright E2E testing`

- [ ] index.html の CSP 設定
  - [ ] `index.html` の `<head>` に CSP meta タグを追加: `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'`
  - [ ] 開発サーバーで CSP エラーが出ないことを確認
  - [ ] commit: `feat(config): add Content Security Policy meta tag`

- [ ] フェーズ1のテスト実行
  - [ ] `npx biome check src/` でエラーなし
  - [ ] `npx tsc --noEmit` でエラーなし
  - [ ] `npx vitest run` でサンプルテストが pass
  - [ ] `npx playwright test` で smoke test が pass
  - [ ] `npm run build` でビルド成功

## フェーズ2: 型定義とデータレイヤーの基盤

- [ ] ディレクトリ構造の構築
  - [ ] `src/components/` ディレクトリを作成
  - [ ] `src/hooks/` ディレクトリを作成
  - [ ] `src/lib/storage/` ディレクトリを作成
  - [ ] `src/lib/validators/` ディレクトリを作成
  - [ ] `src/types/` ディレクトリを作成
  - [ ] 各コンポーネントディレクトリを作成: `src/components/error-fallback/`, `src/components/toast/`
  - [ ] `docs/project-structure.md` のディレクトリ構成と一致していることを確認
  - [ ] commit: `feat: create directory structure per project-structure.md`

- [ ] 型定義ファイルの作成（`src/types/todo.ts`）
  - [ ] `Todo` 型を定義（id, title, completed, createdAt を全て readonly）
  - [ ] `FilterType` 型を定義（`"all" | "active" | "completed"`）
  - [ ] `ToastType` 型を定義（`"error" | "warning" | "info"`）
  - [ ] `ToastMessage` 型を定義（id, type, message を全て readonly）
  - [ ] `StorageSchema` 型を定義（todos, version を全て readonly）
  - [ ] `ErrorFallbackProps` 型を定義（error, onReset）
  - [ ] `ToastProps` 型を定義（messages, onDismiss）
  - [ ] `UseToastReturn` 型を定義（messages, showToast, dismissToast）
  - [ ] `TodoStorage` 型を定義（load, save）
  - [ ] `docs/functional-design.md` のデータモデルと一致していることを確認
  - [ ] commit: `feat(types): add Todo, FilterType, ToastMessage, StorageSchema types`

- [ ] todoStorage の interface 実装（`src/lib/storage/todo-storage.ts`）
  - [ ] `STORAGE_KEY` 定数を定義（`"simpletodo:data"`）
  - [ ] `SCHEMA_VERSION` 定数を定義（`1`）
  - [ ] `load` 関数のスタブ実装（空配列を返す）
  - [ ] `save` 関数のスタブ実装（何もしない）
  - [ ] `TodoStorage` 型に準拠していることを確認
  - [ ] barrel file（`src/lib/storage/index.ts`）を作成
  - [ ] commit: `feat(storage): add todoStorage interface with stub implementation`

- [ ] todoValidator の interface 実装（`src/lib/validators/todo-validator.ts`）
  - [ ] `validateTitle` 関数の型定義とスタブ実装（常に true を返す）
  - [ ] `validateTodo` 関数の型定義とスタブ実装（常に true を返す）
  - [ ] barrel file（`src/lib/validators/index.ts`）を作成
  - [ ] commit: `feat(validators): add todoValidator interface with stub implementation`

- [ ] フェーズ2のテスト実行
  - [ ] `npx biome check src/` でエラーなし
  - [ ] `npx tsc --noEmit` でエラーなし
  - [ ] `npm run build` でビルド成功

## フェーズ3: 基盤コンポーネントの実装

- [ ] useToast フックの実装とテスト
  - [ ] `src/hooks/use-toast.ts` を作成
  - [ ] `showToast(type, message)` でメッセージを追加する機能を実装
  - [ ] `dismissToast(id)` で手動消去する機能を実装
  - [ ] メッセージ ID は `crypto.randomUUID()` で生成
  - [ ] 自動消去: error は自動消去しない、warning は 10 秒、info は 5 秒
  - [ ] 最大表示数 5 件の制御（error はカウント対象外、超過分は古いものから消去）
  - [ ] コンポーネントのアンマウント時にタイマーをクリア
  - [ ] `src/hooks/use-toast.test.ts` を作成
  - [ ] テスト: showToast でメッセージが追加される
  - [ ] テスト: dismissToast でメッセージが消去される
  - [ ] テスト: info は 5 秒後に自動消去される（`vi.useFakeTimers` 使用）
  - [ ] テスト: warning は 10 秒後に自動消去される
  - [ ] テスト: error は自動消去されない
  - [ ] テスト: 最大 5 件を超えた場合、古い非 error メッセージが消去される
  - [ ] `npx vitest run src/hooks/use-toast.test.ts` で全テスト pass
  - [ ] commit: `feat(hooks): implement useToast hook with auto-dismiss`

- [ ] Toast コンポーネントの実装とテスト
  - [ ] `src/components/toast/toast.tsx` を作成
  - [ ] error（赤）/ warning（黄）/ info（青）の視覚的区別を Tailwind CSS で実装
  - [ ] 手動消去ボタン（x ボタン）を実装
  - [ ] `aria-live` を種別で動的に切り替え: error は `"assertive"`, warning/info は `"polite"`
  - [ ] `role="alert"` を設定
  - [ ] 位置を画面右上に固定（`fixed top-4 right-4`）
  - [ ] warning/info にプログレスバーを表示（CSS transition で幅 100% から 0% にアニメーション）
  - [ ] error にはプログレスバーを表示しない
  - [ ] barrel file（`src/components/toast/index.ts`）を作成
  - [ ] `src/components/toast/toast.test.tsx` を作成
  - [ ] テスト: error/warning/info の各種別が正しく表示される
  - [ ] テスト: error の aria-live が `"assertive"` である
  - [ ] テスト: warning/info の aria-live が `"polite"` である
  - [ ] テスト: 消去ボタンクリックで onDismiss が呼ばれる
  - [ ] テスト: warning/info にプログレスバーが表示される
  - [ ] テスト: error にプログレスバーが表示されない
  - [ ] `npx vitest run src/components/toast/toast.test.tsx` で全テスト pass
  - [ ] commit: `feat(ui): implement Toast component with accessibility`

- [ ] ErrorFallback コンポーネントの実装とテスト
  - [ ] `src/components/error-fallback/error-fallback.tsx` を作成
  - [ ] エラーメッセージを日本語で表示:「問題が発生しました」「予期しないエラーが発生しました。ページを再読み込みしてください。」
  - [ ] 「再読み込み」ボタン（プライマリ、塗りつぶし青）を実装
  - [ ] 「データをリセット」ボタン（セカンダリ、赤アウトライン）を実装
  - [ ] 「データをリセット」クリック時に `window.confirm()` で確認ダイアログを表示
  - [ ] 確認ダイアログでキャンセル時は操作を中止
  - [ ] 確認後に localStorage クリア + `onReset` 呼び出し
  - [ ] セマンティック HTML（`<main>`, `<h1>`, `<p>`, `<button>`）を使用
  - [ ] ボタンに `focus-visible` リングを設定
  - [ ] 開発環境でのみ `error.message` をコンソールに出力
  - [ ] barrel file（`src/components/error-fallback/index.ts`）を作成
  - [ ] `src/components/error-fallback/error-fallback.test.tsx` を作成
  - [ ] テスト: エラーメッセージが日本語で表示される
  - [ ] テスト:「再読み込み」ボタンが存在する
  - [ ] テスト:「データをリセット」ボタンが存在する
  - [ ] テスト:「データをリセット」で confirm が呼ばれる
  - [ ] テスト: confirm で OK 時に localStorage がクリアされ onReset が呼ばれる
  - [ ] テスト: confirm でキャンセル時に localStorage がクリアされない
  - [ ] `npx vitest run src/components/error-fallback/error-fallback.test.tsx` で全テスト pass
  - [ ] commit: `feat(ui): implement ErrorFallback component`

- [ ] App コンポーネントと Error Boundary の実装
  - [ ] `src/app.tsx` に Error Boundary をクラスコンポーネントとして実装（プライベート、ファイル内のみ）
  - [ ] Error Boundary が ErrorFallback を表示するように設定
  - [ ] Error Boundary の `onReset` で `window.location.reload()` を呼ぶ
  - [ ] App コンポーネントのレイアウト: ヘッダー（「SimpleTodo」）+ メインエリア
  - [ ] Tailwind CSS で `max-w-lg mx-auto` のセンタリングレイアウトを適用
  - [ ] Toast 表示領域を App に配置（useToast フックを使用）
  - [ ] `src/main.tsx` を更新し App コンポーネントをレンダリング
  - [ ] `src/app.test.tsx` を作成（既存のサンプルテストを置き換え）
  - [ ] テスト: App コンポーネントが「SimpleTodo」ヘッダーを表示する
  - [ ] テスト: Error Boundary がエラー発生時に ErrorFallback を表示する
  - [ ] `npx vitest run src/app.test.tsx` で全テスト pass
  - [ ] commit: `feat(ui): implement App component with Error Boundary`

- [ ] フェーズ3のテスト実行
  - [ ] `npx biome check src/` でエラーなし
  - [ ] `npx tsc --noEmit` でエラーなし
  - [ ] `npx vitest run` で全ユニットテスト pass
  - [ ] `npm run build` でビルド成功

## フェーズ4: E2E テストとビルド検証

- [ ] E2E smoke test の更新
  - [ ] `e2e/smoke.spec.ts` を更新: アプリにアクセスし「SimpleTodo」ヘッダーが表示されることを確認
  - [ ] `npx playwright test` で pass することを確認
  - [ ] commit: `test(e2e): update smoke test for app shell`

- [ ] ビルド成果物の検証
  - [ ] `npm run build` でエラーなくビルド完了
  - [ ] バンドルサイズが 50KB（gzip）以下であることを確認
  - [ ] `npm run preview` でビルド結果がブラウザで正常に表示されることを確認
  - [ ] commit 不要（検証のみ）

- [ ] フェーズ4のテスト実行（全件チェック）
  - [ ] `npx biome check src/` でエラーなし
  - [ ] `npx tsc --noEmit` でエラーなし
  - [ ] `npx vitest run` で全ユニットテスト pass
  - [ ] `npx playwright test` で全 E2E テスト pass
  - [ ] `npm run build` でビルド成功

## 最終フェーズ: 品質チェックとドキュメント更新

- [ ] 全体テストの実行
  - [ ] ユニットテスト全件実行
  - [ ] 型チェック・Lint全件実行
  - [ ] E2Eテスト（smoke test）
- [ ] 自分で自分の成果物に対し、批判的レビューを行ったか
- [ ] `docs/glossary.md` の用語と完全に一致しているか
- [ ] ドキュメント更新（必要に応じて）
- [ ] 実装後の振り返り（このファイルの下部に記録）

---

## 実装後の振り返り

### 実装完了日

{YYYY-MM-DD}

### 計画と実績の差分

**計画と異なった点**:

- {計画時には想定していなかった技術的な変更点}
- {実装方針の変更とその理由}

**新たに必要になったタスク**:

- {実装中に追加したタスク}
- {なぜ追加が必要だったか}

**技術的理由でスキップしたタスク**（該当する場合のみ）:

- {タスク名}
  - スキップ理由: {具体的な技術的理由}
  - 代替実装: {何に置き換わったか}

### 学んだこと

**技術的な学び**:

- {新しく学んだ技術やパターン}

**プロセス上の改善点**:

- {タスク管理で良かった点}
- {ステアリングファイルの活用方法}

### 次回への改善提案

- {次回の機能追加で気をつけること}
- {タスク計画の改善点}
