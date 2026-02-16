export type Todo = {
  readonly id: string
  readonly title: string
  readonly completed: boolean
  readonly createdAt: string
}

export type FilterType = "all" | "active" | "completed"

export type ToastType = "error" | "warning" | "info"

export type ToastMessage = {
  readonly id: string
  readonly type: ToastType
  readonly message: string
}

export type StorageSchema = {
  readonly todos: ReadonlyArray<Todo>
  readonly version: number
}

export type ErrorFallbackProps = {
  readonly error: Error
  readonly onReset: () => void
}

export type ToastProps = {
  readonly messages: ReadonlyArray<ToastMessage>
  readonly onDismiss: (id: string) => void
}

export type UseToastReturn = {
  readonly messages: ReadonlyArray<ToastMessage>
  readonly showToast: (type: ToastType, message: string) => void
  readonly dismissToast: (id: string) => void
}

export type TodoStorage = {
  readonly load: () => ReadonlyArray<Todo>
  readonly save: (todos: ReadonlyArray<Todo>) => void
}
