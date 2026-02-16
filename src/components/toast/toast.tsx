import type { ToastMessage, ToastProps, ToastType } from "@/types/todo"

const STYLE_MAP: Record<ToastType, { container: string; progress: string }> = {
  error: {
    container: "bg-red-50 border-red-400 text-red-800",
    progress: "",
  },
  warning: {
    container: "bg-yellow-50 border-yellow-400 text-yellow-800",
    progress: "bg-yellow-400",
  },
  info: {
    container: "bg-blue-50 border-blue-400 text-blue-800",
    progress: "bg-blue-400",
  },
}

const AUTO_DISMISS_DURATION: Record<ToastType, number | null> = {
  error: null,
  warning: 10_000,
  info: 5_000,
}

function ToastItem({
  message,
  onDismiss,
}: {
  readonly message: ToastMessage
  readonly onDismiss: (id: string) => void
}): React.ReactElement {
  const style = STYLE_MAP[message.type]
  const ariaLive = message.type === "error" ? "assertive" : "polite"
  const duration = AUTO_DISMISS_DURATION[message.type]

  return (
    <div aria-live={ariaLive} className="pointer-events-auto">
      <div
        role="alert"
        className={`flex items-start gap-2 rounded border-l-4 p-3 shadow-md ${style.container}`}
      >
        <p className="flex-1 text-sm">{message.message}</p>
        <button
          type="button"
          onClick={() => onDismiss(message.id)}
          className="shrink-0 text-current opacity-60 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-label="閉じる"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      {duration !== null && (
        <div
          data-testid="progress-bar"
          className={`h-0.5 ${style.progress}`}
          style={{
            width: "100%",
            animation: `toast-progress ${duration}ms linear forwards`,
          }}
        />
      )}
    </div>
  )
}

export function Toast({ messages, onDismiss }: ToastProps): React.ReactElement {
  return (
    <div className="pointer-events-none fixed top-4 right-4 z-50 flex w-80 flex-col gap-2">
      {messages.map((message) => (
        <ToastItem key={message.id} message={message} onDismiss={onDismiss} />
      ))}
    </div>
  )
}
