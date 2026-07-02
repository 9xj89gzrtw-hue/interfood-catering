"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary — catches render errors in child components
 * Prevents WebGL/animation failures from crashing the entire page
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          role="alert"
          style={{
            padding: "2rem",
            textAlign: "center",
            color: "var(--color-text-muted, #666)",
            maxWidth: 480,
            margin: "4rem auto",
          }}
        >
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBottom: "1rem", color: "var(--color-dark, #1A1714)" }}>
            Что-то пошло не так
          </h2>
          <p style={{ marginBottom: "1.5rem", lineHeight: 1.6 }}>
            Произошла ошибка при загрузке содержимого. Пожалуйста, обновите страницу.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: undefined });
              window.location.reload();
            }}
            style={{
              padding: "0.75rem 2rem",
              background: "var(--color-brand, #B8955A)",
              color: "#fff",
              border: "none",
              borderRadius: "100px",
              cursor: "pointer",
              fontSize: "0.95rem",
            }}
          >
            Обновить страницу
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
