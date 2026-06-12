import { MATCHES } from '../data/matches'
import { todayChile } from '../utils/scoring'

function resultTipo(pred, result) {
  if (!result) return null
  const [ph, pa] = pred.split('-').map(Number)
  const [rh, ra] = [result.home_score, result.away_score]
  if (ph === rh && pa === ra) return 'exacto'
  if (sgn(ph - pa) === sgn(rh - ra)) return 'signo'
  return 'fallo'
}
function sgn(n) { return n > 0 ? 1 : n < 0 ? -1 : 0 }

const TIPO_STYLES = {
  exacto: 'bg-green-700 text-green-100',
  signo:  'bg-yellow-700 text-yellow-100',
  fallo:  'bg-red-900 text-red-300',
}
const TIPO_ICON = { exacto: '✓', signo: '~', fallo: '✗' }

export default function TodayView({ participants, results }) {
  const today = todayChile()
  const todayMatches = MATCHES.filter(m => m.date === today && m.group)

  if (todayMatches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-slate-400 gap-2 p-6">
        <div className="text-4xl">⚽</div>
        <div className="text-lg font-medium">Sin partidos hoy</div>
        <div className="text-sm">{formatDate(today)}</div>
      </div>
    )
  }

  return (
    <div className="p-0">
      <div className="px-4 py-2 text-xs text-slate-400 font-medium border-b border-slate-800">
        {formatDate(today)} — {todayMatches.length} partido{todayMatches.length > 1 ? 's' : ''}
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <table className="border-collapse min-w-max">
          <thead>
            <tr className="bg-slate-800">
              <th className="sticky left-0 z-10 bg-slate-800 text-left px-3 py-2 text-xs text-slate-400 font-semibold min-w-[120px] border-r border-slate-700">
                Participante
              </th>
              {todayMatches.map(m => (
                <th key={m.id} className="px-3 py-2 text-center min-w-[110px] border-r border-slate-700 last:border-r-0">
                  <div className="text-xs font-bold text-white whitespace-nowrap">
                    {m.home} <span className="text-slate-400">vs</span> {m.away}
                  </div>
                  <div className="text-xs text-yellow-400">{m.time} · Gr.{m.group}</div>
                  {results[m.id] && (
                    <div className="text-xs font-bold text-green-400 mt-0.5">
                      {results[m.id].home_score}–{results[m.id].away_score}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {participants.map((p, i) => (
              <tr key={p.nombre} className={i % 2 === 0 ? 'bg-slate-900' : 'bg-slate-950'}>
                <td className={`sticky left-0 z-10 px-3 py-2 text-sm font-medium whitespace-nowrap border-r border-slate-700 ${i % 2 === 0 ? 'bg-slate-900' : 'bg-slate-950'}`}>
                  {p.nombre}
                </td>
                {todayMatches.map(m => {
                  const pred = (p.partidos || {})[String(m.id)]
                  const res = results[m.id]
                  const tipo = pred ? resultTipo(pred, res) : null
                  return (
                    <td key={m.id} className={`px-2 py-2 text-center border-r border-slate-700 last:border-r-0 ${tipo ? TIPO_STYLES[tipo] : ''}`}>
                      {pred ? (
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="text-sm font-bold">{pred}</span>
                          {tipo && (
                            <span className="text-xs">
                              {TIPO_ICON[tipo]} {tipo === 'exacto' ? '3pts' : tipo === 'signo' ? '1pt' : '0pts'}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-600 text-xs">—</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function formatDate(d) {
  return new Date(d + 'T12:00:00').toLocaleDateString('es-CL', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })
}
