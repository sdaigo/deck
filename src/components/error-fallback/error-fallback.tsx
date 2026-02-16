import { STORAGE_KEY } from "@/lib/storage"
import type { ErrorFallbackProps } from "@/types/todo"

export function ErrorFallback({ error, onReset }: ErrorFallbackProps): React.ReactElement {
  if (import.meta.env.DEV) {
    console.error(error)
  }

  const handleReload = (): void => {
    window.location.reload()
  }

  const handleReset = (): void => {
    const confirmed = window.confirm("すべてのデータが削除されます。よろしいですか？")
    if (!confirmed) return
    localStorage.removeItem(STORAGE_KEY)
    onReset()
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="mb-2 text-xl font-bold text-gray-900">問題が発生しました</h1>
        <p className="mb-6 text-sm text-gray-600">
          予期しないエラーが発生しました。ページを再読み込みしてください。
        </p>
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={handleReload}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            再読み込み
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            データをリセット
          </button>
        </div>
      </div>
    </main>
  )
}
