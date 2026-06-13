import { MATCH_BY_ID } from '../data/matches'

const ROUND_LABELS = {
  '16avos':   '16avos de Final (clasifican desde grupos)',
  'octavos':  'Octavos de Final',
  'cuartos':  'Cuartos de Final',
  'semifinal':'Semifinales',
  'final':    'Final',
}
const ROUND_PTS = { '16avos':3, octavos:4, cuartos:5, semifinal:7, final:9 }

const TIPO_STYLE = {
  exacto: 'bg-green-900/50 text-green-300',
  signo:  'bg-yellow-900/50 text-yellow-300',
  fallo:  'bg-red-900/30 text-red-400',
}
const TIPO_LABEL = { exacto:'✓ Exacto +3', signo:'~ Signo +1', fallo:'✗ Falló +0' }

export default function ParticipantModal({ participant: p, score, onClose }) {
  const matchIds = Object.keys(score.matchBreakdown).map(Number).sort((a,b) => a-b)

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex flex-col overflow-hidden"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="flex-1 overflow-y-auto bg-slate-900 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-lg">{p.nombre}</h2>
            <div className="text-yellow-400 text-sm font-semibold">{score.pts} puntos totales</div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl leading-none px-2"
          >✕</button>
        </div>

        <div className="px-4 py-4 space-y-6">
          {/* ── Resumen ── */}
          <div className="grid grid-cols-3 gap-3">
            <StatBox label="Exactos" value={score.exactos} color="text-green-400" />
            <StatBox label="Signos" value={score.signos} color="text-yellow-400" />
            <StatBox label="Total" value={score.pts} color="text-white" big />
          </div>

          {/* ── Partidos Fase Grupos ── */}
          <Section title="Fase de Grupos — Partido a Partido">
            <div className="space-y-1">
              {matchIds.filter(id => id <= 72).map(id => {
                const m = MATCH_BY_ID[id]
                const bd = score.matchBreakdown[id]
                if (!m) return null
                return (
                  <div key={id} className={`flex items-center gap-2 px-3 py-2 rounded text-xs ${bd.tipo ? TIPO_STYLE[bd.tipo] : 'bg-slate-800 text-slate-400'}`}>
                    <span className="text-slate-400 w-5 shrink-0">{id}</span>
                    <span className="flex-1 truncate">{m.home} vs {m.away}</span>
                    <span className="font-bold shrink-0">{bd.pred}</span>
                    {bd.result && (
                      <>
                        <span className="text-slate-500 shrink-0">→</span>
                        <span className="font-bold shrink-0">{bd.result}</span>
                        <span className="shrink-0">{TIPO_LABEL[bd.tipo]}</span>
                      </>
                    )}
                    {!bd.result && <span className="text-slate-600 shrink-0">sin resultado</span>}
                  </div>
                )
              })}
            </div>
          </Section>

          {/* ── Picks Eliminatorias ── */}
          <Section title="Picks por Ronda Eliminatoria">
            {Object.entries(score.knockBreakdown).map(([round, { predicted, correct, pts: rPts }]) => (
              <div key={round} className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-200">{ROUND_LABELS[round]}</span>
                  <span className="text-xs text-yellow-400 font-bold">
                    {rPts} pts ({correct.length}/{predicted.length} correctos × {ROUND_PTS[round]}pts)
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {predicted.map(t => (
                    <span
                      key={t}
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        correct.includes(t)
                          ? 'bg-green-700 text-green-100'
                          : 'bg-slate-700 text-slate-400 line-through'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                  {predicted.length === 0 && <span className="text-slate-500 text-xs">Sin predicción</span>}
                </div>
              </div>
            ))}
          </Section>

          {/* ── Bonus ── */}
          <Section title="Bonus Especiales">
            <div className="space-y-2">
              {Object.entries(score.specialBreakdown).map(([label, { pred, actual, correct, pts: sPts }]) => (
                <div key={label} className={`flex items-center justify-between px-3 py-2 rounded text-sm ${correct ? 'bg-green-900/50 text-green-200' : 'bg-slate-800 text-slate-300'}`}>
                  <span className="font-medium">{label}</span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-400">Tu pick: <strong className="text-white">{pred || '—'}</strong></span>
                    {actual && <span className="text-slate-400">Real: <strong className={correct ? 'text-green-300' : 'text-white'}>{actual}</strong></span>}
                    <span className={correct ? 'text-green-400 font-bold' : 'text-slate-500'}>
                      {correct ? `✓ +${sPts}pts` : actual ? '✗ 0pts' : 'pendiente'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-3 border-b border-slate-800 pb-1">
        {title}
      </h3>
      {children}
    </div>
  )
}

function StatBox({ label, value, color, big }) {
  return (
    <div className="bg-slate-800 rounded-lg p-3 text-center">
      <div className={`${big ? 'text-3xl' : 'text-2xl'} font-bold ${color}`}>{value}</div>
      <div className="text-xs text-slate-400 mt-1">{label}</div>
    </div>
  )
}
