import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSupabase } from '../hooks/useSupabase'
import predictions from '../data/predictions'
import TodayView from './TodayView'
import FixtureView from './FixtureView'
import RankingView from './RankingView'
import AdminView from './AdminView'
import BracketView from './BracketView'

const TABS = [
  { key: 'hoy',     label: 'HOY' },
  { key: 'fixture', label: 'FIXTURE' },
  { key: 'ranking', label: 'RANKING' },
  { key: 'bracket', label: 'FASE FINAL' },
  { key: 'admin',   label: 'ADMIN' },
]

export default function GroupPage({ grupo }) {
  const [tab, setTab] = useState('hoy')
  const { results, settings, loading } = useSupabase()
  const participants = predictions.filter(p => p.grupo === grupo)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* ── Header ── */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div>
          <div className="text-xs text-yellow-400 font-semibold tracking-widest uppercase">Polla Mundial 2026</div>
          <h1 className="text-xl font-bold text-white leading-tight">Grupo {grupo}</h1>
        </div>
        <nav className="flex gap-1">
          <Link
            to="/andina"
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              grupo === 'Andina' ? 'bg-yellow-500 text-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Andina
          </Link>
          <Link
            to="/ineptos"
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              grupo === 'Ineptos' ? 'bg-yellow-500 text-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Ineptos
          </Link>
        </nav>
      </header>

      {/* ── Tab bar ── */}
      <nav className="flex bg-slate-900 border-b border-slate-800 sticky top-0 z-20">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 py-3 text-sm font-semibold tracking-wide transition-colors ${
              tab === key
                ? 'border-b-2 border-yellow-400 text-yellow-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* ── Content ── */}
      <main className="flex-1 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40 text-slate-400">Cargando…</div>
        ) : (
          <>
            {tab === 'hoy'     && <TodayView     participants={participants} results={results} settings={settings} />}
            {tab === 'fixture' && <FixtureView   results={results} settings={settings} />}
            {tab === 'ranking' && <RankingView   participants={participants} results={results} settings={settings} />}
            {tab === 'bracket' && <BracketView   results={results} settings={settings} />}
            {tab === 'admin'   && <AdminView     results={results} settings={settings} />}
          </>
        )}
      </main>
    </div>
  )
}
