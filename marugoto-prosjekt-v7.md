# Japansk Læringsapp – Prosjektdokument v7
Magnus | MottoMotto / Marugoto A1–A2 | Mai 2026

---

## 1. Prosjektoversikt
Magnus tar japanskkurs hos MottoMotto i Oslo (lærer: Urara). Pensum er Marugoto A1–A2.
Mål: PWA (Progressive Web App) som fungerer på Android-telefon, offline-kapabel.

---

## 2. Status per v7

### ✅ Ferdig
- **gloser.json** — 1377 unike ord, embedded direkte i appen (ingen fetch)
- **Lessonmapping** — alle ord har lesson-felt
- **GitHub** — repo `marugoto-app` oppe hos bruker `Mmmmmagnus`
  - URL: `https://github.com/Mmmmmagnus/marugoto-app`
  - Raw: `https://raw.githubusercontent.com/Mmmmmagnus/marugoto-app/main/gloser.json`
  - NB: Artifact-miljøet blokkerer ekstern fetch (CORS) → data er embedded i JSX
- **3 aktivitetstyper** — Flervalg, Skriv selv, Flashkort
- **Tellemåter-quiz (助数詞)** — 7 kategorier, 70 former, teal-tema
- **Fontvelger** — 5 kana-fonter, lagres via window.storage
- **Streak-teller** — lagres via window.storage
- **Fremgangssporing** per leksjon — lagres via window.storage
- **kurs.json** — A1.1 komplett (T1–T6), A1.2–A2.3 er tomme skjelett
- **marugoto.json** — skjelett for Starter A1 (Topic 1–6) og Starter A2 (Topic 7–9)
- **marugoto_ref** — presise leksjonsdelnummer per timepar (f.eks. "L4-2", "L5-1")

### 🔜 Neste steg (høy prioritet)
1. **Last opp kurs.json, marugoto.json og gloser.json til GitHub**
2. **Fyll inn A1.2, A2.1, A2.2, A2.3** — last opp mailer fra Urara fortløpende
3. **Implementer grammatikkøvelser** — 5 typer (se seksjon 3)
4. **Implementer lydfilstøtte** — MP3 fra Marugoto, GitHub-hosting

### ❌ Gjenstår (lavere prioritet)
1. **Ny navigasjonsstruktur** — to parallelle innganger (Motto Motto + Marugoto)
2. **Lytteøvelse** — venter på MP3-opplasting til GitHub
3. **Marugoto-oppgaver** — venter på materiale fra boka
4. **PWA-bygging** — Service Worker + installasjon på hjemskjerm
5. **Kanji-database** — bygges etter at Motto Motto + Marugoto-data er ferdig
6. **Felter marugoto_topic og motto_timepar** — legges til gloser.json

---

## 3. Apparkitektur

### Planlagt navigasjonsstruktur (to parallelle innganger)
```
Navigasjon
├── Motto Motto (kursrekkefølge)
│   ├── A1
│   │   ├── A1.1 (Time 1–2 t.o.m. Time 11–12) ✅ data ferdig
│   │   ├── A1.2 (Time 1–2 t.o.m. Time 11–12) ⏳ mangler
│   │   └── [Hele A1 samlet]
│   └── A2
│       ├── A2.1, A2.2, A2.3 ⏳ mangler
│       └── [Hele A2 samlet]
│
└── Marugoto (bokstruktur)
    ├── Starter A1
    │   ├── Topic 1 にほんご (L1–2)
    │   ├── Topic 2 わたし (L3–4)
    │   ├── Topic 3 たべもの (L5–6)
    │   ├── Topic 4 いえ (L7–8)
    │   ├── Topic 5 せいかつ (L9–10)
    │   ├── Topic 6 やすみのひ (L11–12)
    │   └── [Hele Starter A1 samlet]
    └── Starter A2
        ├── Topic 7 まち (L13–14)
        ├── Topic 8 かいもの (L15–16)
        ├── Topic 9 ？ (L17–18) — japansk navn ukjent
        └── [Hele Starter A2 samlet]
```

### Aktivitetstyper (implementert)
| ID | Navn | Beskrivelse |
|---|---|---|
| multiple | Flervalg | Kana → 4 norske alternativer |
| write | Skriv selv | Norsk → skriv kana eller romaji |
| flash | Flashkort | Kana vises, trykk for å avsløre |
| counter | Tellemåter | Tall + objekt → skriv tellemåte |

### Aktivitetstyper (planlagt)
| ID | Navn | Beskrivelse |
|---|---|---|
| sentence | Setningsbygging | Trykk ord i riktig rekkefølge, med distraktorer |
| particle | Partikkelvalg | Hull i setning, velg riktig partikkel fra alternativliste |
| error | Feil-eller-riktig | Finn feilen i setningen, erstatt med riktig alternativ |
| context | Kontekstsvar | Svar på japansk spørsmål, velg grammatisk riktig svar |
| matching | Matching/par | Koble setningshalvdeler |
| listen | Lytteøvelse | Spill MP3, gjett ordet |
| marugoto | Marugoto-oppgaver | Spørsmål fra boka med lydfil + svaralternativer |

