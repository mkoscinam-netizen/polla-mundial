import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { MATCHES, GROUPS, ROUND_LABELS } from '../data/matches'

const ADMIN_PASS = 'andina2026'

const ALL_TEAMS = Object.values(GROUPS).flatMap(g => g.teams)

const KNOCKOUT_ROUNDS = [
  { key: 'r32',         label: '16avos — 32 clasificados desde grupos', count: 32 },
  { key: 'r16',         label: 'Octavos — 16 clasificados desde 16avos', count: 16 },
  { key: 'qf',          label: 'Cuartos — 8 clasificados desde octavos', count: 8 },
  { key: 'sf',          label: 'Semis — 4 clasificados desde cuartos', count: 4 },
  { key: 'final_teams', label: 'Final — 2 finalistas', count: 2 },
]

const SPECIALS = [
  { settKey: 'campeon',   label: 'Campeón', placeholder: 'ej. Argentina' },
  { settKey: 'tercero',   label: '3er Lugar', placeholder: 'ej. Brasil' },
  { settKey: 'bota_oro',  label: 'Bota de Oro', placeholder: 'ej. L. Messi' },
  { settKey: 'balon_oro', label: 'Balón de Oro', placeholder: 'ej. K. Mbappé' },
]

export default function AdminView({ results, settings }) {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwErr, setPwErr] = useState(false)
  const [adminTab, setAdminTab] = useState('partidos')

  function handleLogin(e) {
    e.preventDefault()
    if (pw === ADMIN_PASS) { setAuthed(true); setPwErr(false) }
    else { setPwErr(true) }
  }

  if (!authed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
        <div className="w-full max-w-sm bg-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-white font-bold text-xl text-center">Acceso Admin</h2>
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="Contraseña"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-500"
              autoFocus
            />
            {pwErr && <p className="text-red-400 text-sm">Contraseña incorrecta</p>}
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2.5 rounded-lg transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Admin sub-tabs */}
      <div className="flex bg-slate-800 border-b border-slate-700">
        {[
          { key: 'partidos', label: 'Partidos' },
          { key: 'clasif',   label: 'Clasificados' },
          { key: 'especial', label: 'Especiales' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setAdminTab(key)}
            className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${
              adminTab === key ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {adminTab === 'partidos' && (
          <MatchResultsPanel results={results} />
        )}
        {adminTab === 'clasif' && (
          <ClasifPanel settings={settings} />
        )}
        {adminTab === 'especial' && (
          <SpecialsPanel settings={settings} />
        )}
      </div>
    </div>
  )
}

// ── Match results panel ───────────────────────────────────────
function MatchResultsPanel({ results }) {
  const groupMatches = MATCHES.filter(m => m.group)
  const knockoutMatches = MATCHES.filter(m => m.round)

  return (
    <div className="space-y-6">
      <Section title="Fase de Grupos">
        {Object.keys(GROUPS).map(g => (
          <GroupSection key={g} group={g} matches={groupMatches.filter(m => m.group === g)} results={results} />
        ))}
      </Section>
      <Section title="Eliminatorias">
        {knockoutMatches.map(m => (
          <MatchInput key={m.id} match={m} existingResult={results[m.id]} />
        ))}
      </Section>
    </div>
  )
}

function GroupSection({ group, matches, results }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mb-2">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-between text-sm font-medium text-white transition-colors"
      >
        <span>Grupo {group} · {GROUPS[group].teams.join(', ')}</span>
        <span className="text-slate-400">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="mt-1 space-y-1">
          {matches.map(m => <MatchInput key={m.id} match={m} existingResult={results[m.id]} />)}
        </div>
      )}
    </div>
  )
}

