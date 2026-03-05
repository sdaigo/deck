---
name: prd-architect
description: docs/proposals/ の内容からプロダクト要求定義書を生成する。/setup のPRD作成ステップで呼び出される。
user-invocable: false
allowed-tools: Read, Write
---

# PRD作成スキル

`docs/proposals/requirements.md` の内容を元に、プロダクト要求定義書を作成する。

## 前提ドキュメント

- `docs/proposals/requirements.md`（必須）- プロダクトのアイデア、課題、ターゲットユーザー、主要機能、MVPの範囲

## 出力先

`docs/product-requirements.md`

## 参照ファイル

- テンプレート: `./template.md`
- ガイド: `./guide.md`
