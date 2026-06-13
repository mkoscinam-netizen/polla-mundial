import { MATCHES, GROUPS, ROUND_LABELS } from '../data/matches'

const ROUND_ORDER = ['R32','R16','QF','SF','3P','F']
const ROUND_KEYS  = { R32:'r32', R16:'r16', QF:'qf', SF:'sf', F:'final_teams' }

function fmtDate(d) {
  return new Date(d + 'T12:00:00').toLocaleDateString('es-CL', { weekday: 'short', day: 'numeric', month: 'short' })
}

function isLive(match) {
  if (!match.date || !match.time) return false
  const now = new Date()
  const start = new Date(`${match.date}T${match.time}:00-04:00`)
  const end = new Date(start.getTime() + 120 * 60 * 1000)
  return now >= start && now <= end
}

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-bold bg-red-600 text-white animate-pulse ml-2">
      <span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
      LIVE
    </span>
  )
}

function MatchRow({ match, result }) {
  const res = result ? `${result.home_score}–${result.away_score}` : null
  const isHome = result && result.home_score > result.away_score
  const isAway = result && result.away_score > result.home_score
  const live = isLive(match)
  return (
    <div className={`flex items-center gap-2 py-2 px-3 border-b border-slate-800 hover:bg-slate-800/50 transition-colors ${live ? 'bg-red-950/20' : ''}`}>
      <div className="w-24 text-xs text-slate-400 shrink-0">
        <div>{fmtDate(match.date)}</div>
        <div className="flex items-center gap-1">
          <span className="text-yellow-400 font-medium">{match.time}</span>
          {live && <LiveBadge />}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-between gap-2 min-w-0">
        <span className={`text-sm font-medium truncate text-right flex-1 ${isHome ? 'text-white' : isAway ? 'text-slate-400' : ''}`}>
          {match.home}
        </span>
        <div className="shrink-0 w-16 text-center">
          {res ? (
            <span className="text-green-400 font-bold text-sm">{res}</span>
          ) : live ? (
            <span className="text-red-400 font-bold text-sm animate-pulse">EN VIVO</span>
          ) : (
            <span className="text-slate-600 text-xs">vs</span>
          )}
        </div>
        <span className={`text-sm font-medium truncate flex-1 ${isAway ? 'text-white' : isHome ? 'text-slate-400' : ''}`}>
          {match.away}
        </span>
      </div>
    </div>
  )
}

export default function FixtureView({ results, settings }) {
  const groupMatches = MATCHES.filter(m => m.group)
  const byGroup = {}
  for (const g of Object.keys(GROUPS)) {
    byGroup[g] = groupMatches.filter(m => m.group === g)
  }

  const knockoutMatches = MATCHES.filter(m => m.round)
  const byRound = {}
  for (const r of ROUND_ORDER) {
    byRound[r] = knockoutMatches.filter(m => m.round === r)
  }

  return (
    <div className="overflow-y-auto">
      {/* ── Fase de Grupos ── */}
      <div className="px-4 pt-4 pb-1">
        <h2 className="text-yellow-400 font-bold text-sm tracking-widest uppercase">Fase de Grupos</h2>
      </div>

      {Object.entries(byGroup).map(([g, ms]) => (
        <div key={g} className="mb-4">
          <div className="px-3 py-1.5 bg-slate-800 flex items-center justify-between sticky top-0 z-10">
            <span className="text-sm font-bold text-white">Grupo {g}</span>
            <span className="text-xs text-slate-400">{GROUPS[g].teams.join(' · ')}</span>
          </div>
          {ms.map(m => <MatchRow key={m.id} match={m} result={results[m.id]} />)}
        </div>
      ))}

      {/* ── Fase Eliminatoria ── */}
      <div className="px-4 pt-2 pb-1">
        <h2 className="text-yellow-400 font-bold text-sm tracking-widest uppercase">Fase Eliminatoria</h2>
      </div>

      {ROUND_ORDER.map(r => {
        const ms = byRound[r]
        if (!ms || ms.length === 0) return null

        const settingsKey = ROUND_KEYS[r]
        const advTeams = settingsKey ? (settings[settingsKey] || []) : []
        const hasTeams = advTeams.length > 0

        if ((r === 'R32' || r === 'R16' || r === 'QF' || r === 'SF') && !hasTeams && !ms.some(m => results[m.id])) {
          return (
            <div key={r} className="mb-4">
              <div className="px-3 py-1.5 bg-slate-800">
                <span className="text-sm font-bold text-white">{ROUND_LABELS[r]}</span>
              </div>
              <div className="px-4 py-3 text-xs text-slate-500 italic">Por determinar — pendiente resultados de grupos</div>
            </div>
          )
        }

        return (
          <div key={r} className="mb-4">
            <div className="px-3 py-1.5 bg-slate-800">
              <span className="text-sm font-bold text-white">{ROUND_LABELS[r]}</span>
              {r === 'F' && settings.campeon && (
                <span className="ml-2 text-xs text-yellow-400 font-medium">🏆 {settings.campeon}</span>
              )}
            </div>
            {hasTeams && r !== 'F' && r !== '3P' && (
              <div className="px-3 py-2 flex flex-wrap gap-1.5">
                {advTeams.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded bg-slate-700 text-xs text-slate-200">{t}</span>
                ))}
              </div>
            )}
            {ms.map(m => <MatchRow key={m.id} match={m} result={results[m.id]} />)}
          </div>
        )
      })}
      <div className="h-8" />
    </div>
  )
}
