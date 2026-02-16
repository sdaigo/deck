import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { App, ErrorBoundary } from "@/app"

describe("App", () => {
  it("SimpleTodo ヘッダーを表示する", () => {
    render(<App />)
    expect(screen.getByText("SimpleTodo")).toBeInTheDocument()
  })
})

describe("ErrorBoundary", () => {
  it("エラー発生時に ErrorFallback を表示する", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {})

    function ThrowError(): React.ReactElement {
      throw new Error("テストエラー")
    }

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    )

    expect(screen.getByText("問題が発生しました")).toBeInTheDocument()

    spy.mockRestore()
  })
})
