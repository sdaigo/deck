import { useCallback, useEffect, useRef, useState } from "react"
import type { ToastMessage, ToastType, UseToastReturn } from "@/types/todo"

const AUTO_DISMISS_MS: Record<ToastType, number | null> = {
  error: null,
  warning: 10_000,
  info: 5_000,
}

const MAX_NON_ERROR_MESSAGES = 5

export function useToast(): UseToastReturn {
  const [messages, setMessages] = useState<ReadonlyArray<ToastMessage>>([])
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  useEffect(() => {
    const timers = timersRef.current
    return () => {
      for (const timer of timers.values()) {
        clearTimeout(timer)
      }
      timers.clear()
    }
  }, [])

  const dismissToast = useCallback((id: string): void => {
    const timer = timersRef.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timersRef.current.delete(id)
    }
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }, [])

  const showToast = useCallback(
    (type: ToastType, message: string): void => {
      const id = crypto.randomUUID()
      const newMessage: ToastMessage = { id, type, message }

      setMessages((prev) => {
        const next = [...prev, newMessage]

        if (type !== "error") {
          const nonErrorMessages = next.filter((m) => m.type !== "error")
          if (nonErrorMessages.length > MAX_NON_ERROR_MESSAGES) {
            const oldest = nonErrorMessages[0]
            if (oldest) {
              const oldTimer = timersRef.current.get(oldest.id)
              if (oldTimer) {
                clearTimeout(oldTimer)
                timersRef.current.delete(oldest.id)
              }
              return next.filter((m) => m.id !== oldest.id)
            }
          }
        }

        return next
      })

      const delay = AUTO_DISMISS_MS[type]
      if (delay !== null) {
        const timer = setTimeout(() => {
          dismissToast(id)
        }, delay)
        timersRef.current.set(id, timer)
      }
    },
    [dismissToast],
  )

  return { messages, showToast, dismissToast }
}
