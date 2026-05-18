import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Landing from './Landing'
import './index.css'

function Root() {
  // very simple state-based "routing": landing -> app
  const [view, setView] = useState<'landing' | 'app'>('landing')

  if (view === 'app') {
    return (
      <div className="relative">
        {/* tiny floating back-to-landing button */}
        <button
          onClick={() => setView('landing')}
          className="fixed bottom-4 left-4 z-[60] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 text-white text-xs shadow-lg hover:bg-zinc-800 transition border border-white/10"
          title="Zurück zur Landingpage"
        >
          ← Landingpage
        </button>
        <App />
      </div>
    )
  }

  return <Landing onEnterApp={() => setView('app')} />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
