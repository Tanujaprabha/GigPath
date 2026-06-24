import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          fontFamily: 'system-ui, sans-serif',
          background: '#FFF5F5',
          color: '#C53030',
          border: '1px solid #FEB2B2',
          borderRadius: '8px',
          margin: '2rem'
        }}>
          <h2>Something went wrong.</h2>
          <p>Analytics data contains invalid values.</p>
          {this.state.error && (
            <pre style={{
              background: '#FFF',
              padding: '1rem',
              borderRadius: '4px',
              border: '1px solid #FEE2E2',
              overflow: 'auto',
              maxHeight: '300px'
            }}>
              {this.state.error.stack || this.state.error.toString()}
            </pre>
          )}
        </div>
      )
    }

    return this.props.children
  }
}
