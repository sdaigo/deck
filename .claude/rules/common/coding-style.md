# コーディング規約

プロジェクト固有の設定は `docs/development-guidelines.md` を参照。

## フォーマッター

**Biome** を使用。Edit/Write 後に hook で自動実行（`.claude/hooks/auto-format.sh`）。

## 命名規則

- 変数・関数: camelCase（関数は動詞始まり）
- 定数: UPPER_SNAKE_CASE
- Boolean: `is`/`has`/`can`/`should` 接頭辞
- イベントハンドラ: `handle` + イベント名、コールバック prop: `on` + イベント名
- 型: PascalCase、Props型: コンポーネント名 + `Props`
- Enumライク: `as const` オブジェクト

## 型安全

- `any` 禁止 → `unknown` + 型ガード
- 型アサーション (`as`) は最小限、使用時はコメントで理由を記載
- 関数の戻り値型は明示
- `interface` より `type` を優先

## 関数設計

- 20行以下目安、上限50行
- 引数3つ以下、超える場合はオブジェクト引数
- early return でネスト回避
- 副作用関数と純粋関数を分離

## イミュータビリティ

オブジェクト・配列を直接変更しない。`readonly`、スプレッド構文、`Array.map` を使う。

```typescript
// OK
const update = (item: Item, changes: Partial<Item>): Item =>
  ({ ...item, ...changes })

// NG - 直接変更
const update = (item: Item, changes: Partial<Item>): Item => {
  Object.assign(item, changes)
  return item
}
```

## コメント

- 「なぜ」を書く。自明なコードにはコメント不要
- JSDoc は公開 API のみ

## ファイルサイズ

- ファイル: 200-400行推奨、800行上限
- 関数: 10-20行推奨、50行上限
- コンポーネント props: 3-5個、超えたら分割検討
