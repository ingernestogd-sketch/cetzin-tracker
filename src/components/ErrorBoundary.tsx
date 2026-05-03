import { Component, ErrorInfo, ReactNode } from 'react';

type State = { error: Error | null };

export default class ErrorBoundary extends Component<
  { children: ReactNode },
  State
> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Cetzin Tracker] Error capturado:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100vh',
            background: '#FFF0F5',
            padding: 20,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#4B1528',
          }}
        >
          <div
            style={{
              maxWidth: 480,
              margin: '40px auto',
              background: '#fff',
              border: '1.5px solid #ED93B1',
              borderRadius: 16,
              padding: 20,
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: 1.5,
                color: '#D4537E',
                fontWeight: 500,
              }}
            >
              ★ ALGO FALLO ★
            </div>
            <h2 style={{ fontSize: 17, fontWeight: 500, marginTop: 6 }}>
              La app no pudo iniciar
            </h2>
            <p style={{ fontSize: 13, lineHeight: 1.5, color: '#72243E' }}>
              Revisa la consola del navegador (boton derecho → Inspeccionar →
              Console) para ver el detalle. Lo mas comun: faltan variables de
              entorno en Vercel.
            </p>
            <pre
              style={{
                fontSize: 11,
                background: '#FBEAF0',
                padding: 10,
                borderRadius: 10,
                overflowX: 'auto',
                color: '#4B1528',
              }}
            >
              {this.state.error.message}
            </pre>
            <button
              onClick={() => location.reload()}
              style={{
                marginTop: 12,
                width: '100%',
                padding: '10px 14px',
                borderRadius: 12,
                background: '#D4537E',
                color: '#fff',
                border: 'none',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Reintentar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
