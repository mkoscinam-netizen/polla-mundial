// All times in Chile local time (UTC-4 / CLT, June = winter)
// Groups A-L: IDs 1-72 | R32: 73-88 | R16: 89-96 | QF: 97-100 | SF: 101-102 | 3P: 103 | F: 104

export const GROUPS = {
  A: { teams: ['México', 'Sudáfrica', 'Rep. Checa', 'Corea del Sur'] },
  B: { teams: ['Canadá', 'Qatar', 'Suiza', 'Bosnia y Herz.'] },
  C: { teams: ['Brasil', 'Marruecos', 'Haití', 'Escocia'] },
  D: { teams: ['EE.UU.', 'Paraguay', 'Australia', 'Turquía'] },
  E: { teams: ['Alemania', 'Ecuador', 'Costa de Marfil', 'Curazao'] },
  F: { teams: ['Países Bajos', 'Túnez', 'Japón', 'Suecia'] },
  G: { teams: ['Bélgica', 'Nueva Zelanda', 'Irán', 'Egipto'] },
  H: { teams: ['España', 'Uruguay', 'Arabia Saudita', 'Cabo Verde'] },
  I: { teams: ['Francia', 'Noruega', 'Irak', 'Senegal'] },
  J: { teams: ['Argentina', 'Austria', 'Jordania', 'Argelia'] },
  K: { teams: ['Colombia', 'Uzbekistán', 'R.D. Congo', 'Portugal'] },
  L: { teams: ['Inglaterra', 'Croacia', 'Panamá', 'Ghana'] },
}

