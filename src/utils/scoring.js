// All times stored as Chile local (UTC-4)
import { MATCHES } from '../data/matches'

const MATCH_ID_BY_NAME = Object.fromEntries(
  MATCHES.filter(m => m.group).map(m => [`${m.home}-${m.away}`, m.id])
)

export function calcScore(participant, results, settings) {
  let exactos = 0, signos = 0, pts = 0
  const matchBreakdown = {}

  // Support new format (groupMatches keyed by name) and old format (partidos keyed by id)
  const groupPreds = {}
  for (const [key, pred] of Object.entries(participant.groupMatches || participant.partidos || {})) {
    const id = MATCH_ID_BY_NAME[key] ?? Number(key)
    if (id) groupPreds[id] = pred
  }

  for (const [idStr, pred] of Object.entries(groupPreds)) {
    const id = Number(idStr)
    const res = results[id]
    if (!res) { matchBreakdown[id] = { pred, result: null, pts: 0, tipo: null }; continue }

    const [ph, pa] = pred.split('-').map(Number)
    const rh = res.home_score, ra = res.away_score

    let mpst = 0, tipo = 'fallo'
    if (ph === rh && pa === ra) { mpst = 3; tipo = 'exacto'; exactos++ }
    else if (sgn(ph - pa) === sgn(rh - ra)) { mpst = 1; tipo = 'signo'; signos++ }

    pts += mpst
    matchBreakdown[id] = { pred, result: `${rh}-${ra}`, pts: mpst, tipo }
  }

  // partField: field name in predictions.js (new format)
  // predKey:   key used in knockBreakdown (consumed by ParticipantModal)
  const knockRounds = [
    { predKey: '16avos',    partField: 'round32',  settingsKey: 'r32',         ppTeam: 1 },
    { predKey: 'octavos',   partField: 'round16',  settingsKey: 'r16',         ppTeam: 2 },
    { predKey: 'cuartos',   partField: 'quarters', settingsKey: 'qf',          ppTeam: 4 },
    { predKey: 'semifinal', partField: 'semis',    settingsKey: 'sf',          ppTeam: 6 },
    { predKey: 'final',     partField: 'final',    settingsKey: 'final_teams', ppTeam: 8 },
  ]

  const knockBreakdown = {}
  for (const { predKey, partField, settingsKey, ppTeam } of knockRounds) {
    const actual = settings[settingsKey] || []
    // New format uses finalist1/finalist2 for the final; other rounds use arrays
    let predicted
    if (predKey === 'final' && (participant.finalist1 || participant.finalist2)) {
      predicted = [participant.finalist1, participant.finalist2].filter(Boolean)
    } else {
      predicted = participant[partField] || participant[predKey] || []
    }
    const correct = predicted.filter(t => actual.includes(t))
    const roundPts = correct.length * ppTeam
    pts += roundPts
    knockBreakdown[predKey] = { predicted, correct, pts: roundPts, ppTeam }
  }

  // predField: new format field name, with old format name as fallback
  const specials = [
    { label: 'Campeón',     predField: 'champion',   fallback: 'campeon',  settKey: 'campeon',   bonus: 11 },
    { label: '3er lugar',   predField: 'thirdPlace', fallback: 'tercero',  settKey: 'tercero',   bonus: 5  },
    { label: 'Bota de Oro', predField: 'goldenBoot', fallback: 'botaOro',  settKey: 'bota_oro',  bonus: 5  },
    { label: 'Balón de Oro',predField: 'goldenBall', fallback: 'balonOro', settKey: 'balon_oro', bonus: 5  },
  ]

  const specialBreakdown = {}
  for (const { label, predField, fallback, settKey, bonus } of specials) {
    const pred = participant[predField] ?? participant[fallback]
    const actual = settings[settKey]
    const correct = !!(actual && pred === actual)
    const spPts = correct ? bonus : 0
    pts += spPts
    specialBreakdown[label] = { pred, actual, correct, pts: spPts }
  }

  return { exactos, signos, pts, matchBreakdown, knockBreakdown, specialBreakdown }
}

function sgn(n) { return n > 0 ? 1 : n < 0 ? -1 : 0 }

export function todayChile() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Santiago' })
}
