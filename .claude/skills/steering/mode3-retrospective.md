# モード3: 振り返り + フィードバック

## 目的

品質ゲート通過後、スペック適合性の検証と振り返りを行います。
Tier M/L では Team Validate を並列起動してフィードバックループを実行します。

## Team Validate: Spec Compliance（M/L のみ）

**Tier M**（2体）:

```text
以下を並列起動:
  Task(implementation-validator):
    "requirements.md の受け入れ条件と実装を照合。
     各条件が満たされているか、具体的なコード箇所を示して検証。
     requirements.md のパス: .steering/[日付]-feature-[機能名]/requirements.md"

  Task(doc-reviewer):
    "以下の docs/ への影響を分析:
     - docs/architecture.md: 新しいディレクトリ/レイヤー/依存関係の追加
     - docs/glossary.md: 新しいドメイン用語の登場
     - docs/development-guidelines.md: 新しいパターン/規約の確立
     更新が必要な箇所があれば具体的に指摘"
```

**Tier L**（M に加えて1体追加、計3体）:

```text
  Task(Explore):
    "変更されたコードが docs/architecture.md の依存ルールに違反していないか調査。
     特に:
     - レイヤー間の依存方向ルール
     - モジュール間の依存制約
     - ディレクトリ構造のルール"
```

## フィードバックループ

Team Validate の結果に基づき:

**Tier M**: docs/ 更新が必要な箇所をユーザーに **提案** する

```text
「以下の docs/ に更新が必要な可能性があります:
 - [ドキュメント名]: [更新内容]
 更新しますか？」
```

**Tier L**: docs/ 更新を **必須** で実施する

```text
「以下の docs/ を更新します:
 - [ドキュメント名]: [更新内容]
 内容を確認してください。」
```

## 振り返り記録

1. **tasklist.md を読み込む**

   ```text
   Read('.steering/[日付]-feature-[機能名]/tasklist.md')
   ```

2. **振り返り内容を作成**
   - 実装完了日
   - 計画と実績の差分（計画と異なった点）
   - Team Validate の検証結果サマリ（M/L の場合）
   - 学んだこと（技術的な学び、プロセス上の改善点）
   - 次回への改善提案

3. **Edit ツールで更新**

   ```text
   tasklist.md の「実装後の振り返り」セクションを更新
   ```

4. **ユーザーに報告**

   ```text
   「振り返りを tasklist.md に記録しました。内容を確認してください。」
   ```

## クリーンアップ提案（M/L のみ）

振り返り完了後、品質ゲート（モード2.5）の Maintainability レビューでデッドコードや重複コードが指摘されていた場合、refactor-cleaner によるクリーンアップを提案する:

```text
「品質ゲートで以下のクリーンアップ候補が検出されました:
 - [指摘内容]
 refactor-cleaner でクリーンアップを実行しますか？」
```

ユーザーが承認した場合のみ実行:

```text
Task(general-purpose):
  "まず .claude/agents/refactor-cleaner.md を読み込み、リファクタリングワークフローに従ってください。
   対象: [指摘された箇所]
   実施内容: [デッドコード除去 / 重複統合 / 未使用依存関係除去]
   安全チェックリストに従い、テストがパスすることを確認してからコミット"
```

クリーンアップの実施有無はユーザー判断。強制しない。

## Tier S の場合（簡易フィードバック）

Team Validate は起動しない。振り返り記録も省略する。
ただし docs/ への影響チェックは実施し、負債の蓄積を防ぐ。

### 手順

1. **変更ファイルの一覧を確認**

   ```bash
   git diff --name-only develop...HEAD
   ```

2. **docs/ への影響を自己チェック**（エージェント不使用）

   以下の観点で変更内容を確認する:
   - `architecture.md`: 新しいディレクトリ・依存関係・レイヤーの追加があったか
   - `glossary.md`: 新しいドメイン用語が登場したか
   - `development-guidelines.md`: 新しいパターン・規約が確立されたか

3. **影響がある場合、ユーザーに提案する**

   ```text
   「以下の docs/ に更新が必要な可能性があります:
    - [ドキュメント名]: [更新内容]
    更新しますか？」
   ```

4. **影響がない場合、完了**

---

## チェックリスト

- [ ] Tier S の場合、docs/ への簡易影響チェックを実施したか？
- [ ] Team Validate を並列起動したか？（M/L のみ）
- [ ] フィードバックループを実行したか？（M/L のみ）
- [ ] tasklist.md の振り返りセクションを更新したか？（M/L のみ）
- [ ] クリーンアップ提案を行ったか？（Maintainability 指摘がある場合、M/L のみ）
- [ ] ユーザーに報告したか？
