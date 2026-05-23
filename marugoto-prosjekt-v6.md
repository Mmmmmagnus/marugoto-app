# Japansk Læringsapp – Prosjektdokument v6
Magnus | MottoMotto / Marugoto A1–A2 | Mai 2026

---

## 1. Prosjektoversikt
Magnus tar japanskkurs hos MottoMotto i Oslo (lærer: Urara). Pensum er Marugoto A1–A2.
Mål: PWA (Progressive Web App) som fungerer på Android-telefon, offline-kapabel.

---

## 2. Status per v6

### ✅ Ferdig
- **gloser.json** — 1366 unike ord, embedded direkte i appen (ingen fetch)
- **Lessonmapping** — alle 1366 ord har lesson-felt
- **GitHub** — repo `marugoto-app` oppe hos bruker `Mmmmmagnus`
  - URL: `https://github.com/Mmmmmagnus/marugoto-app`
  - Raw: `https://raw.githubusercontent.com/Mmmmmagnus/marugoto-app/main/gloser.json`
  - NB: Artifact-miljøet blokkerer ekstern fetch (CORS) → data er embedded i JSX
- **Leksjonsoversikt** — L1-2, L3-4, L5-6, L7-8, L9-10, L11-12
- **3 aktivitetstyper** — Flervalg, Skriv selv, Flashkort
- **Tellemåter-quiz (助数詞)** — 7 kategorier, 70 former, teal-tema
- **Fontvelger** — 5 kana-fonter (明朝, ゴシック, 丸ゴシ, 手書き, 装飾), lagres
- **Streak-teller** — lagres via window.storage
- **Fremgangssporing** per leksjon — lagres via window.storage
- **Bugfikser** — options låses per spørsmål (ingen reshuffling), placeholder norsk/dim
- **kurs.json** — skjelettfil for Motto Motto-kursstruktur (generert, må lastes opp til GitHub)
- **marugoto.json** — skjelettfil for Marugoto-bokstruktur (generert, må lastes opp til GitHub)

### 🔜 Neste steg (høy prioritet)
1. **Last opp kurs.json og marugoto.json til GitHub** og legg dem til i Claude-prosjektet
2. **Fyll inn kursdata** — last opp alle Motto Motto-mailer og lesson memos fortløpende
3. **Ny navigasjonsstruktur** i appen — to parallelle innganger (se seksjon 3)
4. **Utvid gloser.json** med to nye felter per ord: `marugoto_topic` og `motto_timepar`

### ❌ Gjenstår (lavere prioritet)
1. **Lytteøvelse** — venter på bekreftet MP3-filnavnmønster + GitHub-opplasting av lydfiler
2. **Marugoto-oppgaver** — venter på at Magnus laster opp materialet fra boka
3. **PWA-bygging** — Service Worker + installasjon på hjemskjerm
4. **Telling av -TSU** og andre småkategorier kan integreres i tellemåter

---

## 3. Apparkitektur

### Planlagt navigasjonsstruktur (to parallelle innganger)

```
Navigasjon
├── Motto Motto (kursrekkefølge)
│   ├── A1
│   │   ├── A1.1
│   │   │   ├── Time 1–2
│   │   │   ├── Time 3–4
│   │   │   ├── ...
│   │   │   └── [Hele A1.1 samlet]
│   │   ├── A1.2
│   │   └── [Hele A1 samlet]
│   └── A2
│       ├── A2.1, A2.2, A2.3
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
        ├── Topic 9 ？ (L17–18)
        └── [Hele Starter A2 samlet]
```

Begge innganger fører til samme quiz-innhold, filtrert etter valgt kontekst.
Mulighet for å velge enkeltleksjoner, utvalg, eller samlet på alle nivåer.

### Eksisterende skjermflyt (beholdes)
```
Home
├── [NY] Motto Motto-navigasjon
├── [NY] Marugoto-navigasjon
├── Tellemåter (助数詞)
│   └── Velg kategori (alle / én) → Counter-quiz → Resultat
└── Alle gloser – rask øvelse
    └── Velg aktivitet → Quiz → Resultat
```

### Aktivitetstyper (implementert)
| ID | Navn | Beskrivelse |
|---|---|---|
| multiple | Flervalg | Kana → 4 norske alternativer, options låst per spørsmål |
| write | Skriv selv | Norsk → skriv kana eller romaji, Enter for å sjekke |
| flash | Flashkort | Kana vises, trykk for å avsløre, selv-vurder |
| counter | Tellemåter | Tall + eksempel-objekt → skriv kana eller romaji |

### Aktivitetstyper (planlagt)
| ID | Navn | Beskrivelse |
|---|---|---|
| listen | Lytteøvelse | Spill MP3, gjett ordet |
| marugoto | Marugoto-oppgaver | Spørsmål fra boka med lydfil + svaralternativer |

---

## 4. Datafiler

### gloser.json (embedded i JSX)
- 1366 ord, alle med kana, lesson-felt fikset
- Felter nå: `english`, `romaji`, `kana`, `deck`, `level`, `lesson`
- Felter planlagt: `marugoto_topic` (int), `motto_timepar` (string, f.eks. `"A1.1-T1"`)
- Lesson-mapping:
  - Nihonjin → 1-2
  - 3 - Food → 5-6
  - 11/12 → 11-12
  - Daily Life, Time expression, Tall/telling → 9-10
