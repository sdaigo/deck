# エージェント委譲ルール

エージェント定義は `.claude/agents/` の各 YAML Front Matter を参照。

## PROACTIVE 起動条件

ユーザーの指示がなくても、以下の条件で自動的にエージェントを起動する:

1. **design.md 作成直後** → `ux-reviewer` (sonnet) を起動
2. **コード変更直後** → `code-reviewer` (sonnet) + `security-reviewer` (sonnet) を並行起動
3. **UIコンポーネント実装直後** → `a11y-auditor` (sonnet) を起動
4. **DBスキーマ変更直後** → `db-reviewer` (sonnet) を起動
5. **フェーズ完了時** → `test-runner` (haiku) を `--full` モードで起動

`planner` (opus) は `/feature-design` 内部の tasklist.md 生成時にのみ使用。PROACTIVE ではない。

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

- code-reviewer + security-reviewer は常にペアで並行起動
- a11y-auditor は UI 変更がある場合に追加で並行起動
