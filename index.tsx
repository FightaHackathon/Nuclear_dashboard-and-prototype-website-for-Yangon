import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Suppress unhandled promise rejections from external extensions/APIs (e.g., 403s)
window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
  try {
    const reason: any = event?.reason;
    const code = reason?.code ?? reason?.data?.code;
    if (code === 403 || reason?.message === 'permission error') {
      event.preventDefault();
      console.warn('Suppressed unhandled promise rejection (403/permission):', reason);
    }
  } catch {
    // no-op
  }
});

// Suppress synchronous permission errors thrown by injected scripts
window.onerror = function(message, source, lineno, colno, error) {
  try {
    const msg = String(message || '').toLowerCase();
    if (msg.includes('permission error')) {
      return true; // mark as handled
    }
  } catch {}
  return false;
};

const root = ReactDOM.createRoot(rootElement);
root.render(
  // StrictMode double-invokes effects in dev which can cause Leaflet to init twice
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);