- 54 ord med `lesson: "ukjent"` (Te-form-regler, TE/DIC-SANG, Jungelting, Spørreord)

### kurs.json (ny — skjelett generert, ikke ennå i prosjektet)
Struktur: `nivåer → moduler → timepar`
- 2 nivåer: A1, A2
- 5 moduler: A1.1, A1.2, A2.1, A2.2, A2.3
- 6 timepar per modul = 30 timepar totalt
- Hvert timepar har: `id`, `label`, `timer`, `dato`, `marugoto_leksjoner`, `grammatikk`, `vokabular_sider`, `lenker`, `notater`
- Fylt inn så langt: A1.1-T1 (Time 1–2) og A1.1-T2 (Time 3–4)

### marugoto.json (ny — skjelett generert, ikke ennå i prosjektet)
Struktur: `nivåer → topics → leksjoner`
- Starter A1: Topic 1–6, Leksjon 1–12
- Starter A2: Topic 7–9, Leksjon 13–18
- OBS: Topic 9 (L17–18) mangler japansk navn — avklar med kursmateriell

### Tellemåter-kategorier (COUNTER_CATS, embedded)
| Kategori | Norsk label | Suffix |
|---|---|---|
| age | Alder | さい |
| books | Bøker | さつ |
| flat, thin objects - stamp | Flate ting | まい |
| long objects | Lange ting | ほん |
| people and smart animals | Personer | にん |
| small objects 1 | Små ting 1 | つ |
| small objects 2 | Små ting 2 | こ |

### Lydfiler (ikke implementert ennå)
- Mappe: `Internal storage/Download/Mar/`
- 19 mapper: `MarugotoEl...Lesson01` til `Lesson18` + `LessonReview`
- Antatt filnavnmønster: `MarugotoElementary1Lesson01_01.mp3`
- Planlagt GitHub-hosting: `https://raw.githubusercontent.com/Mmmmmagnus/marugoto-app/main/audio/`

---

## 5. Kursdata — Motto Motto A1.1 (fylt inn så langt)

### Time 1–2 (A1.1-T1)
- Marugoto: L1–2
- Grammatikk: Hajimemashite, Yoroshiku onegaishimasu, Greetings (あいさつ)
- Vokabular (Wordbook s.): 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19
- Tema: Hilsener, klasseromsfraser, folk, jobb, familie, land
- Lydmateriale: irodori L01

### Time 3–4 (A1.1-T2)
- Dato: 17. januar
- Marugoto: L3–4
- Grammatikk: N wa N desu, N mo N desu, N wa N desu ka, Hai/Iie-svar, Hajimemashite (rep.)
- Vokabular (Wordbook s.): 6, 10, 16, 17, 20, 80
- Tema: Folk, familie, tall 1–10
- Lydmateriale: irodori L04, L01
- Video: https://a1.marugotoweb.jp/en/can-do1.php

### Time 5–12 (A1.1-T3 til T6)
- Ikke fylt inn ennå — last opp mailene for å fylle inn

---

## 6. Teknisk stack
- **Frontend:** React JSX (Claude artifact)
- **Data:** Embedded JSON (158KB ord + 3KB tellemåter)
- **Lagring:** `window.storage` (progress, streak, fontvalg)
- **Fonter:** Google Fonts — Noto Serif JP, Noto Sans JP, M PLUS Rounded 1c, Yomogi, Shippori Mincho
- **Offline:** Ikke implementert ennå (krever PWA med Service Worker)

---

## 7. Design
- Mørkt tema, japansk estetikk
- Gull (`#d4a843`) — glosequiz
- Teal (`#2dd4bf`) — tellemåter
- Blå (`#6b9fd4`) — skriv selv
- Lilla (`#a879d4`) — flashkort
- Mobiloptimalisert, maks 480px bredde

---

## 8. GitHub
- Repo: `https://github.com/Mmmmmagnus/marugoto-app`
- Innhold nå: `README.md`, `gloser.json`
- Skal legges til: `kurs.json`, `marugoto.json`, lydfilmappe `audio/`, evt. PWA-filer

---

## 9. Kjente datakvalitetsproblemer
- `level`-feltet er tomt for 456 ord (mangler A1/A2-klassifisering)
- Norsk/engelsk-kolonnen er blandet — bør standardiseres til norsk
- 54 ord har `lesson: "ukjent"` (Te-form-regler, TE/DIC-SANG, Jungelting, Spørreord)
- Noen romaji-felt har varianter med `/` (f.eks. `shichi-nin / nana-nin`) — håndteres i tellemåter-quiz
- `marugoto_topic` og `motto_timepar` mangler på alle ord — skal legges til

---

## 10. Åpne spørsmål
- Hva heter Topic 9 i Starter A2 (L17–18)?
- Starter A1.2 på Marugoto L13, eller er det en annen fordeling?
- Ønsker Magnus at kurs.json og marugoto.json skal ligge i Claude-prosjektet eller bare på GitHub?

---

*v6 generert av Claude Sonnet 4.6 | Mai 2026*
