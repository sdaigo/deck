---
description: 指定された機能の設計を開始し、.steering/ 内に作業用ドキュメントを生成する
---

# 新機能の設計開始

引数: `/feature-design [機能名]`

## ステップ1: 準備とコンテキスト設定

1. 現在のタスクコンテキストを確立する:
   - 機能名: `$ARGUMENTS`
   - 日付: `[現在の日付をYYYYMMDD形式で取得]`
   - ステアリングディレクトリパス: `.steering/[日付]-[機能名]/`
2. ステアリングディレクトリを作成する
3. 以下の3つの空ファイルを作成する:
   - `requirements.md`
   - `design.md`
   - `tasklist.md`

## ステップ2: プロジェクト理解

1. `CLAUDE.md` を読み、プロジェクトの全体像を把握する
2. `docs/` 内の以下を読み込む（全文ではなく設計判断に必要な範囲で）:
   - `docs/product-requirements.md` - 要求の全体像
   - `docs/architecture.md` - 技術的制約とレイヤー構成
   - `docs/glossary.md` - 用語の統一

注意: `docs/functional-design.md`, `docs/development-guidelines.md`, `docs/project-structure.md` は、steering 計画モードやステップ6の planner がサブプロセスで個別に読み込むため、ここでは読まない。

## ステップ3: 計画フェーズ（ステアリングファイルの生成）

1. `Skill('steering', args: '計画')` を実行し、requirements.md と design.md を生成する
   - steering は tasklist.md のスケルトンも作成するが、詳細化はステップ6で planner が行う
2. ユーザーの承認を得る

## ステップ4: ワイヤーフレーム作成

design.md の承認後、`Skill('lofi-wireframer')` を実行してユーザーフローとワイヤーフレームを作成する:

- 出力先: `.steering/[日付]-[機能名]/prototypes/`
- requirements.md と design.md を入力として渡す
- ユーザーの承認を得る

## ステップ5: UXレビュー

ワイヤーフレームの承認後、ux-reviewer エージェントを起動してUX観点のレビューを行う:

```
Task({
  subagent_type: "general-purpose",
  model: "sonnet",
  description: "ux-reviewer: 機能設計のUXレビュー",
  prompt: `
    .claude/agents/ux-reviewer.md を読み込み、ワークフローに従ってレビューしてください。
    対象:
    - .steering/[日付]-[機能名]/requirements.md
    - .steering/[日付]-[機能名]/design.md
    - .steering/[日付]-[機能名]/prototypes/userflow.md
    - .steering/[日付]-[機能名]/prototypes/wireframe.excalidraw
  `
})
```

- レビュー結果をユーザーに報告し、必要に応じて design.md やワイヤーフレームを修正する。
- ユーザーの承認を得る

## ステップ6: タスクリスト生成

UXレビューの反映後、planner エージェントを起動して tasklist.md を生成する。
planner は Write 権限を持ち、tasklist.md に直接書き込む。メインへの出力転送は概要のみ。

```
Task({
  subagent_type: "general-purpose",
  model: "opus",
  description: "planner: tasklist.md 生成",
  prompt: `
    .claude/agents/planner.md を読み込み、ワークフローに従って実装計画を策定してください。

    入力:
    - .steering/[日付]-[機能名]/requirements.md
    - .steering/[日付]-[機能名]/design.md
    - .steering/[日付]-[機能名]/prototypes/userflow.md

    出力先:
    - .steering/[日付]-[機能名]/tasklist.md に Write ツールで直接書き込むこと

    返却は概要のみ（フェーズ構成、タスク数、リスク）に留めてください。
    tasklist.md の全文を返す必要はありません。
  `
})
```

planner の概要報告を元にユーザーに報告し、承認を得る。
詳細を確認する場合は tasklist.md を直接参照する。

## ステップ7: UIデザイン依頼

tasklist.md の承認後、UIデザインの作業依頼をまとめてユーザーに提示する。

以下の内容を `.steering/[日付]-[機能名]/ui-design-brief.md` に出力する:

1. **デザイン対象画面の一覧** - wireframe と userflow から抽出
2. **各画面の要件** - design.md から主要なインタラクションと状態を抜粋
3. **参照ファイル** - wireframe、userflow のパスを明記
4. **デザイン参照方法** - 以下のいずれかをユーザーに選択してもらう

### デザイン参照方法の選択

ユーザーに以下の選択肢を提示する:

| 方式 | 設定 | 実装時の参照方法 |
|:---|:---|:---|
| **Figma MCP** | `.mcp.json` に Figma MCP を追加 | Figma URL を ui-design-brief.md に記載 |
| **ローカルファイル** | 設定不要 | エクスポート画像を `designs/` に配置 |

選択結果を ui-design-brief.md の「デザイン参照」セクションに記録する:

```markdown
## デザイン参照

方式: [Figma MCP / ローカルファイル]

<!-- Figma MCP の場合 -->
Figma URL: https://www.figma.com/design/XXXX/...

<!-- ローカルファイルの場合 -->
配置先: .steering/[日付]-[機能名]/designs/
```

## 補足

このコマンドは **設計フェーズのみ** を実行する。
実装に進む前に、UIデザイン（外部ツール）を完了させる必要がある。
準備ができたら `/feature-implement` コマンドで実装を開始する。
