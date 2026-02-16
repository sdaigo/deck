# 開発ガイドライン (Development Guidelines)

> 汎用ルール（命名規則、型安全、関数設計、イミュータビリティ、Git 運用、テスト原則、セキュリティ）は `.claude/rules/common/` を参照。本ドキュメントはプロジェクト固有の設定のみを記載する。

## 開発コマンド

### 日常の開発

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

### コード品質

```bash
# Lint チェック
npx biome check src/

# Lint + 自動修正
npx biome check --write src/

# フォーマット
npx biome format --write src/

# 型チェック
npx tsc --noEmit
```

### テスト

```bash
# ユニット + 統合テスト
npx vitest run

# ウォッチモード
npx vitest

# カバレッジ
npx vitest run --coverage

# E2E テスト
npx playwright test

# E2E テスト（UI モード）
npx playwright test --ui
```

### PR 前チェック（全て通ること）

```bash
npx biome check src/ && npx tsc --noEmit && npx vitest run && npx playwright test
```

## コーディング規約（プロジェクト固有）

### フォーマッター

- **ツール**: Biome
- **インデント**: 2 スペース
- **行の長さ**: 100 文字
- **セミコロン**: なし
- **引用符**: ダブルクォート

### React コンポーネント規約

**関数コンポーネントのみ使用**（クラスコンポーネント禁止）:

```tsx
type TodoItemProps = {
  readonly todo: Todo
  readonly onToggle: (id: string) => void
  readonly onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps): React.ReactElement {
  // ...
}
```

**フック呼び出しのルール**:
- コンポーネントのトップレベルでのみ呼び出す
- カスタムフックは `use` 接頭辞必須
- 条件分岐内でフックを呼ばない

**イベントハンドラの命名**:
- コンポーネント内: `handle` + イベント名（`handleClick`, `handleSubmit`）
- Props コールバック: `on` + イベント名（`onToggle`, `onDelete`）

### メモ化の方針

- `React.memo`: 再レンダリングコストが高いコンポーネントにのみ適用（TodoItem）
- `useMemo`: 計算コストが高い導出値にのみ適用（filteredTodos）
- `useCallback`: memo 化されたコンポーネントに渡すコールバックにのみ適用
- 不要なメモ化は避ける（パフォーマンス問題が計測されてから対応）

### Tailwind CSS の使用規約

- ユーティリティクラスの順序: Biome の CSS プラグインに委ねる
- レスポンシブ: モバイルファーストで記述（`sm:`, `md:`, `lg:` の順）
- カスタム CSS: 原則禁止。Tailwind で表現できない場合のみ `index.css` に記載
- インラインスタイル: 原則禁止

### エラーハンドリング（プロジェクト固有）

**ストレージ操作のエラー**:

```typescript
// localStorage への書き込みは try-catch で囲む
const save = (todos: ReadonlyArray<Todo>): boolean => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ todos, version: 1 }))
    return true
  } catch (error) {
    // QuotaExceededError 等
    console.warn("Failed to save todos:", error)
    return false
  }
}
```

**バリデーションエラー**: Result パターンではなく、boolean / フォールバック値で処理する（シンプルさ優先）。

## Git 運用（プロジェクト固有）

### Commit Scope

| scope | 対象 |
|-------|------|
| `ui` | コンポーネント（TodoInput, TodoList 等） |
| `hooks` | カスタムフック（useTodos, useToast） |
| `storage` | ストレージレイヤー |
| `validators` | バリデーション |
| `config` | 設定ファイル（Vite, Biome, Tailwind 等） |
| `deps` | 依存パッケージの更新 |

例: `feat(ui): add TodoFilter component`, `fix(storage): handle QuotaExceededError`

## テスト戦略（プロジェクト固有）

### カバレッジ目標

- ユニットテスト: 80% 以上（hooks, lib）
- 統合テスト: 主要ユーザーフローをカバー
- E2E: CRUD + 永続化 + フィルター

### テスト命名規則

```typescript
describe("useTodos", () => {
  describe("addTodo", () => {
    it("タスクをリストの末尾に追加する", () => { /* ... */ })
    it("空文字のタスクを追加しない", () => { /* ... */ })
    it("前後の空白をトリムして追加する", () => { /* ... */ })
  })
})
```

- `describe`: テスト対象（関数名、コンポーネント名）
- `it`: 日本語で振る舞いを記述

### モック方針

| 対象 | モック化 | 理由 |
|------|---------|------|
| localStorage | Yes | テスト間の状態分離 |
| crypto.randomUUID | Yes | テストの再現性 |
| ビジネスロジック（useTodos 等） | No | 実装を通してテスト |

### テストユーティリティ

```typescript
// テスト用のTodo生成ヘルパー
const createTodo = (overrides?: Partial<Todo>): Todo => ({
  id: crypto.randomUUID(),
  title: "テストタスク",
  completed: false,
  createdAt: new Date().toISOString(),
  ...overrides,
})
```

## アクセシビリティ基準

- **WCAG 2.1 AA 準拠**（PRD で定義）
- セマンティック HTML を優先（`<main>`, `<form>`, `<ul>`, `<li>`, `<button>`, `<input>`）
- チェックボックス: `<input type="checkbox">` + `<label>` の関連付け
- 削除ボタン: `aria-label` でタスク名を含める（例: `aria-label="タスク1を削除"`）
- フィルターボタン: `aria-pressed` で選択状態を示す
- Toast 通知: `role="alert"` + `aria-live="polite"`
- フォーカス管理: タスク追加後は入力フィールドにフォーカスを戻す
