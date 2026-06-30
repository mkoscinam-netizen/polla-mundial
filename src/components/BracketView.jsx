import { MATCHES } from '../data/matches'

const R32_TEAMS = {
  73: ['Sudáfrica', 'Canadá'],
  74: ['Alemania', 'Paraguay'],
  75: ['Países Bajos', 'Marruecos'],
  76: ['Brasil', 'Japón'],
  77: ['Francia', 'Suecia'],
  78: ['Costa de Marfil', 'Noruega'],
  79: ['México', 'Ecuador'],
  80: ['Inglaterra', 'R.D. Congo'],
  81: ['EE.UU.', 'Bosnia y Herz.'],
  82: ['Bélgica', 'Senegal'],
  83: ['Portugal', 'Croacia'],
  84: ['España', 'Austria'],
  85: ['Suiza', 'Argelia'],
  86: ['Argentina', 'Cabo Verde'],
  87: ['Colombia', 'Ghana'],
  88: ['Australia', 'Egipto'],
}

const MATCH_BY_ID = Object.fromEntries(MATCHES.map(m => [m.id, m]))
const CARD_W = 110
const COL_GAP = 6

function getScore(results, id) {
  const r = results[id]
  if (!r) return null
  return { h: r.home_score, a: r.away_score }
}

function getTeamName(results, id) {
  if (id <= 88) return R32_TEAMS[id] || ['TBD', 'TBD']
  const parentMap = {
    89: [74, 77], 90: [73, 75], 91: [83, 84], 92: [81, 82],
    93: [76, 78], 94: [79, 80], 95: [86, 88], 96: [85, 87],
    97: [89, 90], 98: [93, 94], 99: [91, 92], 100: [95, 96],
    101: [97, 98], 102: [99, 100],
    103: [101, 102], 104: [101, 102],
  }
  const parents = parentMap[id]
  if (!parents) return ['TBD', 'TBD']
  const getWinner = (pid) => {
    const r = results[pid]; if (!r) return null
    const [ph, pa] = getTeamName(results, pid)
    return r.home_score > r.away_score ? ph : r.away_score > r.home_score ? pa : null
  }
  const getLoser = (pid) => {
    const r = results[pid]; if (!r) return null
    const [ph, pa] = getTeamName(results, pid)
    return r.home_score > r.away_score ? pa : r.away_score > r.home_score ? ph : null
  }
  if (id === 103) return [getLoser(parents[0]) || 'TBD', getLoser(parents[1]) || 'TBD']
  return [getWinner(parents[0]) || 'TBD', getWinner(parents[1]) || 'TBD']
}

function MatchCard({ id, results, width = CARD_W }) {
  const match = MATCH_BY_ID[id]
  const score = getScore(results, id)
  const [home, away] = getTeamName(results, id)
  const played = score !== null
  const hWin = played && score.h > score.a
  const aWin = played && score.a > score.h
  const dateStr = match?.date ? new Date(match.date + 'T12:00:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'short' }) : ''
  return (
    <div style={{ width, background: played ? '#16213e' : '#0f172a', border: `1px solid ${played ? '#3b82f655' : '#1e293b'}`, borderRadius: 4, overflow: 'hidden', flexShrink: 0 }}>
      <div style={{ padding: '2px 4px', background: '#080f1e', display: 'flex', justifyContent: 'space-between', fontSize: 7.5, color: '#475569', borderBottom: '1px solid #1e293b' }}>
        <span style={{ color: '#334155' }}>M{id}</span>
        <span>{dateStr}</span>
      </div>
      {[{ team: home, score: score?.h, win: hWin, lose: played && aWin },
        { team: away, score: score?.a, win: aWin, lose: played && hWin }].map(({ team, score: sc, win, lose }, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '3px 4px', background: win ? '#1e3a5f' : 'transparent', borderTop: i === 1 ? '1px solid #1e293b' : 'none' }}>
          <span style={{ fontSize: 8.5, color: win ? '#93c5fd' : lose ? '#334155' : '#94a3b8', fontWeight: win ? 700 : 400, maxWidth: width - 22, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{team}</span>
          <span style={{ fontSize: 9, fontWeight: 700, color: win ? '#60a5fa' : lose ? '#1e293b' : '#475569', minWidth: 12, textAlign: 'right' }}>{played ? sc : ''}</span>
        </div>
      ))}
    </div>
  )
}

function BCol({ label, pairs, results, itemGap = 6, pairGap = 18 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ color: '#64748b', fontSize: 7.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, textAlign: 'center' }}>{label}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: pairGap }}>
        {pairs.map((pair, pi) => (
          <div key={pi} style={{ display: 'flex', flexDirection: 'column', gap: itemGap }}>
            {pair.map(id => <MatchCard key={id} id={id} results={results} />)}
          </div>
        ))}
      </div>
    </div>
  )
}