**NB grammatikkoppgaver:** Alle tekster i kana/romaji — ingen kanji før kanji-database er bygget.

---

## 4. Datafiler

### gloser.json
- 1377 ord, felter: `english`, `romaji`, `kana`, `deck`, `level`, `lesson`
- Felter planlagt: `marugoto_topic` (int), `motto_timepar` (string, f.eks. `"A1.1-T1"`)
- 54 ord med `lesson: "ukjent"` (Te-form-regler, TE/DIC-SANG, Jungelting, Spørreord)

### kurs.json
- Struktur: `nivåer → moduler → timepar`
- Felt per timepar: `id`, `label`, `timer`, `dato`, `marugoto_ref`, `grammatikk`, `vokabular_sider`, `lenker`, `notater`
- **marugoto_ref** = presise delnummer (f.eks. `["L4-2", "L5-1"]`) — referanse, ikke garanti for fullstendig dekning. Urara kan også hente fra andre systemer.

#### A1.1 — komplett
| ID | Dato | marugoto_ref |
|---|---|---|
| A1.1-T1 | ukjent | L1-1, L1-2, L2-1, L2-2 |
| A1.1-T2 | 17. jan | L3-1, L3-2, L4-1 |
| A1.1-T3 | ukjent | L4-2, L5-1 |
| A1.1-T4 | 7. feb | L5-2, L5-3, L6-2, L7-1 |
| A1.1-T5 | 14. feb | L9-1, L9-2 |
| A1.1-T6 | 20. feb | L10-1, L10-3 |

#### A1.2, A2.1, A2.2, A2.3 — tomme skjelett, fylles inn når mailer mottas

### marugoto.json
- Starter A1: Topic 1–6, Leksjon 1–12
- Starter A2: Topic 7–9, Leksjon 13–18
- Topic 9 (L17–18) mangler japansk navn

### Lydfiler (ikke implementert)
- Lokalt: `Internal storage/Download/Mar/` — 19 mapper (Lesson01–Lesson18 + LessonReview)
- Antatt filnavnmønster: `MarugotoElementary1Lesson01_01.mp3`
- Planlagt GitHub-hosting: `https://raw.githubusercontent.com/Mmmmmagnus/marugoto-app/main/audio/`
- **Neste steg:** Last opp lydfiler til GitHub, bekreft filnavnmønster, implementer lytteøvelse

### Tellemåter-kategorier (embedded)
| Kategori | Suffix |
|---|---|
| Alder | さい |
| Bøker | さつ |
| Flate ting | まい |
| Lange ting | ほん |
| Personer | にん |
| Små ting 1 | つ |
| Små ting 2 | こ |

---

## 5. Kanji-plan
Magnus lærer kanji via WaniKani men er ute av trening. Grammatikkoppgaver bruker kana/romaji som standard. Etter at Motto Motto og Marugoto-data er ferdig: bygge kanji-database slik at kanji kan aktiveres gradvis i oppgavetekster.

---

## 6. Teknisk stack
- **Frontend:** React JSX (Claude artifact)
- **Data:** Embedded JSON
- **Lagring:** `window.storage` (progress, streak, fontvalg)
- **Fonter:** Google Fonts — Noto Serif JP, Noto Sans JP, M PLUS Rounded 1c, Yomogi, Shippori Mincho
- **Offline:** Ikke implementert (krever PWA med Service Worker)

---

## 7. Design
- Mørkt tema, japansk estetikk
- Gull (`#d4a843`) — glosequiz
- Teal (`#2dd4bf`) — tellemåter
- Blå (`#6b9fd4`) — skriv selv
- Lilla (`#a879d4`) — flashkort
- Grønn (`#4ade80`) — grammatikkøvelser (forslag)
- Mobiloptimalisert, maks 480px bredde

---

## 8. GitHub
- Repo: `https://github.com/Mmmmmagnus/marugoto-app`
- Innhold nå: `README.md`, `gloser.json`
- Skal legges til: `kurs.json`, `marugoto.json`, `audio/`-mappe, evt. PWA-filer

---

## 9. Kjente datakvalitetsproblemer
- `level`-feltet er tomt for mange ord
- Norsk/engelsk-kolonnen er blandet — bør standardiseres til norsk
- 54 ord har `lesson: "ukjent"`
- `marugoto_topic` og `motto_timepar` mangler på alle ord

---

## 10. Åpne spørsmål
- Hva heter Topic 9 i Starter A2 (L17–18)?
- Filnavnmønster for lydfiler — bekreft ved opplasting til GitHub

---

*v7 generert av Claude Sonnet 4.6 | Mai 2026*
