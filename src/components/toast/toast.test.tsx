import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { Toast } from "@/components/toast"
import type { ToastMessage } from "@/types/todo"

const createMessage = (overrides: Partial<ToastMessage> = {}): ToastMessage => ({
  id: "test-id",
  type: "info",
  message: "テスト通知",
  ...overrides,
})

describe("Toast", () => {
  it("error メッセージが正しく表示される", () => {
    const messages = [createMessage({ type: "error", message: "エラー発生" })]
    render(<Toast messages={messages} onDismiss={vi.fn()} />)

    expect(screen.getByText("エラー発生")).toBeInTheDocument()
  })

  it("warning メッセージが正しく表示される", () => {
    const messages = [createMessage({ type: "warning", message: "警告です" })]
    render(<Toast messages={messages} onDismiss={vi.fn()} />)

    expect(screen.getByText("警告です")).toBeInTheDocument()
  })

  it("info メッセージが正しく表示される", () => {
    const messages = [createMessage({ type: "info", message: "お知らせ" })]
    render(<Toast messages={messages} onDismiss={vi.fn()} />)

    expect(screen.getByText("お知らせ")).toBeInTheDocument()
  })

  it("error の aria-live が assertive である", () => {
    const messages = [createMessage({ type: "error" })]
    render(<Toast messages={messages} onDismiss={vi.fn()} />)

    const region = screen.getByRole("alert")
    expect(region.closest("[aria-live]")?.getAttribute("aria-live")).toBe("assertive")
  })

  it("warning の aria-live が polite である", () => {
    const messages = [createMessage({ type: "warning" })]
    render(<Toast messages={messages} onDismiss={vi.fn()} />)

    const region = screen.getByRole("alert")
    expect(region.closest("[aria-live]")?.getAttribute("aria-live")).toBe("polite")
  })

  it("info の aria-live が polite である", () => {
    const messages = [createMessage({ type: "info" })]
    render(<Toast messages={messages} onDismiss={vi.fn()} />)

    const region = screen.getByRole("alert")
    expect(region.closest("[aria-live]")?.getAttribute("aria-live")).toBe("polite")
  })

  it("消去ボタンクリックで onDismiss が呼ばれる", async () => {
    const onDismiss = vi.fn()
    const messages = [createMessage({ id: "dismiss-test" })]
    render(<Toast messages={messages} onDismiss={onDismiss} />)

    const user = userEvent.setup()
    const dismissButton = screen.getByRole("button", { name: "閉じる" })
    await user.click(dismissButton)

    expect(onDismiss).toHaveBeenCalledWith("dismiss-test")
  })

  it("warning にプログレスバーが表示される", () => {
    const messages = [createMessage({ type: "warning" })]
    const { container } = render(<Toast messages={messages} onDismiss={vi.fn()} />)

    const progressBar = container.querySelector("[data-testid='progress-bar']")
    expect(progressBar).toBeInTheDocument()
  })

  it("info にプログレスバーが表示される", () => {
    const messages = [createMessage({ type: "info" })]
    const { container } = render(<Toast messages={messages} onDismiss={vi.fn()} />)

    const progressBar = container.querySelector("[data-testid='progress-bar']")
    expect(progressBar).toBeInTheDocument()
  })

  it("error にプログレスバーが表示されない", () => {
    const messages = [createMessage({ type: "error" })]
    const { container } = render(<Toast messages={messages} onDismiss={vi.fn()} />)

    const progressBar = container.querySelector("[data-testid='progress-bar']")
    expect(progressBar).not.toBeInTheDocument()
  })
})
