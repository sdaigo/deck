---
description: 指定された機能の設計を開始し、.steering/ 内に作業用ドキュメントを生成する
---

# 新機能の設計開始

引数: `/feature-design [機能名]`

## ステップ1: 準備とコンテキスト設定

1. 現在のタスクコンテキストを確立する:
   - 機能名: `$ARGUMENTS`
   - 日付: `[現在の日付をYYYYMMDD形式で取得]`
   - ステアリングディレクトリパス: `.steering/[日付]-feature-[機能名]/`
2. ステアリングディレクトリを作成する
3. 以下の3つの空ファイルを作成する:
   - `requirements.md`
   - `design.md`
   - `tasklist.md`

## ステップ2: プロジェクト理解

1. `CLAUDE.md` を読み、プロジェクトの全体像を把握する
2. `docs/` 内の以下を読み込む（設計判断に必要な範囲で）:
   - `docs/product-requirements.md` - 要求の全体像
   - `docs/architecture.md` - 技術的制約とレイヤー構成
   - `docs/glossary.md` - 用語の統一

注意: `docs/functional-design.md`, `docs/development-guidelines.md`, `docs/project-structure.md` は、steering 計画モードやステップ6の planner がサブプロセスで個別に読み込むため、ここでは読まない。

## ステップ3: 計画フェーズ

1. `Skill('steering', args: '計画')` を実行し、requirements.md と design.md を生成する
2. ユーザーの承認を得る

## ステップ4: ワイヤーフレーム作成

design.md の承認後、`Skill('lofi-wireframer')` を実行:

- 出力先: `.steering/[日付]-[機能名]/prototypes/`
- requirements.md と design.md を入力として渡す
- ユーザーの承認を得る

## ステップ5: UXレビュー

ワイヤーフレームの承認後、ux-reviewer (sonnet) を起動。対象:
- `.steering/[日付]-[機能名]/requirements.md`
- `.steering/[日付]-[機能名]/design.md`
- `.steering/[日付]-[機能名]/prototypes/userflow.md`
- `.steering/[日付]-[機能名]/prototypes/wireframe.excalidraw`

レビュー結果をユーザーに報告し、必要に応じて design.md やワイヤーフレームを修正する。ユーザーの承認を得る。

## ステップ6: タスクリスト生成

UXレビューの反映後、planner (opus) を起動して tasklist.md を生成する。
planner は Write 権限を持ち、tasklist.md に直接書き込む。メインへの出力転送は概要のみ。

入力:
- `.steering/[日付]-[機能名]/requirements.md`
- `.steering/[日付]-[機能名]/design.md`
- `.steering/[日付]-[機能名]/prototypes/userflow.md`

出力先: `.steering/[日付]-[機能名]/tasklist.md`

planner の概要報告を元にユーザーに報告し、承認を得る。

## ステップ7: UIデザイン依頼

tasklist.md の承認後、UIデザインの作業依頼をまとめてユーザーに提示する。

以下の内容を `.steering/[日付]-[機能名]/ui-design-brief.md` に出力する:

1. **デザイン対象画面の一覧** - wireframe と userflow から抽出
2. **各画面の要件** - design.md から主要なインタラクションと状態を抜粋
3. **参照ファイル** - wireframe、userflow のパスを明記
4. **デザイン参照方法** - 以下のいずれかをユーザーに選択してもらう

### デザイン参照方法の選択

ユーザーに以下の選択肢を提示する:

- **Pencil** (推奨): MCP 自動起動。`docs/designs/*.pen` を MCP 経由で参照
- **Figma MCP**: `.mcp.json` に Figma MCP を追加。Figma URL を ui-design-brief.md に記載
- **ローカルファイル**: 設定不要。エクスポート画像を `docs/designs/` に配置

### Pencil MCP 接続の前提条件

Pencil を選択した場合、デザイン作業の前に以下を確認する:

1. **Pencil デスクトップアプリが起動していること** - MCP は WebSocket で Pencil アプリに接続するため、アプリが起動していないと全ツールが失敗する
2. **ユーザーに .pen ファイルを開いてもらうこと** - `open docs/designs/[ファイル名].pen` をユーザーに依頼し、Pencil アプリ上でファイルが開かれた状態にする
3. **接続確認** - `get_editor_state` が正常に応答することを確認してからデザイン作業を開始する

接続に失敗した場合は、ユーザーに上記1-2の手順を案内する。

デザインファイルは **`docs/designs/`** に配置する（機能横断で共有するため）。
選択結果を ui-design-brief.md の「デザイン参照」セクションに記録する:

```markdown
## デザイン参照

方式: [Pencil / Figma MCP / ローカルファイル]

<!-- Pencil の場合 -->
デザインファイル: docs/designs/[ファイル名].pen
対象レイヤー: [この機能で実装する画面・コンポーネントのレイヤー名]

<!-- Figma MCP の場合 -->
Figma URL: https://www.figma.com/design/XXXX/...

<!-- ローカルファイルの場合 -->
配置先: docs/designs/
```

## 補足

このコマンドは **設計フェーズのみ** を実行する。
UIデザイン完了後、`/feature-implement` で実装を開始する。
