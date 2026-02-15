---
name: steering
description: 作業指示毎の作業計画、タスクリストをドキュメントに記録するためのスキル。ユーザーからの指示をトリガーとした作業計画時、検証時に読み込む。
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task
---

# Steering スキル

ステアリングファイル（`.steering/`）に基づいた機能設計を支援し、実装に必要なtasklist.md（進捗管理）を作成するスキル。

## スキルの目的

- ステアリングファイル（requirements.md, design.md, tasklist.md）の作成支援
- 実装時にtasklist.mdに基づいた段階的な進捗管理

## モード振り分け

引数でモードを指定する:

- `Skill('steering', args: '計画')` → 計画モード
- `Skill('steering', args: '実装')` → 実装モード
- `Skill('steering', args: '振り返り')` → 振り返りモード

引数なしの場合は、現在の `.steering/` の状態から自動判定する:
- tasklist.md が未作成 → 計画モード
- 未完了タスクあり → 実装モード
- 全タスク完了済み → 振り返りモード

## モード別の手順

モードが決まったら、対応するファイルを **Read ツールで読み込んで** 手順に従う:

| モード | ファイル | 概要 |
|:---|:---|:---|
| 計画 | `.claude/skills/steering/plan.md` | ステアリングファイルを作成 |
| 実装 | `.claude/skills/steering/implement.md` | tasklist.mdに従って実装・コミット |
| 振り返り | `.claude/skills/steering/retrospective.md` | 実装完了後の振り返りを記録 |