function Arrow({ flip = false }) {
  return <div style={{ color: '#1e3a5f', fontSize: 12, transform: flip ? 'scaleX(-1)' : 'none', userSelect: 'none', flexShrink: 0 }}>›</div>
}

export default function BracketView({ results, settings }) {
  if (!results) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#3b82f6' }}>Cargando...</div>

  return (
    <div style={{ background: '#060d1a', minHeight: '100vh', padding: '16px 8px 32px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <div style={{ color: '#fbbf24', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', marginBottom: 3 }}>⚽ COPA MUNDIAL FIFA 2026</div>
        <h2 style={{ margin: 0, color: '#f1f5f9', fontSize: 15, fontWeight: 800, letterSpacing: '0.05em' }}>FASE FINAL — BRACKET</h2>
        <div style={{ color: '#334155', fontSize: 9, marginTop: 3 }}>Final: 19 julio · MetLife Stadium</div>
      </div>

      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: COL_GAP, justifyContent: 'center', minWidth: 'max-content', margin: '0 auto' }}>
          <BCol label="16avos" pairs={[[74, 77], [73, 75], [83, 84], [81, 82]]} results={results} itemGap={6} pairGap={18} />
          <Arrow />
          <BCol label="Octavos" pairs={[[89, 90], [91, 92]]} results={results} itemGap={6} pairGap={54} />
          <Arrow />
          <BCol label="Cuartos" pairs={[[97], [99]]} results={results} itemGap={6} pairGap={110} />
          <Arrow />
          <BCol label="Semis" pairs={[[101]]} results={results} />
          <Arrow />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div>
              <div style={{ textAlign: 'center', color: '#fbbf24', fontSize: 8, fontWeight: 800, letterSpacing: '0.15em', marginBottom: 4 }}>🏆 FINAL</div>
              <MatchCard id={104} results={results} width={CARD_W + 16} />
            </div>
            <div>
              <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 8, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 4 }}>🥉 3ER LUGAR</div>
              <MatchCard id={103} results={results} width={CARD_W + 16} />
            </div>
          </div>
          <Arrow flip />
          <BCol label="Semis" pairs={[[102]]} results={results} />
          <Arrow flip />
          <BCol label="Cuartos" pairs={[[98], [100]]} results={results} itemGap={6} pairGap={110} />
          <Arrow flip />
          <BCol label="Octavos" pairs={[[93, 94], [95, 96]]} results={results} itemGap={6} pairGap={54} />
          <Arrow flip />
          <BCol label="16avos" pairs={[[76, 78], [79, 80], [86, 88], [85, 87]]} results={results} itemGap={6} pairGap={18} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16, fontSize: 9, color: '#334155' }}>
        {[{ bg: '#1e3a5f', border: '#3b82f655', label: 'Ganador' }, { bg: '#16213e', border: '#3b82f655', label: 'Con resultado' }, { bg: '#0f172a', border: '#1e293b', label: 'Pendiente' }].map(({ bg, border, label }) => (
          <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 8, height: 8, background: bg, border: `1px solid ${border}`, borderRadius: 2, display: 'inline-block' }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
