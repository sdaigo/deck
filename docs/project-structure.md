# プロジェクト構造定義書 (Project Structure Document)

## ルートディレクトリ構成

```text
/
├── src/                      # アプリケーションソースコード
├── public/                   # 静的アセット（favicon 等）
├── e2e/                      # E2E テスト（Playwright）
├── docs/                     # プロジェクトドキュメント
├── .claude/                  # Claude Code 設定
├── .steering/                # 作業指示ドキュメント（一時的）
├── index.html                # エントリ HTML（Vite 規約）
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── biome.json
├── tailwind.config.ts
└── playwright.config.ts
```

## ソースコード構造

### 全体構成

```text
src/
├── components/               # UI レイヤー: React コンポーネント
├── hooks/                    # 状態管理レイヤー: カスタムフック
├── lib/                      # データレイヤー + ユーティリティ
├── types/                    # 型定義
├── app.tsx                   # ルートコンポーネント
├── main.tsx                  # エントリポイント（React DOM レンダリング）
└── index.css                 # グローバルスタイル（Tailwind ディレクティブ）
```

### UI レイヤー (`src/components/`)

**責務**: ユーザー入力の受付、表示、イベントのデリゲート

```text
src/components/
├── todo-input/
│   ├── todo-input.tsx        # タスク入力フォーム
│   ├── todo-input.test.tsx   # ユニットテスト
│   └── index.ts              # 公開 API
├── todo-list/
│   ├── todo-list.tsx         # タスク一覧表示
│   ├── todo-list.test.tsx
│   └── index.ts
├── todo-item/
│   ├── todo-item.tsx         # 単一タスク表示
│   ├── todo-item.test.tsx
│   └── index.ts
├── todo-filter/
│   ├── todo-filter.tsx       # フィルターボタン群
│   ├── todo-filter.test.tsx
│   └── index.ts
├── toast/
│   ├── toast.tsx             # 通知コンポーネント
│   ├── toast.test.tsx
│   └── index.ts
└── error-fallback/
    ├── error-fallback.tsx    # Error Boundary フォールバック UI
    ├── error-fallback.test.tsx
    └── index.ts
```

| ディレクトリ | 責務 | 備考 |
|:---|:---|:---|
| `todo-input/` | タスク入力 UI、空文字バリデーション | Enter キー + ボタン対応 |
| `todo-list/` | フィルタリング済みタスク一覧 | TodoItem をリスト表示 |
| `todo-item/` | 単一タスクの表示・操作 | React.memo で最適化 |
| `todo-filter/` | フィルター切り替え + 未完了件数表示 | |
| `toast/` | エラー・警告・情報の一時通知 | 5 秒で自動消去 |
| `error-fallback/` | 予期しないエラーのフォールバック | 再読み込み + データリセット |

### 状態管理レイヤー (`src/hooks/`)

**責務**: ビジネスロジック、状態管理、ストレージ同期

```text
src/hooks/
├── use-todos.ts              # Todo の CRUD + フィルタリング
├── use-todos.test.ts         # ユニットテスト
├── use-toast.ts              # Toast 通知の状態管理
└── use-toast.test.ts
```

| ファイル | 責務 | 備考 |
|:---|:---|:---|
| `use-todos.ts` | Todo の追加・完了・削除・フィルタリング、ストレージ同期 | todoStorage に依存 |
| `use-toast.ts` | 通知メッセージの追加・自動消去・手動消去 | |

### データレイヤー + ユーティリティ (`src/lib/`)

**責務**: データ永続化、バリデーション、共通ユーティリティ。責務ごとにサブディレクトリで分離する。

```text
src/lib/
├── storage/
│   ├── todo-storage.ts       # localStorage アダプター
│   ├── todo-storage.test.ts  # ユニットテスト
│   └── index.ts              # 公開 API
└── validators/
    ├── todo-validator.ts     # Todo データのバリデーション
    ├── todo-validator.test.ts
    └── index.ts
```

| ディレクトリ | 責務 | 備考 |
|:---|:---|:---|
| `storage/` | localStorage への読み書き、JSON シリアライゼーション | 将来 IndexedDB 等への差し替えが容易 |
| `validators/` | Todo データの型チェック、フィールド検証 | storage の load 時 + 入力時に使用 |

### 型定義 (`src/types/`)

**責務**: アプリケーション全体で共有される型定義

```text
src/types/
└── todo.ts                   # Todo, FilterType, ToastMessage 等の型定義
```

## 命名規則

### ファイル名

| 種別 | 規則 | 例 |
|:---|:---|:---|
| コンポーネント | kebab-case `.tsx` | `todo-item.tsx` |
| フック | kebab-case `use-` 接頭辞 `.ts` | `use-todos.ts` |
| ライブラリ | kebab-case `.ts` | `todo-storage.ts` |
| 型定義 | kebab-case `.ts` | `todo.ts` |
| テスト | `*.test.ts(x)` | `todo-item.test.tsx` |
| 設定ファイル | ツール規約に従う | `vite.config.ts`, `biome.json` |

