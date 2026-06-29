# gaiacrochet.com — sito vetrina (v1)

Sito **statico** (HTML/CSS/JS), senza backend, pensato per Cloudflare Pages.
Vetrina di prodotti fatti a mano: il cliente vede i prodotti e contatta via email o Instagram. Nessun pagamento online.

---

## Cosa c'è dentro

```
index.html          Home minimale (logo, frase, ingresso al catalogo)
catalogo.html       Catalogo con ricerca, filtri (categoria + disponibilità) e schede prodotto
chi-siamo.html      Pagina "Chi siamo"
spedizioni.html     "Spedizioni e pagamenti"
privacy.html        Informativa privacy
404.html            Pagina non trovata
data/products.json  UNICA fonte dei prodotti (modificabile a mano o dal CMS)
assets/css/         Stile (un solo file)
assets/js/          i18n.js (lingue), app.js (comune), catalog.js (catalogo)
assets/fonts/       Font self-hosted (sito cookieless, niente chiamate esterne)
assets/img/         Immagini (ora segnaposto SVG)
admin/              Pannello CMS (Sveltia) + config.yml
_headers            Header di sicurezza per Cloudflare Pages
tools/              Strumento OPZIONALE per ottimizzare le foto
```

Lingue: **italiano + inglese**, scelta automatica dal browser al primo accesso, poi cambiabile dal pulsante in alto a destra.

Accessibilità (pannello in basso a destra): **font ad alta leggibilità (OpenDyslexic)**, **testo e immagini grandi**, **riduzione animazioni**. In più: navigazione completa da tastiera, focus sempre visibile, testi alternativi sulle foto, rispetto delle preferenze di sistema sulle animazioni.

---

## Provarlo sul tuo computer

Serve un piccolo server locale (i file `fetch` del JSON non funzionano aprendo l'HTML col doppio clic):

```
cd gaiacrochet
python3 -m http.server 8000
```

Poi apri `http://localhost:8000`.

---

## Pubblicare su Cloudflare Pages

1. Crea un repository su GitHub (es. `gaiacrochet`) e caricaci tutto il contenuto di questa cartella.
2. Su Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**, scegli il repo.
3. Build: **nessun comando di build**. Output directory: `/` (la cartella radice). Salva e pubblica.
4. **Custom domain**: nella pagina del progetto Pages → **Custom domains** → aggiungi `gaiacrochet.com` (il DNS è già su Cloudflare, viene collegato in automatico).

Ogni volta che salvi una modifica su GitHub (anche dal CMS), il sito si ribuilda da solo.

---

## Statistiche di visita (gratis, senza cookie)

Nella dashboard Cloudflare del progetto Pages → **Web Analytics** → attiva.
Si inietta da solo, non usa cookie e non raccoglie dati personali: per questo **non serve il banner cookie**.

---

## Collegare il pannello CMS (Sveltia)

Il pannello sta su `tuo-dominio/admin/`. Login con GitHub. Per farlo funzionare servono due cose una tantum.

**A. App OAuth su GitHub**
- GitHub → Settings → Developer settings → **OAuth Apps → New OAuth App**.
- Homepage URL: `https://gaiacrochet.com`
- Authorization callback URL: l'URL del Worker del punto B + `/callback`.
- Segnati **Client ID** e **Client Secret**.

**B. Worker OAuth su Cloudflare**
- Usa il Worker pronto `sveltia-cms-auth` (cerca "sveltia-cms-auth" su GitHub, c'è la guida del progetto).
- In fase di deploy imposta le variabili `GITHUB_CLIENT_ID` e `GITHUB_CLIENT_SECRET` (dal punto A).
- Ottieni un URL tipo `https://qualcosa.workers.dev`.

**C. Compila `admin/config.yml`**
- `repo:` → `tuo-utente/gaiacrochet`
- `base_url:` → l'URL del Worker del punto B

Fatto questo, tu e Gaia entrate su `gaiacrochet.com/admin/`, fate login con GitHub e gestite i prodotti senza toccare codice.

---

## Aggiungere o modificare un prodotto

Dal CMS (consigliato) o modificando a mano `data/products.json`. Ogni prodotto ha:

| Campo | Significato |
|---|---|
| `id` | identificativo univoco, senza spazi (es. `amigurumi-volpe`) |
| `category` | `uncinetto`, `cucito` o `altro` |
| `subcategory` | solo per "altro": `dadi-resina` o `videogiochi` |
| `handmade` | `true` mostra l'avviso "piccole variazioni rispetto alla foto" |
| `price` | numero (es. `28` oppure `12.5`) |
| `availability` | `available`, `order` (su ordinazione) o `hidden` (nascosto) |
| `images` | elenco di percorsi immagine (2-3 consigliate) |
| `name_it` / `name_en` | nome bilingue |
| `desc_it` / `desc_en` | descrizione bilingue |
| `material_it` / `material_en` | materiale (facoltativo) |
| `time_it` / `time_en` | tempi di realizzazione (facoltativo, utile per "su ordinazione") |

Regole disponibilità:
- handmade esaurito ma rifabbricabile → `order`
- pezzo unico finito (es. un videogioco venduto) → `hidden` (sparisce dal catalogo)

---

## Foto

Carica foto già web-friendly (lato lungo ~1600px, JPG compresso). Tutte le immagini hanno già `loading="lazy"`.

Ottimizzazione **opzionale** (crea versioni `.webp` più leggere), da lanciare a mano quando vuoi:

```
npm install
npm run optimize
```

> Nota onesta: l'ottimizzazione automatica lato CDN (Polish/WebP) su Cloudflare richiede un piano a pagamento. Sul piano gratuito conviene caricare foto già ridimensionate, oppure usare lo strumento qui sopra prima di pubblicare.

---

## Email (stato attuale)

`info@gaiacrochet.com` **riceve** già (Cloudflare Email Routing → Gmail). I pulsanti "Scrivici" aprono un'email precompilata verso questo indirizzo.
L'invio "come" info@ (Zoho) è un passo successivo, non necessario per far funzionare il sito.

---

## Cosa è volutamente fuori dalla v1

- Niente carrello/pagamenti: la trattativa è via email.
- Niente form di contatto (solo `mailto:` + Instagram). Candidato per la v2.
- Minigioco sconti: da costruire in v2.

---

## Note tecniche

- Sito cookieless: font self-hosted, nessuna risorsa esterna sulle pagine pubbliche.
- Le preferenze di lingua e accessibilità sono salvate solo nel browser dell'utente (non sono dati critici).
- Header di sicurezza e Content-Security-Policy in `_headers`.
