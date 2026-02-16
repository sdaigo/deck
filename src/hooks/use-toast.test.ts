import { act, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { useToast } from "@/hooks/use-toast"

describe("useToast", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubGlobal("crypto", {
      randomUUID: vi
        .fn()
        .mockReturnValueOnce("uuid-1")
        .mockReturnValueOnce("uuid-2")
        .mockReturnValue("uuid-3"),
    })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it("showToast でメッセージが追加される", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.showToast("info", "テスト通知")
    })

    expect(result.current.messages).toHaveLength(1)
    expect(result.current.messages[0]).toEqual({
      id: "uuid-1",
      type: "info",
      message: "テスト通知",
    })
  })

  it("dismissToast でメッセージが消去される", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.showToast("info", "テスト通知")
    })

    act(() => {
      result.current.dismissToast("uuid-1")
    })

    expect(result.current.messages).toHaveLength(0)
  })

  it("info は 5 秒後に自動消去される", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.showToast("info", "テスト通知")
    })

    expect(result.current.messages).toHaveLength(1)

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(result.current.messages).toHaveLength(0)
  })

  it("warning は 10 秒後に自動消去される", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.showToast("warning", "警告メッセージ")
    })

    expect(result.current.messages).toHaveLength(1)

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(result.current.messages).toHaveLength(1)

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(result.current.messages).toHaveLength(0)
  })

  it("error は自動消去されない", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.showToast("error", "エラーメッセージ")
    })

    act(() => {
      vi.advanceTimersByTime(60000)
    })

    expect(result.current.messages).toHaveLength(1)
    expect(result.current.messages[0]?.type).toBe("error")
  })

  it("最大 5 件を超えた場合、古い非 error メッセージが消去される", () => {
    vi.stubGlobal("crypto", {
      randomUUID: vi
        .fn()
        .mockReturnValueOnce("id-1")
        .mockReturnValueOnce("id-2")
        .mockReturnValueOnce("id-3")
        .mockReturnValueOnce("id-4")
        .mockReturnValueOnce("id-5")
        .mockReturnValueOnce("id-6")
        .mockReturnValueOnce("id-7"),
    })

    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.showToast("error", "エラー1")
    })
    act(() => {
      result.current.showToast("info", "情報1")
    })
    act(() => {
      result.current.showToast("info", "情報2")
    })
    act(() => {
      result.current.showToast("info", "情報3")
    })
    act(() => {
      result.current.showToast("info", "情報4")
    })
    act(() => {
      result.current.showToast("info", "情報5")
    })

    // error + 5 non-error = 6 total, but max 5 non-error
    // oldest non-error (情報1) should be removed
    const nonErrorMessages = result.current.messages.filter((m) => m.type !== "error")
    expect(nonErrorMessages).toHaveLength(5)
    expect(result.current.messages.find((m) => m.type === "error")).toBeDefined()
    expect(nonErrorMessages[0]?.message).toBe("情報1")
  })
})
