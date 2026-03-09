# モード1: ステアリングファイル作成

## 目的

Tier M/L の作業のためにステアリングファイルを作成します。

## 手順

### ステップ1: 並列エージェントでコードベース調査

以下の2エージェントを **並列** で起動する:

```text
Task(Explore):
  "以下のコードベースを調査し、今回の作業に関連する既存の実装パターンを報告:
   - 類似機能の実装方法
   - 共通して使われているユーティリティやフック
   - テストの書き方のパターン"

Task(Explore):
  "以下の docs/ を読み込み、今回の作業に関連するルールを抽出:
   - docs/architecture.md
   - docs/development-guidelines.md
   - docs/glossary.md
   特に命名規則、レイヤー構造の制約を報告"
```

### ステップ2: ステアリングディレクトリの作成

```text
現在の日付を取得し、`.steering/[YYYYMMDD]-feature-[機能名]/` の形式でディレクトリを作成
```

### ステップ3: テンプレートからファイル作成

エージェントの調査結果を反映して、テンプレートからファイルを作成:

**Tier M**:

- `.claude/skills/steering/templates/requirements.md` -> `.steering/[日付]-feature-[機能名]/requirements.md`
  - 「実装アプローチ」セクションを追加（design.md の簡易版として）
- `.claude/skills/steering/templates/tasklist.md` -> `.steering/[日付]-feature-[機能名]/tasklist.md`

**Tier L**:

- `.claude/skills/steering/templates/requirements.md` -> `.steering/[日付]-feature-[機能名]/requirements.md`
- `.claude/skills/steering/templates/design.md` -> `.steering/[日付]-feature-[機能名]/design.md`
- `.claude/skills/steering/templates/tasklist.md` -> `.steering/[日付]-feature-[機能名]/tasklist.md`

### ステップ4: tasklist.md の詳細化

planner エージェントに tasklist.md を詳細化させる:

```text
Task(general-purpose):
  "まず .claude/agents/planner.md を読み込んでください。
   以下のステアリングファイルに基づいて tasklist.md を詳細化してください。

   requirements.md: .steering/[日付]-feature-[機能名]/requirements.md
   design.md: .steering/[日付]-feature-[機能名]/design.md（Tier L の場合のみ）
   tasklist テンプレート: .claude/skills/steering/templates/tasklist.md
   出力先: .steering/[日付]-feature-[機能名]/tasklist.md

   要件:
   - 各フェーズのタスクを具体的に記述
   - サブタスクも明確に
   - 実装の順序を明記
   - requirements.md の受け入れ条件を全て網羅するタスクリストにする
   - 実装可能なタスクのみをリストアップ（将来やるかもしれないタスクは含めない）"
```

### ステップ5: ユーザー承認

**Tier M**: requirements.md + tasklist.md を一括提示して承認

```text
「requirements.md と tasklist.md を作成しました。内容を確認してください。
 承認いただけたら実装に進みます。」
```

**Tier L**: requirements.md を先に承認 -> design.md + tasklist.md を承認

```text
(1回目)
「requirements.md を作成しました。内容を確認してください。
 承認いただけたら design.md と tasklist.md の作成に進みます。」

(2回目)
「design.md と tasklist.md を作成しました。内容を確認してください。
 承認いただけたら実装に進みます。」
```

---

## チェックリスト

- [ ] Explore エージェント x 2 を並列起動したか？
- [ ] 調査結果をステアリングファイルに反映したか？
- [ ] Tier に応じた承認フローを実行したか？
