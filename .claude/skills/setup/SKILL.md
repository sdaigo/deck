---
name: setup
description: 対話形式で docs/ の永続ドキュメント6種（PRD、機能設計、アーキテクチャ等）を生成する。プロジェクト初回セットアップ時に使用する。
user-invocable: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Skill, Task
---

# 初回プロジェクトセットアップ

進捗チェックリストをコピーして追跡する:

```
セットアップ進捗:
- [ ] 環境チェック（jq）
- [ ] ステップ0: インプット読み込み
- [ ] ステップ1: PRD（prd-architect）
- [ ] ステップ2: 機能設計書（functional-design）
- [ ] ステップ3: アーキテクチャ設計書（architecture-design）
- [ ] ステップ4: プロジェクト構造（project-structure）
- [ ] ステップ5: 開発ガイドライン（development-guidelines）
- [ ] ステップ6: 用語集（glossary-creation）
```

## 環境チェック

`jq --version` で jq の存在を確認。不足時は `brew install jq` を案内。

## ステップ0: インプット読み込み

`docs/proposals/` 内のマークダウンを読む:
- あれば PRD の参考にする
- なければユーザーと対話してアイデアを練り、`docs/proposals/requirements.md` に記録

**承認されるまで次のステップに進まない。**

## ステップ1-6: ドキュメント生成

各ステップで対応スキルをロードし、テンプレートとガイドに従ってドキュメントを生成する。**各ステップの完了後、ユーザーの承認を得てから次に進む。**

| ステップ | スキル | 出力先 |
|:---|:---|:---|
| 1. PRD | prd-architect | `docs/product-requirements.md` |
| 2. 機能設計 | functional-design | `docs/functional-design.md` |
| 3. アーキテクチャ | architecture-design | `docs/architecture.md` |
| 4. 構造定義 | project-structure | `docs/project-structure.md` |
| 5. 開発ガイドライン | development-guidelines | `docs/development-guidelines.md` |
| 6. 用語集 | glossary-creation | `docs/glossary.md` |

**ステップ5の注意**: `rules/common/` に定義済みの汎用原則は重複させない。プロジェクト固有の設定のみ記載する。

## 完了後の案内

- `/setup-infra` でインフラ構成と CI/CD パイプラインを構築できる
- `/feature-design` で個別機能の作業計画を開始できる
