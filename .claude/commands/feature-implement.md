---
description: 承認済みの設計に基づき、tasklist.mdに従って実装を開始する
---

# 機能実装の開始

引数: `/feature-implement [ステアリングディレクトリパス]`

## 前提条件

- `/feature-design` で設計が完了し、ユーザーの承認を得ていること
- UIデザインが完了していること（外部ツールで作成）
- `.steering/[日付]-[機能名]/` に以下が存在すること:
  - `requirements.md` - 承認済みの要件
  - `design.md` - UXレビュー反映済みの設計
  - `tasklist.md` - planner が生成した詳細タスクリスト
  - `prototypes/` - ワイヤーフレームとユーザーフロー
  - `ui-design-brief.md` - デザイン参照方法が記載されている

## ステップ1: ブランチ作成

1. 引数で指定されたステアリングディレクトリを特定する
   - パス指定なし → `.steering/` 内の最新ディレクトリを使用
2. ディレクトリ名から機能名を取得し、`feature/[機能名]` ブランチを `develop` から作成する
   ```bash
   git checkout develop && git pull && git checkout -b feature/[機能名]
   ```

## ステップ2: 設計の読み込みとデザイン参照の確認

1. `requirements.md`, `design.md`, `tasklist.md` を読み込む
3. `ui-design-brief.md` を読み込み、デザイン参照方法を判定する:

### デザイン参照方法の判定

`ui-design-brief.md` の「デザイン参照」セクションを読み、方式に応じて処理する:

**Pencil の場合:**
- `docs/designs/*.pen` の存在を確認
- Pencil MCP ツールが利用可能か確認（`batch_design`, `batch_get`, `get_screenshot` 等）
- 利用可能: MCP 経由で取得、利用不可: ユーザーに Pencil 起動を促す

**Figma MCP の場合:**
- Figma URL の記載と MCP ツールの利用可能性を確認
- 利用不可: ローカルファイル方式への切り替えを提案

**ローカルファイルの場合:**
- `docs/designs/` の存在とファイル一覧を確認
- 存在しない場合: デザイン未配置の可能性を警告

**ui-design-brief.md が存在しない場合:**
- UIデザインフェーズがスキップされた可能性を伝え、続行するか確認

4. タスクリストの全体像をユーザーに報告し、開始の確認を得る

## ステップ3: 実装モードで開始

`Skill('steering', args: '実装')` を実行する。

steeringスキルの実装モードに従い:
- tasklist.md の未完了タスクを順に実装
- 各タスク完了時に tasklist.md を更新
- 各タスクでPROACTIVEエージェントを自動起動
- 5タスクごとにセルフチェック

## ステップ4: フェーズ完了時

1. test-runner (haiku) を起動してフルテスト実行
2. テスト失敗時はステップ3に戻り修正。全テスト通過するまで次に進まない
3. tasklist.md の進捗をユーザーに報告
4. 次のフェーズへの承認を得る

## ステップ5: 全タスク完了

1. tasklist.md の全タスクが `[x]` であることを確認
2. test-runner (haiku) で最終テスト
3. `Skill('steering', args: '振り返り')` を実行し、振り返りを記録

## ステップ6: PR 作成

1. リモートにプッシュする
   ```bash
   git push -u origin feature/[機能名]
   ```
2. `gh pr create` で develop へのプルリクエストを作成する
   - タイトル: `feat: [機能名の概要]`
   - 本文: requirements.md のサマリー + tasklist.md の完了状況
   - ベースブランチ: `develop`
3. PR の URL をユーザーに報告し、完了を伝える
