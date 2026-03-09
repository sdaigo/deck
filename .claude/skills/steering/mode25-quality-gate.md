# モード2.5: 品質ゲート

## 目的

Tier に応じたレビューチームを並列起動し、多角的にコード品質をチェックします。
Team Check と Team Review は同時に並列実行します。

## Team Check: Static Analysis

機械的チェックを Bash エージェントで並列実行する。
具体的なコマンドは `docs/development-guidelines.md` を参照。

**Tier S**:

```text
以下を並列起動:
  Task(Bash): "format チェックを実行して結果を報告"
  Task(Bash): "lint を実行して結果を報告"
  Task(Bash): "型チェックを実行して結果を報告"
  Task(Bash): "テストを実行して結果を報告"
```

**Tier M**（S に加えて）:

```text
  Task(Bash): "テストカバレッジを実行し、新規コードのカバレッジが80%以上か確認して結果を報告"
```

**Tier L**（M に加えて）:

```text
  Task(Bash): "ビルドを実行して結果を報告"
  Task(Bash): "テストカバレッジを実行し、全体カバレッジにリグレッションがないか確認して結果を報告"
```

## Team Review: Code Review（観点別レビュー）

code-reviewer エージェントを観点別に並列起動する。
**Team Check と同時に起動して構わない。**

**Tier S**（2体）:

```text
以下を並列起動:
  Task(security-reviewer):
    "変更されたコードをセキュリティの観点でレビュー。
     まず .claude/agents/security-reviewer.md を読み込み、ワークフローに従ってください。
     チェック観点:
     - インジェクション（SQL, コマンド, XSS）
     - 認証/認可の漏れ
     - 秘密情報の露出（APIキー, トークン, パスワード）
     - 入力バリデーションの不備
     - OWASP Top 10 への該当
     結果は Critical / Warning / Info の3段階で報告"

  Task(code-reviewer):
    "変更されたコードの正しさをレビュー。
     チェック観点:
     - ロジックの正しさ、エッジケースの考慮
     - 型安全性（any の使用, 型アサーションの妥当性）
     - immutability 違反（オブジェクト/配列のミューテーション）
     - 副作用の混入
     - null/undefined ハンドリング
     結果は Critical / Warning / Info の3段階で報告"
```

**Tier M/L**（S に加えて2体追加、計4体）:

```text
  Task(code-reviewer):
    "変更されたコードのパフォーマンスをレビュー。
     チェック観点:
     - 不要な再計算・再レンダリング
     - メモリリークの可能性
     - N+1 クエリ
     - 不要な API コール
     - バンドルサイズへの影響
     結果は Critical / Warning / Info の3段階で報告"

  Task(code-reviewer):
    "変更されたコードの保守性をレビュー。
     チェック観点:
     - 命名規則の遵守（docs/development-guidelines.md 準拠）
     - 責務分離（単一責務の原則）
     - ファイルサイズ上限（800行）
     - コードの重複
     - 過度な抽象化/抽象化不足
     結果は Critical / Warning / Info の3段階で報告"
```

## 結果統合

全チームの完了を待ち、結果を統合する。

### 統合レポートのフォーマット

```text
## 品質ゲート結果

### Team Check: Static Analysis
- format: [Pass/Fail]
- lint: [Pass/Fail]
- typecheck: [Pass/Fail]
- test: [Pass/Fail]
- coverage: [Pass/Fail/Skip]
- build: [Pass/Fail/Skip]

### Team Review: Code Review
#### Critical (必ず修正)
- [Security] [ファイル:行] 指摘内容
- [Correctness] [ファイル:行] 指摘内容

#### Warning (修正推奨)
- [Performance] [ファイル:行] 指摘内容
- [Maintainability] [ファイル:行] 指摘内容

#### Info (任意)
- [観点] [ファイル:行] 指摘内容
```

### 判定ルール

1. **Team Check に Fail がある場合**: 修正してモード2.5 を再実行
2. **Team Review に Critical がある場合**: ユーザーに一件ずつ確認。修正後モード2.5 を再実行
3. **Critical = 0 の場合**: Warning をユーザーに提示。対応するかはユーザー判断。受け入れ条件検証へ進む

---

## 受け入れ条件検証（Tier M/L のみ）

品質ゲート通過後、モード3 に進む前に requirements.md の受け入れ条件を検証する。
Tier S は requirements.md を作成しないため（tasklist.md のみ）、この工程はスキップする。

### なぜこの工程が必要か

品質ゲート（Team Check + Team Review）はコード品質を検証するが、「要件を満たしているか」は検証しない。
受け入れ条件の照合なしにモード3 に進むと、品質は高いが要件を満たしていない実装が通過してしまう。

### 手順

1. **requirements.md を読み込む**

   ```text
   Read('.steering/[日付]-feature-[機能名]/requirements.md')
   ```

2. **受け入れ条件を1件ずつ検証する**

   各条件について、実装が条件を満たしているかを確認する:
   - ファイルの存在確認（Glob）
   - 内容の確認（Grep, Read）
   - 動作の確認（必要に応じて Bash でテスト実行）

3. **検証結果をユーザーに報告する**

   ```text
   ## 受け入れ条件検証結果

   - [x] AC1: [条件の内容] - 検証方法: [どう確認したか]
   - [x] AC2: [条件の内容] - 検証方法: [どう確認したか]
   - [ ] AC3: [条件の内容] - 未達: [何が足りないか]
   ```

4. **未達の条件がある場合**: モード2 に戻り、該当タスクを追加して実装 -> 品質ゲートを再実行
5. **全条件を満たした場合**: モード3 へ進む

---

## トラブルシューティング

### Team Check 失敗時

1. **format 失敗**: フォーマッターを実行して自動修正 -> 再実行
2. **lint 失敗**: 自動修正可能なものは lint fix -> 手動修正が必要なものは修正 -> 再実行
3. **typecheck 失敗**: 型エラーを修正 -> 再実行
4. **test 失敗**: テストを修正 -> 再実行

Team Check は自動修正可能なものから順に対応し、全 Pass になるまで繰り返す。
回数制限なし（機械的チェックのため）。

### Team Review Critical 残存時

**リトライ上限: 3回**

1. **1回目の修正サイクル**: Critical 指摘を全件修正 -> モード2.5 を再実行
2. **2回目の修正サイクル**: 新たな Critical が出た場合は修正 -> モード2.5 を再実行
3. **3回目の修正サイクル**: さらに Critical が残る場合は修正 -> モード2.5 を再実行

**3回で Critical が解消しない場合のエスカレーション**:

1. 未解消の Critical 一覧をユーザーに提示
2. 以下の選択肢を提案:
   - **A. 要件見直し**: モード1 に差し戻し、requirements.md を修正して再計画
   - **B. 設計見直し**: Tier L の場合、design.md を修正して再実装
   - **C. Critical の受容**: ユーザー判断で Critical を Warning に格下げして続行
   - **D. 作業中断**: 現状を保存して作業を中断
3. ユーザーの判断を待つ（自動的に続行しない）

### API レート制限への対処

並列エージェント数が多すぎる場合:

1. Team Check を先に実行し、完了後に Team Review を実行する（直列化）
2. Team Review のレビュアーを2体ずつに分割して実行

---

## チェックリスト

- [ ] Team Check + Review を並列起動したか？
- [ ] 結果を統合レポートにまとめたか？
- [ ] Critical > 0 の場合、修正後に再実行したか？
- [ ] Critical = 0 でユーザーに Warning を報告したか？
- [ ] Tier M/L の場合、requirements.md の受け入れ条件を全件検証したか？
- [ ] 全条件を満たしてからモード3 に進んだか？