function MatchInput({ match, existingResult }) {
  const [home, setHome] = useState(existingResult ? String(existingResult.home_score) : '')
  const [away, setAway] = useState(existingResult ? String(existingResult.away_score) : '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    const h = parseInt(home), a = parseInt(away)
    if (isNaN(h) || isNaN(a)) return
    setSaving(true)
    const { error } = await supabase
      .from('match_results')
      .upsert({ match_id: match.id, home_score: h, away_score: a }, { onConflict: 'match_id' })
    setSaving(false)
    if (!error) { setSaved(true); setTimeout(() => setSaved(false), 2000) }
  }

  async function handleDelete() {
    await supabase.from('match_results').delete().eq('match_id', match.id)
    setHome(''); setAway('')
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 rounded-lg text-sm">
      <span className="text-slate-500 w-5 text-xs">{match.id}</span>
      <span className="flex-1 truncate text-slate-200 text-xs">{match.home} vs {match.away}</span>
      <span className="text-slate-500 text-xs">{match.date}</span>
      <input
        type="number" min="0" max="20"
        value={home}
        onChange={e => setHome(e.target.value)}
        className="w-12 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-center text-white text-sm focus:outline-none focus:border-yellow-500"
        placeholder="L"
      />
      <span className="text-slate-500">–</span>
      <input
        type="number" min="0" max="20"
        value={away}
        onChange={e => setAway(e.target.value)}
        className="w-12 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-center text-white text-sm focus:outline-none focus:border-yellow-500"
        placeholder="V"
      />
      <button
        onClick={handleSave}
        disabled={saving || home === '' || away === ''}
        className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
          saved ? 'bg-green-600 text-white' : 'bg-yellow-500 hover:bg-yellow-400 text-black disabled:opacity-40'
        }`}
      >
        {saving ? '…' : saved ? '✓' : 'OK'}
      </button>
      {existingResult && (
        <button
          onClick={handleDelete}
          className="px-2 py-1 rounded text-xs text-red-400 hover:text-red-300 transition-colors"
        >✕</button>
      )}
    </div>
  )
}

// ── Clasificados panel ────────────────────────────────────────
function ClasifPanel({ settings }) {
  return (
    <div className="space-y-6">
      {KNOCKOUT_ROUNDS.map(r => (
        <RoundTeamsPicker key={r.key} roundKey={r.key} label={r.label} count={r.count} current={settings[r.key] || []} />
      ))}
    </div>
  )
}

function RoundTeamsPicker({ roundKey, label, count, current }) {
  const [selected, setSelected] = useState(new Set(current))
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  function toggle(team) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(team)) next.delete(team)
      else next.add(team)
      return next
    })
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    const { error } = await supabase
      .from('settings')
      .upsert({ key: roundKey, value: Array.from(selected) }, { onConflict: 'key' })
    setSaving(false)
    if (!error) { setSaved(true); setTimeout(() => setSaved(false), 2000) }
  }

  return (
    <div className="bg-slate-800 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-white font-semibold text-sm">{label}</div>
          <div className="text-xs text-slate-400">{selected.size}/{count} seleccionados</div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
            saved ? 'bg-green-600 text-white' : 'bg-yellow-500 hover:bg-yellow-400 text-black disabled:opacity-40'
          }`}
        >
          {saving ? 'Guardando…' : saved ? '✓ Guardado' : 'Guardar'}
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {ALL_TEAMS.map(team => (
          <button
            key={team}
            onClick={() => toggle(team)}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              selected.has(team)
                ? 'bg-yellow-500 text-black'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {team}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Specials panel ────────────────────────────────────────────
function SpecialsPanel({ settings }) {
  return (
    <div className="space-y-4">
      {SPECIALS.map(s => (
        <SpecialInput key={s.settKey} settKey={s.settKey} label={s.label} placeholder={s.placeholder} current={settings[s.settKey] || ''} />
      ))}
    </div>
  )
}

function SpecialInput({ settKey, label, placeholder, current }) {
  const [value, setValue] = useState(current)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    if (!value.trim()) return
    setSaving(true)
    const { error } = await supabase
      .from('settings')
      .upsert({ key: settKey, value: value.trim() }, { onConflict: 'key' })
    setSaving(false)
    if (!error) { setSaved(true); setTimeout(() => setSaved(false), 2000) }
  }

  return (
    <div className="bg-slate-800 rounded-xl p-4 space-y-2">
      <label className="text-white font-semibold text-sm">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={e => { setValue(e.target.value); setSaved(false) }}
          placeholder={placeholder}
          className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-yellow-500"
        />
        <button
          onClick={handleSave}
          disabled={saving || !value.trim()}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
            saved ? 'bg-green-600 text-white' : 'bg-yellow-500 hover:bg-yellow-400 text-black disabled:opacity-40'
          }`}
        >
          {saving ? '…' : saved ? '✓' : 'OK'}
        </button>
      </div>
      {current && <div className="text-xs text-slate-400">Actual: <span className="text-green-400">{current}</span></div>}
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-3">{title}</h3>
      {children}
    </div>
  )
}
