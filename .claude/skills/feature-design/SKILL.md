---
name: feature-design
description: 要件定義、UX設計、ワイヤーフレーム生成、タスク分解を .steering/ に作成する。新機能の設計を開始するときに使用する。
user-invocable: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Skill, Task
---

# 新機能の設計開始

引数: `/feature-design [機能名]`

進捗チェックリストをコピーして追跡する:

```
設計進捗:
- [ ] ステップ1: 準備とコンテキスト設定
- [ ] ステップ2: プロジェクト理解
- [ ] ステップ3: 計画フェーズ（requirements.md + design.md）
- [ ] ステップ4: ワイヤーフレーム作成
- [ ] ステップ5: UXレビュー
- [ ] ステップ6: タスクリスト生成
- [ ] ステップ7: UIデザイン依頼
```

## ステップ1: 準備とコンテキスト設定

1. コンテキストを確立:
   - 機能名: `$ARGUMENTS`
   - 日付: YYYYMMDD形式
   - パス: `.steering/[日付]-feature-[機能名]/`
2. ステアリングディレクトリと空ファイル（`requirements.md`, `design.md`, `tasklist.md`）を作成

## ステップ2: プロジェクト理解

`CLAUDE.md`, `docs/product-requirements.md`, `docs/architecture.md`, `docs/glossary.md` を読み込む。

`docs/functional-design.md`, `docs/development-guidelines.md`, `docs/project-structure.md` は steering サブプロセスで個別に読み込むため、ここでは読まない。

## ステップ3: 計画フェーズ

1. `Skill('steering', args: '計画')` を実行
2. ユーザーの承認を得る

## ステップ4: ワイヤーフレーム作成

`Skill('lofi-wireframer')` を実行:
- 出力先: `.steering/[日付]-[機能名]/prototypes/`
- ユーザーの承認を得る

## ステップ5: UXレビュー

ux-reviewer (sonnet) を起動。対象: requirements.md, design.md, prototypes/
レビュー結果を反映し、ユーザーの承認を得る。

## ステップ6: タスクリスト生成

planner (opus) を起動して tasklist.md を生成。planner は Write 権限を持ち直接書き込む。
ユーザーの承認を得る。

## ステップ7: UIデザイン依頼

`.steering/[日付]-[機能名]/ui-design-brief.md` にデザイン作業依頼を出力。
デザイン参照方法をユーザーに選択してもらう。詳細は [ui-design-brief.md](ui-design-brief.md) を参照。

### デザイン参照方法の選択

- **Pencil** (推奨): MCP 経由で `docs/designs/*.pen` を参照。Pencil デスクトップアプリが起動している必要がある
- **Figma MCP**: `.mcp.json` に Figma MCP を追加
- **ローカルファイル**: エクスポート画像を `docs/designs/` に配置

デザインファイルは `docs/designs/` に配置する（機能横断で共有するため）。

このスキルは **設計フェーズのみ** を実行する。UIデザイン完了後、`/feature-implement` で実装を開始する。
