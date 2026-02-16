# UIデザイン依頼書

## デザイン対象画面

| # | 画面名 | 状態 | ワイヤーフレーム参照 |
|:--|:-------|:-----|:-------------------|
| 1 | App Shell（初期画面） | 正常時 | wireframe.excalidraw: Screen 1 |
| 2 | ErrorFallback | エラー時 | wireframe.excalidraw: Screen 2 |
| 3 | Toast 通知（3種別） | 警告/エラー発生時 | wireframe.excalidraw: Screen 3 |

## 各画面の要件

### 1. App Shell

- ヘッダー: 「SimpleTodo」タイトル
- メインエリア: 空の状態（次フェーズで Todo input / list を配置）
- レイアウト: `max-w-lg mx-auto` でセンタリング
- Toast 表示領域を含む

### 2. ErrorFallback

- エラーアイコン（警告マーク）
- タイトル:「問題が発生しました」（日本語）
- メッセージ:「予期しないエラーが発生しました。ページを再読み込みしてください。」（日本語）
- 「再読み込み」ボタン: プライマリ（塗りつぶし青）
- 「データをリセット」ボタン: セカンダリ（赤アウトライン）
- セマンティック HTML: `<main>`, `<h1>`, `<p>`, `<button>`
- ボタンに `focus-visible` リング

### 3. Toast 通知

- **error**: 赤系、`aria-live="assertive"`、手動消去のみ、プログレスバーなし
- **warning**: 黄系、`aria-live="polite"`、10秒で自動消去、プログレスバーあり
- **info**: 青系、`aria-live="polite"`、5秒で自動消去、プログレスバーあり
- 位置: 画面右上に固定（`fixed top-4 right-4`）
- 手動消去ボタン（x ボタン）
- プログレスバー: Toast 下部、幅 100% → 0% でアニメーション
- スタック表示（最大5件、error はカウント対象外）

## 参照ファイル

| ファイル | パス |
|:---------|:-----|
| ワイヤーフレーム | `.steering/20260216-feature-scaffolding/prototypes/wireframe.excalidraw` |
| ユーザーフロー | `.steering/20260216-feature-scaffolding/prototypes/userflow.md` |
| 設計書 | `.steering/20260216-feature-scaffolding/design.md` |
| 要求仕様 | `.steering/20260216-feature-scaffolding/requirements.md` |

## デザイン参照

方式: Pencil

デザインファイル: `docs/designs/simple-todo.pen`
対象レイヤー: App Shell, ErrorFallback, Toast

### デザインシステム（カラートークン）

| トークン | 値 | 用途 |
|:---------|:---|:-----|
| `jp-bg` | #FAF8F5 | ページ背景（warm off-white） |
| `jp-surface` | #FFFFFF | カード・ヘッダー背景 |
| `jp-text` | #1C1C1C | プライマリテキスト |
| `jp-text-secondary` | #6B6B6B | セカンダリテキスト |
| `jp-text-muted` | #9A9A9A | ミュートテキスト |
| `jp-border` | #E8E5E0 | ボーダー・ディバイダー |
| `jp-accent` | #1E3A5F | アクセント（ネイビー） |
| `jp-negative` | #8B4049 | 破壊的アクション |
| `jp-error-bg/text/border` | #FFF5F5/#C53030/#FC8181 | error Toast |
| `jp-warning-bg/text/border` | #FFFFF0/#B7791F/#F6E05E | warning Toast |
| `jp-info-bg/text/border` | #EBF8FF/#2B6CB0/#90CDF4 | info Toast |

### タイポグラフィ

- フォント: Inter
- ヘッダータイトル: 20px / weight 500 / letter-spacing -0.3
- エラータイトル: 22px / weight 500
- 本文: 14px / weight 400
- Toast ラベル: 12px / weight 600
- Toast メッセージ: 13px / weight 400

### レイアウト仕様

- 画面幅: 375px（iPhone 基準）
- 角丸: カード 16px、ボタン 12px、Toast 12px
- ボタン: 高さ 48px、幅 260px
- Toast: 画面右上固定、8px gap スタック

## 備考

- Tailwind CSS のみでスタイリング（カスタム CSS 禁止）
- WCAG 2.1 AA 準拠
- モバイルファースト（375px 基準）
