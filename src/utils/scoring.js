// All times stored as Chile local (UTC-4)

export function calcScore(participant, results, settings) {
  let exactos = 0, signos = 0, pts = 0
  const matchBreakdown = {}

  for (const [idStr, pred] of Object.entries(participant.partidos || {})) {
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

  const knockRounds = [
    { predKey: '16avos',    settingsKey: 'r32',         ppTeam: 3 },
    { predKey: 'octavos',   settingsKey: 'r16',         ppTeam: 4 },
    { predKey: 'cuartos',   settingsKey: 'qf',          ppTeam: 5 },
    { predKey: 'semifinal', settingsKey: 'sf',          ppTeam: 7 },
    { predKey: 'final',     settingsKey: 'final_teams', ppTeam: 9 },
  ]

  const knockBreakdown = {}
  for (const { predKey, settingsKey, ppTeam } of knockRounds) {
    const actual = settings[settingsKey] || []
    const predicted = participant[predKey] || []
    const correct = predicted.filter(t => actual.includes(t))
    const roundPts = correct.length * ppTeam
    pts += roundPts
    knockBreakdown[predKey] = { predicted, correct, pts: roundPts, ppTeam }
  }

  const specials = [
    { label: 'Campeón',     predField: 'campeon',  settKey: 'campeon',   bonus: 11 },
    { label: '3er lugar',   predField: 'tercero',  settKey: 'tercero',   bonus: 5  },
    { label: 'Bota de Oro', predField: 'botaOro',  settKey: 'bota_oro',  bonus: 5  },
    { label: 'Balón de Oro',predField: 'balonOro', settKey: 'balon_oro', bonus: 5  },
  ]

  const specialBreakdown = {}
  for (const { label, predField, settKey, bonus } of specials) {
    const pred = participant[predField]
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
