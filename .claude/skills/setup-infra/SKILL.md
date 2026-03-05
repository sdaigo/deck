---
name: setup-infra
description: デプロイ先の選定、環境構成設計、GitHub Actions CI/CDパイプラインを構築する。/setup 完了後のインフラ構築時に使用する。
user-invocable: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Skill, Task
---

# インフラセットアップ

前提: `/setup` 完了済みで `docs/architecture.md` と `docs/product-requirements.md` が存在すること。

## ステップ1: インフラ構成の設計

`Skill('infra-guide')` を実行。設計結果を `docs/architecture.md` のインフラセクションに追記する。

**承認されるまで次に進まない。**

## ステップ2: CI/CD パイプラインの生成

`Skill('ci-cd')` を実行。ステップ1の選定結果に基づきワークフローを生成する。

## ステップ3: シークレットと環境の案内

ユーザーに手動設定を案内: GitHub Secrets、GitHub Environments、`.env.example`

## 完了条件

```text
docs/architecture.md          # インフラセクション追記済み
.github/actions/setup/action.yml
.github/workflows/ci.yml
.github/workflows/deploy-staging.yml
.github/workflows/deploy-production.yml
```
