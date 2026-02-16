import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { App } from "@/app"

describe("App", () => {
  it("SimpleTodo ヘッダーを表示する", () => {
    render(<App />)
    expect(screen.getByText("SimpleTodo")).toBeInTheDocument()
  })
})
