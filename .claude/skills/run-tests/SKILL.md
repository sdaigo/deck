---
name: run-tests
description: test-runnerサブエージェントでテストを実行する。ユニットテスト、E2E、カバレッジ計測が必要なときに使用する。
user-invocable: true
allowed-tools: Read, Bash, Glob, Grep, Task
---

# テスト実行

引数: `/run-tests [対象パス] [--full|--e2e|--coverage]`

test-runner (haiku) を起動し、結果をユーザーに報告する。