export const MATCHES = [
  // ── GRUPO A ──────────────────────────────────────────────────────────────
  { id: 1,  group: 'A', home: 'México',          away: 'Sudáfrica',      date: '2026-06-11', time: '15:00', venue: 'Estadio Azteca, México' },
  { id: 2,  group: 'A', home: 'Corea del Sur',   away: 'Rep. Checa',     date: '2026-06-11', time: '22:00', venue: 'Estadio Akron, Guadalajara' },
  { id: 3,  group: 'A', home: 'Rep. Checa',       away: 'Sudáfrica',      date: '2026-06-18', time: '12:00', venue: 'Mercedes-Benz Stadium, Atlanta' },
  { id: 4,  group: 'A', home: 'México',          away: 'Corea del Sur',  date: '2026-06-18', time: '21:00', venue: 'Estadio Akron, Guadalajara' },
  { id: 5,  group: 'A', home: 'Rep. Checa',       away: 'México',         date: '2026-06-24', time: '21:00', venue: 'Estadio Azteca, México' },
  { id: 6,  group: 'A', home: 'Sudáfrica',       away: 'Corea del Sur',  date: '2026-06-24', time: '21:00', venue: 'Estadio BBVA, Guadalupe' },
  // ── GRUPO B ──────────────────────────────────────────────────────────────
  { id: 7,  group: 'B', home: 'Canadá',          away: 'Bosnia y Herz.', date: '2026-06-12', time: '15:00', venue: 'BMO Field, Toronto' },
  { id: 8,  group: 'B', home: 'Qatar',           away: 'Suiza',          date: '2026-06-13', time: '15:00', venue: "Levi's Stadium, Santa Clara" },
  { id: 9,  group: 'B', home: 'Suiza',           away: 'Bosnia y Herz.', date: '2026-06-18', time: '15:00', venue: 'SoFi Stadium, Los Ángeles' },
  { id: 10, group: 'B', home: 'Canadá',          away: 'Qatar',          date: '2026-06-18', time: '18:00', venue: 'BC Place, Vancouver' },
  { id: 11, group: 'B', home: 'Suiza',           away: 'Canadá',         date: '2026-06-24', time: '15:00', venue: 'BC Place, Vancouver' },
  { id: 12, group: 'B', home: 'Bosnia y Herz.',  away: 'Qatar',          date: '2026-06-24', time: '15:00', venue: 'Lumen Field, Seattle' },
  // ── GRUPO C ──────────────────────────────────────────────────────────────
  { id: 13, group: 'C', home: 'Brasil',          away: 'Marruecos',      date: '2026-06-13', time: '18:00', venue: 'MetLife Stadium, Nueva York' },
  { id: 14, group: 'C', home: 'Haití',           away: 'Escocia',        date: '2026-06-13', time: '21:00', venue: 'Gillette Stadium, Boston' },
  { id: 15, group: 'C', home: 'Escocia',         away: 'Marruecos',      date: '2026-06-19', time: '18:00', venue: 'Gillette Stadium, Boston' },
  { id: 16, group: 'C', home: 'Brasil',          away: 'Haití',          date: '2026-06-19', time: '20:30', venue: 'Lincoln Financial Field, Filadelfia' },
  { id: 17, group: 'C', home: 'Escocia',         away: 'Brasil',         date: '2026-06-24', time: '18:00', venue: 'Hard Rock Stadium, Miami' },
  { id: 18, group: 'C', home: 'Marruecos',       away: 'Haití',          date: '2026-06-24', time: '18:00', venue: 'Mercedes-Benz Stadium, Atlanta' },
  // ── GRUPO D ──────────────────────────────────────────────────────────────
  { id: 19, group: 'D', home: 'EE.UU.',          away: 'Paraguay',       date: '2026-06-12', time: '21:00', venue: 'SoFi Stadium, Los Ángeles' },
  { id: 20, group: 'D', home: 'Australia',       away: 'Turquía',        date: '2026-06-14', time: '00:00', venue: 'BC Place, Vancouver' },
  { id: 21, group: 'D', home: 'EE.UU.',          away: 'Australia',      date: '2026-06-19', time: '15:00', venue: 'Lumen Field, Seattle' },
  { id: 22, group: 'D', home: 'Turquía',         away: 'Paraguay',       date: '2026-06-19', time: '23:00', venue: "Levi's Stadium, Santa Clara" },
  { id: 23, group: 'D', home: 'Turquía',         away: 'EE.UU.',         date: '2026-06-25', time: '22:00', venue: 'SoFi Stadium, Los Ángeles' },
  { id: 24, group: 'D', home: 'Paraguay',        away: 'Australia',      date: '2026-06-25', time: '22:00', venue: "Levi's Stadium, Santa Clara" },
  // ── GRUPO E ──────────────────────────────────────────────────────────────
  { id: 25, group: 'E', home: 'Alemania',        away: 'Curazao',        date: '2026-06-14', time: '13:00', venue: 'NRG Stadium, Houston' },
  { id: 26, group: 'E', home: 'Costa de Marfil', away: 'Ecuador',        date: '2026-06-14', time: '19:00', venue: 'Lincoln Financial Field, Filadelfia' },
  { id: 27, group: 'E', home: 'Alemania',        away: 'Costa de Marfil',date: '2026-06-20', time: '16:00', venue: 'BMO Field, Toronto' },
  { id: 28, group: 'E', home: 'Ecuador',         away: 'Curazao',        date: '2026-06-20', time: '20:00', venue: 'Arrowhead Stadium, Kansas City' },
  { id: 29, group: 'E', home: 'Curazao',         away: 'Costa de Marfil',date: '2026-06-25', time: '16:00', venue: 'Lincoln Financial Field, Filadelfia' },
  { id: 30, group: 'E', home: 'Ecuador',         away: 'Alemania',       date: '2026-06-25', time: '16:00', venue: 'MetLife Stadium, Nueva York' },
  // ── GRUPO F ──────────────────────────────────────────────────────────────
  { id: 31, group: 'F', home: 'Países Bajos',    away: 'Japón',          date: '2026-06-14', time: '16:00', venue: 'AT&T Stadium, Dallas' },
  { id: 32, group: 'F', home: 'Suecia',          away: 'Túnez',          date: '2026-06-14', time: '22:00', venue: 'Estadio BBVA, Guadalupe' },
  { id: 33, group: 'F', home: 'Países Bajos',    away: 'Suecia',         date: '2026-06-20', time: '13:00', venue: 'NRG Stadium, Houston' },
  { id: 34, group: 'F', home: 'Túnez',           away: 'Japón',          date: '2026-06-21', time: '00:00', venue: 'Estadio BBVA, Guadalupe' },
  { id: 35, group: 'F', home: 'Japón',           away: 'Suecia',         date: '2026-06-25', time: '19:00', venue: 'AT&T Stadium, Dallas' },
  { id: 36, group: 'F', home: 'Túnez',           away: 'Países Bajos',   date: '2026-06-25', time: '19:00', venue: 'Arrowhead Stadium, Kansas City' },
  // ── GRUPO G ──────────────────────────────────────────────────────────────
  { id: 37, group: 'G', home: 'Irán',            away: 'Nueva Zelanda',  date: '2026-06-15', time: '21:00', venue: 'SoFi Stadium, Los Ángeles' },
  { id: 38, group: 'G', home: 'Bélgica',         away: 'Egipto',         date: '2026-06-15', time: '15:00', venue: 'Lumen Field, Seattle' },
  { id: 39, group: 'G', home: 'Bélgica',         away: 'Irán',           date: '2026-06-21', time: '15:00', venue: 'SoFi Stadium, Los Ángeles' },
  { id: 40, group: 'G', home: 'Nueva Zelanda',   away: 'Egipto',         date: '2026-06-21', time: '21:00', venue: 'BC Place, Vancouver' },
  { id: 41, group: 'G', home: 'Egipto',          away: 'Irán',           date: '2026-06-26', time: '23:00', venue: 'Lumen Field, Seattle' },
  { id: 42, group: 'G', home: 'Nueva Zelanda',   away: 'Bélgica',        date: '2026-06-26', time: '23:00', venue: 'BC Place, Vancouver' },
  // ── GRUPO H ──────────────────────────────────────────────────────────────
  { id: 43, group: 'H', home: 'España',          away: 'Cabo Verde',     date: '2026-06-15', time: '12:00', venue: 'Mercedes-Benz Stadium, Atlanta' },
  { id: 44, group: 'H', home: 'Arabia Saudita',  away: 'Uruguay',        date: '2026-06-15', time: '18:00', venue: 'Hard Rock Stadium, Miami' },
  { id: 45, group: 'H', home: 'España',          away: 'Arabia Saudita', date: '2026-06-21', time: '12:00', venue: 'Mercedes-Benz Stadium, Atlanta' },
  { id: 46, group: 'H', home: 'Uruguay',         away: 'Cabo Verde',     date: '2026-06-21', time: '18:00', venue: 'Hard Rock Stadium, Miami' },
  { id: 47, group: 'H', home: 'Cabo Verde',      away: 'Arabia Saudita', date: '2026-06-26', time: '20:00', venue: 'NRG Stadium, Houston' },
  { id: 48, group: 'H', home: 'Uruguay',         away: 'España',         date: '2026-06-26', time: '20:00', venue: 'Estadio Akron, Guadalajara' },
  // ── GRUPO I ──────────────────────────────────────────────────────────────
  { id: 49, group: 'I', home: 'Francia',         away: 'Senegal',        date: '2026-06-16', time: '15:00', venue: 'MetLife Stadium, Nueva York' },
  { id: 50, group: 'I', home: 'Irak',            away: 'Noruega',        date: '2026-06-16', time: '18:00', venue: 'Gillette Stadium, Boston' },
  { id: 51, group: 'I', home: 'Francia',         away: 'Irak',           date: '2026-06-22', time: '17:00', venue: 'Lincoln Financial Field, Filadelfia' },
  { id: 52, group: 'I', home: 'Noruega',         away: 'Senegal',        date: '2026-06-22', time: '20:00', venue: 'MetLife Stadium, Nueva York' },
  { id: 53, group: 'I', home: 'Noruega',         away: 'Francia',        date: '2026-06-26', time: '15:00', venue: 'Gillette Stadium, Boston' },
  { id: 54, group: 'I', home: 'Senegal',         away: 'Irak',           date: '2026-06-26', time: '15:00', venue: 'BMO Field, Toronto' },
  // ── GRUPO J ──────────────────────────────────────────────────────────────
  { id: 55, group: 'J', home: 'Argentina',       away: 'Argelia',        date: '2026-06-16', time: '21:00', venue: 'Arrowhead Stadium, Kansas City' },
  { id: 56, group: 'J', home: 'Austria',         away: 'Jordania',       date: '2026-06-17', time: '00:00', venue: "Levi's Stadium, Santa Clara" },
  { id: 57, group: 'J', home: 'Argentina',       away: 'Austria',        date: '2026-06-22', time: '13:00', venue: 'AT&T Stadium, Dallas' },
  { id: 58, group: 'J', home: 'Jordania',        away: 'Argelia',        date: '2026-06-22', time: '23:00', venue: "Levi's Stadium, Santa Clara" },
  { id: 59, group: 'J', home: 'Argelia',         away: 'Austria',        date: '2026-06-27', time: '22:00', venue: 'Arrowhead Stadium, Kansas City' },
  { id: 60, group: 'J', home: 'Jordania',        away: 'Argentina',      date: '2026-06-27', time: '22:00', venue: 'AT&T Stadium, Dallas' },
  // ── GRUPO K ──────────────────────────────────────────────────────────────
  { id: 61, group: 'K', home: 'Portugal',        away: 'R.D. Congo',     date: '2026-06-17', time: '13:00', venue: 'NRG Stadium, Houston' },
  { id: 62, group: 'K', home: 'Uzbekistán',      away: 'Colombia',       date: '2026-06-17', time: '22:00', venue: 'Estadio Azteca, México' },
  { id: 63, group: 'K', home: 'Portugal',        away: 'Uzbekistán',     date: '2026-06-23', time: '13:00', venue: 'NRG Stadium, Houston' },
  { id: 64, group: 'K', home: 'Colombia',        away: 'R.D. Congo',     date: '2026-06-23', time: '22:00', venue: 'Estadio Akron, Guadalajara' },
  { id: 65, group: 'K', home: 'Colombia',        away: 'Portugal',       date: '2026-06-27', time: '19:30', venue: 'Hard Rock Stadium, Miami' },
  { id: 66, group: 'K', home: 'R.D. Congo',      away: 'Uzbekistán',     date: '2026-06-27', time: '19:30', venue: 'Mercedes-Benz Stadium, Atlanta' },
  // ── GRUPO L ──────────────────────────────────────────────────────────────
  { id: 67, group: 'L', home: 'Inglaterra',      away: 'Croacia',        date: '2026-06-17', time: '16:00', venue: 'AT&T Stadium, Dallas' },
  { id: 68, group: 'L', home: 'Ghana',           away: 'Panamá',         date: '2026-06-17', time: '19:00', venue: 'BMO Field, Toronto' },
  { id: 69, group: 'L', home: 'Inglaterra',      away: 'Ghana',          date: '2026-06-23', time: '16:00', venue: 'Gillette Stadium, Boston' },
  { id: 70, group: 'L', home: 'Panamá',          away: 'Croacia',        date: '2026-06-23', time: '19:00', venue: 'BMO Field, Toronto' },
  { id: 71, group: 'L', home: 'Panamá',          away: 'Inglaterra',     date: '2026-06-27', time: '17:00', venue: 'MetLife Stadium, Nueva York' },
  { id: 72, group: 'L', home: 'Croacia',         away: 'Ghana',          date: '2026-06-27', time: '17:00', venue: 'Lincoln Financial Field, Filadelfia' },

  // ── 16AVOS DE FINAL (R32) — equipos TBD ─────────────────────────────────
  { id: 73,  round: 'R32', home: 'TBD', away: 'TBD', date: '2026-06-28', time: '14:00' },
  { id: 74,  round: 'R32', home: 'TBD', away: 'TBD', date: '2026-06-28', time: '18:00' },
  { id: 75,  round: 'R32', home: 'TBD', away: 'TBD', date: '2026-06-29', time: '14:00' },
  { id: 76,  round: 'R32', home: 'TBD', away: 'TBD', date: '2026-06-29', time: '18:00' },
  { id: 77,  round: 'R32', home: 'TBD', away: 'TBD', date: '2026-06-30', time: '14:00' },
  { id: 78,  round: 'R32', home: 'TBD', away: 'TBD', date: '2026-06-30', time: '18:00' },
  { id: 79,  round: 'R32', home: 'TBD', away: 'TBD', date: '2026-07-01', time: '14:00' },
  { id: 80,  round: 'R32', home: 'TBD', away: 'TBD', date: '2026-07-01', time: '18:00' },
  { id: 81,  round: 'R32', home: 'TBD', away: 'TBD', date: '2026-07-02', time: '14:00' },
  { id: 82,  round: 'R32', home: 'TBD', away: 'TBD', date: '2026-07-02', time: '18:00' },
  { id: 83,  round: 'R32', home: 'TBD', away: 'TBD', date: '2026-07-03', time: '14:00' },
  { id: 84,  round: 'R32', home: 'TBD', away: 'TBD', date: '2026-07-03', time: '18:00' },
  { id: 85,  round: 'R32', home: 'TBD', away: 'TBD', date: '2026-07-04', time: '14:00' },
  { id: 86,  round: 'R32', home: 'TBD', away: 'TBD', date: '2026-07-04', time: '18:00' },
  { id: 87,  round: 'R32', home: 'TBD', away: 'TBD', date: '2026-07-05', time: '14:00' },
  { id: 88,  round: 'R32', home: 'TBD', away: 'TBD', date: '2026-07-05', time: '18:00' },
  // ── OCTAVOS (R16) ────────────────────────────────────────────────────────
  { id: 89,  round: 'R16', home: 'TBD', away: 'TBD', date: '2026-07-06', time: '14:00' },
  { id: 90,  round: 'R16', home: 'TBD', away: 'TBD', date: '2026-07-06', time: '18:00' },
  { id: 91,  round: 'R16', home: 'TBD', away: 'TBD', date: '2026-07-07', time: '14:00' },
  { id: 92,  round: 'R16', home: 'TBD', away: 'TBD', date: '2026-07-07', time: '18:00' },
  { id: 93,  round: 'R16', home: 'TBD', away: 'TBD', date: '2026-07-08', time: '14:00' },
  { id: 94,  round: 'R16', home: 'TBD', away: 'TBD', date: '2026-07-08', time: '18:00' },
  { id: 95,  round: 'R16', home: 'TBD', away: 'TBD', date: '2026-07-09', time: '14:00' },
  { id: 96,  round: 'R16', home: 'TBD', away: 'TBD', date: '2026-07-09', time: '18:00' },
  // ── CUARTOS ──────────────────────────────────────────────────────────────
  { id: 97,  round: 'QF', home: 'Francia', away: 'Marruecos', date: '2026-07-09', time: '16:00' },
  { id: 98,  round: 'QF', home: 'Noruega', away: 'Inglaterra', date: '2026-07-10', time: '15:00' },
  { id: 99,  round: 'QF', home: 'España', away: 'Bélgica', date: '2026-07-11', time: '17:00' },
  { id: 100, round: 'QF', home: 'Argentina', away: 'Suiza', date: '2026-07-11', time: '21:00' },
  // ── SEMIFINALES ──────────────────────────────────────────────────────────
  { id: 101, round: 'SF', home: 'TBD', away: 'TBD', date: '2026-07-15', time: '15:00' },
  { id: 102, round: 'SF', home: 'TBD', away: 'TBD', date: '2026-07-16', time: '15:00' },
  // ── 3ER LUGAR ────────────────────────────────────────────────────────────
  { id: 103, round: '3P', home: 'TBD', away: 'TBD', date: '2026-07-18', time: '14:00' },
  // ── FINAL ────────────────────────────────────────────────────────────────
  { id: 104, round: 'F',  home: 'TBD', away: 'TBD', date: '2026-07-19', time: '15:00', venue: 'MetLife Stadium, Nueva York' },
]

export const MATCH_BY_ID = Object.fromEntries(MATCHES.map(m => [m.id, m]))

export const ROUND_LABELS = {
  R32: '16avos de Final',
  R16: 'Octavos de Final',
  QF: 'Cuartos de Final',
  SF: 'Semifinales',
  '3P': 'Tercer Lugar',
  F: 'Final',
}
