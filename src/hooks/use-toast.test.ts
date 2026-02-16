import { act, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { useToast } from "@/hooks/use-toast"

describe("useToast", () => {
  let uuidCounter: number

  beforeEach(() => {
    uuidCounter = 0
    vi.useFakeTimers()
    vi.stubGlobal("crypto", {
      randomUUID: vi.fn(() => `uuid-${++uuidCounter}`),
    })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  describe("showToast", () => {
    it("メッセージが追加される", () => {
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
  })

  describe("dismissToast", () => {
    it("メッセージが消去される", () => {
      const { result } = renderHook(() => useToast())

      act(() => {
        result.current.showToast("info", "テスト通知")
      })
      expect(result.current.messages).toHaveLength(1)

      act(() => {
        result.current.dismissToast("uuid-1")
      })
      expect(result.current.messages).toHaveLength(0)
    })
  })

  describe("自動消去", () => {
    it("info は 5 秒後に自動消去される", () => {
      const { result } = renderHook(() => useToast())

      act(() => {
        result.current.showToast("info", "info通知")
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
        result.current.showToast("warning", "warning通知")
      })
      expect(result.current.messages).toHaveLength(1)

      act(() => {
        vi.advanceTimersByTime(9999)
      })
      expect(result.current.messages).toHaveLength(1)

      act(() => {
        vi.advanceTimersByTime(1)
      })
      expect(result.current.messages).toHaveLength(0)
    })

    it("error は自動消去されない", () => {
      const { result } = renderHook(() => useToast())

      act(() => {
        result.current.showToast("error", "error通知")
      })
      expect(result.current.messages).toHaveLength(1)

      act(() => {
        vi.advanceTimersByTime(60000)
      })
      expect(result.current.messages).toHaveLength(1)
      expect(result.current.messages[0]?.type).toBe("error")
    })
  })

  describe("最大表示数", () => {
    it("非 error が 5 件を超えた場合、古いものから消去される", () => {
      const { result } = renderHook(() => useToast())

      act(() => {
        for (let i = 1; i <= 5; i++) {
          result.current.showToast("info", `メッセージ${i}`)
        }
      })
      expect(result.current.messages).toHaveLength(5)

      // 6件目を追加 → 最古の非errorが消去される
      act(() => {
        result.current.showToast("info", "メッセージ6")
      })
      expect(result.current.messages).toHaveLength(5)
      expect(result.current.messages[0]?.message).toBe("メッセージ2")
      expect(result.current.messages[4]?.message).toBe("メッセージ6")
    })

    it("error はカウント対象外で 5 件制限に含まれない", () => {
      const { result } = renderHook(() => useToast())

      act(() => {
        result.current.showToast("error", "エラー1")
        result.current.showToast("error", "エラー2")
        result.current.showToast("info", "メッセージ1")
        result.current.showToast("info", "メッセージ2")
        result.current.showToast("info", "メッセージ3")
        result.current.showToast("info", "メッセージ4")
        result.current.showToast("info", "メッセージ5")
      })

      // error 2件 + info 5件 = 7件 (errorは対象外なので制限に引っかからない)
      expect(result.current.messages).toHaveLength(7)
      expect(result.current.messages.filter((m) => m.type === "error")).toHaveLength(2)
      expect(result.current.messages.filter((m) => m.type !== "error")).toHaveLength(5)
    })
  })

  describe("アンマウント", () => {
    it("アンマウント時にタイマーがクリアされる", () => {
      const { result, unmount } = renderHook(() => useToast())

      act(() => {
        result.current.showToast("info", "テスト")
      })

      unmount()

      // タイマーを進めてもエラーが発生しないことを確認
      act(() => {
        vi.advanceTimersByTime(10000)
      })
    })
  })
})
