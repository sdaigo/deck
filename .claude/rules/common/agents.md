# エージェント委譲ルール

エージェント定義は `.claude/agents/` の各 YAML Front Matter を参照。

## 起動条件

### steering フロー内

レビューは steering スキルのモード2.5（品質ゲート）で一括制御される:

- **Tier S**: steering モード2.5 で Team Check + Review（security-reviewer + code-reviewer[Correctness] の2体）を起動
- **Tier M/L**: steering モード2.5 で Team Check + Review（security-reviewer + code-reviewer[Correctness, Performance, Maintainability] の4体）を起動

### steering フロー外

steering を経由しないコード変更（直接の修正指示等）では、各エージェントが PROACTIVE に自動起動する:

- コード変更後: code-reviewer + security-reviewer
- UI コンポーネント変更後: 上記 + a11y-auditor
- DB スキーマ変更後: 上記 + db-reviewer
- 新規コード作成時: tdd-practitioner

手動起動コマンド:
- `/audit-a11y` - アクセシビリティ監査
- `/review-code` - コードレビュー

### component-builder の位置づけ

`component-builder` は steering モード2（実装）内で補助的に使用する内部スキル:

- タスクがコンポーネントの新規作成を含む場合に自動で呼び出す
- `user-invocable: false` のためユーザーからの直接呼び出しは不可
- PROACTIVE 起動は行わない

### test-runner の位置づけ

`test-runner` は steering モード2（実装）内でフェーズ完了時に起動するエージェント:

- 各フェーズ完了時にテスト実行・結果分析を行う（品質ゲート前の早期検出）
- tdd-practitioner（テスト作成）と補完関係（test-runner はテスト実行・分析）
- haiku モデルで軽量に実行
- 失敗時は原因分析と修正案を提示

### tdd-practitioner の位置づけ

`tdd-practitioner` は steering モード2（実装）内で自動起動するエージェント:

- 新規コード（関数・サービス・コンポーネント）を含むタスクで自動起動
- Red-Green-Refactor サイクルでテストファースト開発を強制
- test-runner（テスト実行・結果分析）と補完関係
- 設定変更・ドキュメント変更のみのタスクでは起動しない

### refactor-cleaner の位置づけ

`refactor-cleaner` は steering モード3（振り返り）後に条件付きで提案されるエージェント:

- 品質ゲートの Maintainability レビューでデッドコード・重複が指摘された場合に提案
- ユーザー承認後にのみ実行（自動実行しない）
- アクティブな機能開発中は使用しない
- knip, depcheck, ts-prune 等の分析ツールを使用

**注意**: レビューの実行タイミングは steering スキルのモード2.5 に集約されている。個々のタスク完了時にはローカルテスト（型チェック・Lint・ユニットテスト）のみ実行し、エージェントレビューは steering モード2.5 の品質ゲートでバッチ実行する。

`planner` (sonnet) は steering スキル内部の tasklist.md 生成時にのみ使用。PROACTIVE ではない。

## Agent Spawning Pattern

```
Task({
  subagent_type: "general-purpose",
  model: [エージェントのmodel値],
  description: "[エージェント名]: [簡潔な説明]",
  prompt: `
    まず .claude/agents/[エージェント名].md を読み込み、
    あなたの役割、ワークフロー、出力フォーマットを理解してください。
    次に、以下のタスクを実行してください:
    [具体的な指示]
    対象: [ファイルパスまたは範囲]
  `
})
```

## Parallel Execution

独立したレビューは必ず並行実行する。逐次実行は禁止。

- security-reviewer（Security）と code-reviewer（Correctness, Performance, Maintainability）を並行起動
- a11y-auditor は UI 変更がある場合に追加で並行起動

## コンテキスト効率化

メインコンテキストの役割は「指揮・判断・報告」に限定する。

- ファイル読み込み・修正の実作業はサブエージェントに委譲する
- 調査（レビュー・探索）だけでなく、修正作業もサブエージェントに委譲する
- 関連する修正はグループ化し、1つのサブエージェントにまとめて任せる
- 独立したグループは並列サブエージェントで同時実行する
- ユーザー判断が必要な箇所のみメインコンテキストで処理する

### 修正バッチパターン

修正の種類ごとにグループ化し、並列サブエージェントに委譲する:

- **タイポ・リネーム**（単純置換）-> 1エージェントにまとめてバッチ
- **参照先の修正**（ファイルパス変更）-> 1エージェントにまとめてバッチ
- **方針統一**（複数ファイルの記述を揃える）-> 1エージェントにまとめてバッチ

各グループは並列実行可能:

```
// 並列実行例
Task({ description: "タイポ修正: A, B, C ファイル", prompt: "..." })
Task({ description: "パス参照修正: D, E ファイル", prompt: "..." })
Task({ description: "方針統一: F, G, H ファイル", prompt: "..." })
```
