import type { ReactNode } from "react"
import { Component } from "react"
import { ErrorFallback } from "@/components/error-fallback"
import { Toast } from "@/components/toast"
import { useToast } from "@/hooks"

type ErrorBoundaryProps = {
  readonly children: ReactNode
}

type ErrorBoundaryState = {
  readonly hasError: boolean
  readonly error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      return <ErrorFallback error={this.state.error} onReset={this.handleReset} />
    }
    return this.props.children
  }
}

export function App(): React.ReactElement {
  const { messages, dismissToast } = useToast()

  return (
    <ErrorBoundary>
      <div className="mx-auto max-w-lg px-4 py-8">
        <header className="mb-6">
          <h1 className="text-xl font-medium text-gray-900">SimpleTodo</h1>
        </header>
        <main>{/* Todo list will be rendered here */}</main>
      </div>
      <Toast messages={messages} onDismiss={dismissToast} />
    </ErrorBoundary>
  )
}
