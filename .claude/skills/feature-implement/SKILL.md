---
name: feature-implement
description: 承認済みの設計とtasklist.mdに従い、ブランチ作成からPR作成まで実装を進める。/feature-design 完了後、UIデザインが揃った状態で使用する。
user-invocable: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Skill, Task
---

# 機能実装の開始

引数: `/feature-implement [ステアリングディレクトリパス]`

進捗チェックリストをコピーして追跡する:

```
実装進捗:
- [ ] ステップ1: ブランチ作成
- [ ] ステップ2: 設計読み込み + デザイン参照確認
- [ ] ステップ3: 実装モード（steering 実装）
- [ ] ステップ4: PR作成
```

## 前提条件

`.steering/[日付]-[機能名]/` に以下が存在すること:
- `requirements.md`, `design.md`, `tasklist.md` - 承認済み
- `prototypes/` - ワイヤーフレームとユーザーフロー
- `ui-design-brief.md` - デザイン参照方法

## ステップ1: ブランチ作成

1. ステアリングディレクトリを特定（パス指定なし → `.steering/` 内の最新）
2. `feature/[機能名]` ブランチを `develop` から作成

## ステップ2: 設計読み込み + デザイン参照確認

1. `requirements.md`, `design.md`, `tasklist.md` を読み込む
2. `ui-design-brief.md` のデザイン参照方法に応じて処理:
   - **Pencil**: MCP ツールの利用可能性を確認
   - **Figma MCP**: URL と MCP の利用可能性を確認
   - **ローカルファイル**: `docs/designs/` の存在を確認
3. タスクリスト全体像を報告し、開始確認を得る

## ステップ3: 実装モード

`Skill('steering')` を実行する。

steering スキルのモード2（実装）に従い自動的に処理される:
- tasklist.md の未完了タスクを順に実装
- 新規コードタスクでは tdd-practitioner を起動
- フェーズ完了時に test-runner でローカルチェック
- 全タスク完了後にモード2.5（品質ゲート）-> モード3（振り返り）へ

## ステップ4: PR 作成

1. `git push -u origin feature/[機能名]`
2. `gh pr create --base develop` で PR 作成
   - タイトル: `feat: [機能名の概要]`
   - 本文: requirements.md のサマリー + tasklist.md の完了状況
3. PR URL をユーザーに報告
