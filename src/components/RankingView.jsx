import { useState, useMemo } from 'react'
import { calcScore } from '../utils/scoring'
import ParticipantModal from './ParticipantModal'

export default function RankingView({ participants, results, settings }) {
  const [selected, setSelected] = useState(null)

  const ranked = useMemo(() => {
    return participants
      .map(p => ({ p, score: calcScore(p, results, settings) }))
      .sort((a, b) => b.score.pts - a.score.pts)
      .map((x, i) => ({ ...x, pos: i + 1 }))
  }, [participants, results, settings])

  return (
    <div className="overflow-y-auto">
      {/* Table */}
      <table className="w-full border-collapse">
        <thead className="sticky top-0 z-10 bg-slate-800">
          <tr>
            <th className="px-3 py-2 text-left text-xs text-slate-400 w-8">#</th>
            <th className="px-3 py-2 text-left text-xs text-slate-400">Nombre</th>
            <th className="px-3 py-2 text-center text-xs text-slate-400 w-16">Exactos</th>
            <th className="px-3 py-2 text-center text-xs text-slate-400 w-16">Signos</th>
            <th className="px-3 py-2 text-center text-xs text-slate-400 w-16">16avos ✓</th>
            <th className="px-3 py-2 text-center text-xs text-slate-400 w-16">Octavos ✓</th>
            <th className="px-3 py-2 text-center text-xs text-slate-400 w-16">4tos ✓</th>
            <th className="px-3 py-2 text-center text-xs text-yellow-400 font-bold w-16">Pts</th>
          </tr>
        </thead>
        <tbody>
          {ranked.map(({ p, score, pos }) => (
            <tr
              key={p.nombre}
              onClick={() => setSelected({ p, score })}
              className="border-b border-slate-800 hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <td className="px-3 py-3">
                <PosIcon pos={pos} />
              </td>
              <td className="px-3 py-3 text-sm font-medium text-white">{p.nombre}</td>
              <td className="px-3 py-3 text-center">
                <span className="text-green-400 text-sm font-semibold">{score.exactos}</span>
              </td>
              <td className="px-3 py-3 text-center">
                <span className="text-yellow-400 text-sm font-semibold">{score.signos}</span>
              </td>
              <td className="px-3 py-3 text-center">
                <span className="text-blue-400 text-sm font-semibold">{score.knockBreakdown?.['16avos']?.correct?.length ?? 0}</span>
              </td>
              <td className="px-3 py-3 text-center">
                <span className="text-blue-400 text-sm font-semibold">{score.knockBreakdown?.['octavos']?.correct?.length ?? 0}</span>
              </td>
              <td className="px-3 py-3 text-center">
                <span className="text-blue-400 text-sm font-semibold">{score.knockBreakdown?.['cuartos']?.correct?.length ?? 0}</span>
              </td>
              <td className="px-3 py-3 text-center">
                <span className="text-white text-base font-bold">{score.pts}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-3 text-xs text-slate-500 text-center">
        Toca un participante para ver el detalle
      </div>

      {selected && (
        <ParticipantModal
          participant={selected.p}
          score={selected.score}
          results={results}
          settings={settings}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}

function PosIcon({ pos }) {
  if (pos === 1) return <span className="text-yellow-400 font-bold">🥇</span>
  if (pos === 2) return <span className="text-slate-300 font-bold">🥈</span>
  if (pos === 3) return <span className="text-amber-600 font-bold">🥉</span>
  return <span className="text-slate-500 text-sm">{pos}</span>
}
