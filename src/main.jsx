import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const rootElement = document.getElementById('root')

function formatError(error) {
  if (!error) return 'Unknown error'
  if (error instanceof Error) return `${error.name}: ${error.message}`
  return String(error)
}

function renderFatalError(error) {
  if (!rootElement) return

  rootElement.innerHTML = `
    <main style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#f8fafc;color:#0f172a;font-family:Inter,system-ui,sans-serif;">
      <div style="max-width:720px;width:100%;border:1px solid #cbd5e1;border-radius:20px;background:white;padding:24px;box-shadow:0 10px 30px rgba(15,23,42,0.08);">
        <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#475569;">Startup Error</p>
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.1;">The site failed to load.</h1>
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#475569;">
          Copy the message below and send it back here so we can fix the remaining issue quickly.
        </p>
        <pre style="margin:0;overflow:auto;white-space:pre-wrap;word-break:break-word;border-radius:14px;background:#0f172a;color:#e2e8f0;padding:16px;font-size:13px;line-height:1.5;">${formatError(error)}</pre>
      </div>
    </main>
  `
}

window.addEventListener('error', (event) => {
  renderFatalError(event.error ?? event.message)
})

window.addEventListener('unhandledrejection', (event) => {
  renderFatalError(event.reason)
})

async function bootstrap() {
  try {
    const { default: App } = await import('./App.jsx')

    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    )
  } catch (error) {
    renderFatalError(error)
  }
}

bootstrap()
