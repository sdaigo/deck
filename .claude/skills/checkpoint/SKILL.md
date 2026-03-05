---
name: checkpoint
description: 現在の作業進捗を .steering/ に記録し、セッション間でコンテキストを引き継ぐ。作業の区切りやセッション終了前に使用する。
user-invocable: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# チェックポイント

引数: `/checkpoint [任意のメモ]`

## 手順

1. `git status` と `.steering/*/tasklist.md` で現在の状態を確認
2. サマリーを作成:

```
## Checkpoint: [日時]

### 完了した作業
### 進行中の作業
### 未着手の作業
### 変更ファイル
### メモ
$ARGUMENTS
```

3. `.steering/[日付]-[機能名]/checkpoint.md` に保存
   - 既存ファイルがあれば先頭に追記（`---` 区切り）
4. サマリーをユーザーに表示
