import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { ErrorFallback } from "@/components/error-fallback"

describe("ErrorFallback", () => {
  const defaultProps = {
    error: new Error("テストエラー"),
    onReset: vi.fn(),
  }

  it("エラーメッセージが日本語で表示される", () => {
    render(<ErrorFallback {...defaultProps} />)

    expect(screen.getByText("問題が発生しました")).toBeInTheDocument()
    expect(
      screen.getByText("予期しないエラーが発生しました。ページを再読み込みしてください。"),
    ).toBeInTheDocument()
  })

  it("「再読み込み」ボタンが存在する", () => {
    render(<ErrorFallback {...defaultProps} />)

    expect(screen.getByRole("button", { name: "再読み込み" })).toBeInTheDocument()
  })

  it("「データをリセット」ボタンが存在する", () => {
    render(<ErrorFallback {...defaultProps} />)

    expect(screen.getByRole("button", { name: "データをリセット" })).toBeInTheDocument()
  })

  it("「データをリセット」で confirm が呼ばれる", async () => {
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(false)
    render(<ErrorFallback {...defaultProps} />)

    const user = userEvent.setup()
    await user.click(screen.getByRole("button", { name: "データをリセット" }))

    expect(confirmSpy).toHaveBeenCalled()
    confirmSpy.mockRestore()
  })

  it("confirm で OK 時に localStorage がクリアされ onReset が呼ばれる", async () => {
    const onReset = vi.fn()
    vi.spyOn(window, "confirm").mockReturnValue(true)
    const clearSpy = vi.spyOn(Storage.prototype, "clear")

    render(<ErrorFallback error={new Error("test")} onReset={onReset} />)

    const user = userEvent.setup()
    await user.click(screen.getByRole("button", { name: "データをリセット" }))

    expect(clearSpy).toHaveBeenCalled()
    expect(onReset).toHaveBeenCalled()

    clearSpy.mockRestore()
    vi.restoreAllMocks()
  })

  it("confirm でキャンセル時に localStorage がクリアされない", async () => {
    const onReset = vi.fn()
    vi.spyOn(window, "confirm").mockReturnValue(false)
    const clearSpy = vi.spyOn(Storage.prototype, "clear")

    render(<ErrorFallback error={new Error("test")} onReset={onReset} />)

    const user = userEvent.setup()
    await user.click(screen.getByRole("button", { name: "データをリセット" }))

    expect(clearSpy).not.toHaveBeenCalled()
    expect(onReset).not.toHaveBeenCalled()

    clearSpy.mockRestore()
    vi.restoreAllMocks()
  })
})
