# テスト原則

ツール固有の設定は `docs/development-guidelines.md` を参照。

## TDD

新機能は Red → Green → Refactor で進める。

## カバレッジ目標

- ユニットテスト: サービス・ユーティリティで80%以上
- 統合テスト: API → Service → DB の主要フロー
- E2E: 主要ユーザーシナリオ

## テスト構造

`describe` + `it` で自然な文として読める命名。Arrange-Act-Assert パターン:

```typescript
it("条件に一致する要素を返す", () => {
  // Arrange
  const items = [{ id: "1", name: "A" }, { id: "2", name: "B" }] as const

  // Act
  const result = findItem(items, "1")

  // Assert
  expect(result?.name).toBe("A")
})
```

## モック原則

- 外部依存（API、DB、ストレージ）はモック化
- ビジネスロジックは実装を使用
- モックは専用ディレクトリに集約、テスト間で状態が漏れないようにする
