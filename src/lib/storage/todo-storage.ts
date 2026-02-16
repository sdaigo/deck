import type { Todo, TodoStorage } from "@/types/todo"

export const STORAGE_KEY = "simpletodo:data" as const
export const SCHEMA_VERSION = 1 as const

export const todoStorage: TodoStorage = {
  load: (): ReadonlyArray<Todo> => [],
  save: (_todos: ReadonlyArray<Todo>): void => {},
}