### ディレクトリ名

| 規則 | 例 |
|:---|:---|
| kebab-case | `todo-input/`, `error-fallback/` |
| レイヤー単位は複数形 | `components/`, `hooks/`, `types/` |
| コンポーネント単位は kebab-case | `todo-item/` |

### エクスポート規則

| 種別 | 規則 | 例 |
|:---|:---|:---|
| コンポーネント | PascalCase (named export) | `export function TodoItem()` |
| フック | camelCase (named export) | `export function useTodos()` |
| 型 | PascalCase (named export) | `export type Todo = {...}` |
| 定数 | UPPER_SNAKE_CASE | `export const STORAGE_KEY = ...` |
| デフォルトエクスポート | 原則禁止 | barrel file (`index.ts`) のみ例外的に許可 |

## モジュール境界と依存関係ルール

### 依存方向

```text
components/ (UI レイヤー)
    ├── 許可: hooks/, types/
    └── 禁止: lib/ への直接アクセス

hooks/ (状態管理レイヤー)
    ├── 許可: lib/, types/
    └── 禁止: components/ への依存

lib/ (データレイヤー)
    ├── 許可: types/
    └── 禁止: components/, hooks/ への依存

types/ (型定義)
    ├── 許可: なし（外部依存ゼロ）
    └── 禁止: すべてのレイヤーへの依存
```

### レイヤー別の依存ルール

| レイヤー | 許可される依存先 | 禁止される依存先 |
|:---|:---|:---|
| `components/` | `hooks/`, `types/` | `lib/` |
| `hooks/` | `lib/`, `types/` | `components/` |
| `lib/` | `types/` | `components/`, `hooks/` |
| `types/` | なし | すべて |

## パスエイリアス

| エイリアス | パス | 用途 |
|:---|:---|:---|
| `@/` | `src/` | ソースコードルートへの絶対パス |

**tsconfig.json での設定**:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## 設定ファイル一覧

| ファイル | 役割 | Git 管理 |
|:---|:---|:---|
| `package.json` | 依存関係、スクリプト定義 | Yes |
| `tsconfig.json` | TypeScript 共通設定 | Yes |
| `tsconfig.app.json` | アプリケーション用 TS 設定 | Yes |
| `tsconfig.node.json` | Vite 設定ファイル用 TS 設定 | Yes |
| `vite.config.ts` | Vite ビルド・開発サーバー設定 | Yes |
| `biome.json` | Biome Lint + Format 設定 | Yes |
| `tailwind.config.ts` | Tailwind CSS 設定 | Yes |
| `playwright.config.ts` | Playwright E2E テスト設定 | Yes |
| `index.html` | エントリ HTML | Yes |

## テストファイル配置

### 配置ルール

| テスト種別 | 配置場所 | ファイル命名 | 理由 |
|:---|:---|:---|:---|
| ユニットテスト | ソースファイルと同階層 | `*.test.ts(x)` | コロケーションによる保守性 |
| E2E テスト | `e2e/` | `*.spec.ts` | Playwright 規約。アプリ全体のテスト |
| テストユーティリティ | `e2e/helpers/` | `*.ts` | E2E テスト間で共有するヘルパー |

### テスト構造

```text
e2e/
├── todo-crud.spec.ts         # タスク CRUD の E2E テスト
├── todo-persistence.spec.ts  # データ永続化の E2E テスト
└── helpers/
    └── todo-helpers.ts       # テストユーティリティ
```

## 新規ファイル追加ガイド

### 判断フローチャート

```text
新しいファイルを追加する場合:

1. UI コンポーネントか？
   → Yes: src/components/[component-name]/[component-name].tsx
   → No: 次へ

2. 状態管理ロジック（カスタムフック）か？
   → Yes: src/hooks/use-[name].ts
   → No: 次へ

3. データアクセス・永続化か？
   → Yes: src/lib/storage/[name].ts
   → No: 次へ

4. バリデーション・データ検証か？
   → Yes: src/lib/validators/[name].ts
   → No: 次へ

5. 型定義のみか？
   → Yes: src/types/[name].ts
   → No: 次へ

6. E2E テストか？
   → Yes: e2e/[name].spec.ts
```

### 具体例

| 作りたいもの | 配置先 | 理由 |
|:---|:---|:---|
| 新しい UI コンポーネント | `src/components/[name]/[name].tsx` | UI レイヤー、コロケーション |
| カスタムフック | `src/hooks/use-[name].ts` | 状態管理レイヤー |
| ストレージアダプター | `src/lib/storage/[name].ts` | データレイヤー、永続化責務 |
| バリデーター | `src/lib/validators/[name].ts` | データレイヤー、検証責務 |
| 共有型定義 | `src/types/[name].ts` | 外部依存ゼロ |
| コンポーネントのテスト | `src/components/[name]/[name].test.tsx` | コロケーション |
