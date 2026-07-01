/* ============================================================
   i18n — stringhe interfaccia IT/EN + gestione lingua.
   Lingua: auto da browser al primo accesso, poi scelta dell'utente
   (memorizzata in localStorage solo come preferenza, non dato critico).
   ============================================================ */

const I18N = {
  it: {
    "meta.tagline": "Fatto a mano, pezzo per pezzo.",
    "nav.catalog": "Catalogo",
    "nav.about": "Chi siamo",
    "nav.shipping": "Spedizioni e pagamenti",
    "nav.privacy": "Privacy",

    "skip": "Vai al contenuto",
    "lang.switch": "Cambia lingua",

    "home.hero.title.a": "Cose fatte",
    "home.hero.title.b": "a mano",
    "home.hero.tag": "Uncinetto, cucito e qualche pezzo in resina. Pochi oggetti per volta, unici, fatti con cura e passione.",
    "home.hero.cta": "Guarda il catalogo",
    "home.hero.about": "Chi siamo",

    "catalog.title": "Catalogo",
    "catalog.intro": "Cerca, filtra e scrivici per il pezzo che ti piace.",
    "catalog.search.label": "Cerca",
    "catalog.search.placeholder": "Cerca un prodotto…",
    "catalog.category.label": "Categoria",
    "catalog.category.all": "Tutte le categorie",
    "catalog.availability.label": "Disponibilità",
    "catalog.availability.all": "Tutte",
    "catalog.count.one": "1 prodotto",
    "catalog.count.many": "{n} prodotti",
    "catalog.empty": "Nessun prodotto con questi filtri. Prova a togliere qualche filtro.",
    "catalog.loaderror": "Non riesco a caricare il catalogo in questo momento. Riprova più tardi.",

    "cat.cucito": "Cucito",
    "cat.uncinetto": "Uncinetto",
    "cat.altro": "Altro",

    "avail.available": "Disponibile",
    "avail.order": "Su ordinazione",

    "product.material": "Materiale",
    "product.time": "Tempi",
    "product.description": "Descrizione",
    "product.handmade": "Pezzo fatto a mano: piccole variazioni rispetto alla foto sono del tutto normali.",
    "product.contact": "Scrivici per questo pezzo",
    "product.close": "Chiudi",
    "product.gallery": "Galleria foto del prodotto",

    "mail.subject": "Interesse per: {name}",
    "mail.body": "Ciao!\n\nMi interessa questo prodotto: {name}.\nPotete darmi maggiori informazioni (disponibilità, spedizione)?\n\nGrazie!",

    "a11y.title": "Accessibilità",
    "a11y.open": "Opzioni di accessibilità",
    "a11y.font": "Font ad alta leggibilità",
    "a11y.large": "Testo e immagini grandi",
    "a11y.motion": "Riduci le animazioni",
    "a11y.theme": "Tema turchese",

    "footer.tagline": "Pezzi unici, fatti a mano.",
    "footer.instagram": "Seguici su Instagram",
    "footer.rights": "Tutti i diritti riservati.",

    "shipping.contact": "Scrivici",
    "404.title": "Pagina non trovata",
    "404.text": "La pagina che cerchi non esiste o è stata spostata.",
    "404.home": "Torna alla home",

    "about.title": "Chi siamo",
    "about.p1": "Siamo solo noi due, e lo facciamo per passione: per avere un posto tutto nostro, una vetrina dove mostrarvi le cose che ci piace creare.",
    "about.p2": "gaiacrochet è proprio questo: uncinetto, ago e qualche pezzo in resina — amigurumi, accessori, piccoli oggetti per la casa. Pochi pezzi per volta, fatti con calma, ognuno diverso dall'altro. Niente produzione in serie.",
    "about.p3": "Il sito è una vetrina: qui vedi i prodotti, poi ci scrivi via email o su Instagram e ci accordiamo. Semplice così — e un po' della nostra passione arriva anche da te.",

    "shipping.title": "Spedizioni e pagamenti",
    "shipping.h_ship": "Spedizioni",
    "shipping.p_ship": "Spediamo in tutta Italia. Costi e tempi dipendono dall'oggetto e dalla destinazione: te li indichiamo via email prima di confermare l'ordine. Se sei in zona, è possibile anche il ritiro a mano senza spese di spedizione.",
    "shipping.h_abroad": "Estero",
    "shipping.p_abroad": "Spedizioni all'estero su richiesta: scrivici e verifichiamo insieme costi e fattibilità.",
    "shipping.h_pay": "Pagamenti",
    "shipping.p_pay": "L'acquisto si conclude via email. Concordiamo insieme il metodo di pagamento al momento dell'ordine.",
    "shipping.h_made": "Pezzi su ordinazione",
    "shipping.p_made": "Alcuni pezzi sono fatti su ordinazione: in quel caso trovi i tempi di realizzazione indicati nella scheda del prodotto.",

    "privacy.title": "Informativa privacy",
    "privacy.intro": "Questa pagina spiega come trattiamo i tuoi dati personali quando ci contatti.",
    "privacy.h_what": "Quali dati raccogliamo",
    "privacy.p_what": "Raccogliamo solo i dati che ci fornisci scrivendoci: nome, indirizzo email e, se procedi con un acquisto, l'indirizzo di spedizione. Non raccogliamo dati attraverso il sito: non usiamo cookie di profilazione.",
    "privacy.h_why": "Perché li usiamo",
    "privacy.p_why": "Usiamo i tuoi dati solo per risponderti, gestire l'ordine ed effettuare la spedizione.",
    "privacy.h_how": "Come li conserviamo",
    "privacy.p_how": "Conserviamo le email per il tempo necessario a gestire la richiesta e gli eventuali obblighi successivi alla vendita. Non condividiamo i tuoi dati con terzi per fini commerciali.",
    "privacy.h_rights": "I tuoi diritti",
    "privacy.p_rights": "Puoi chiederci in qualsiasi momento di accedere ai tuoi dati, correggerli o cancellarli scrivendo a info@gaiacrochet.com.",
    "privacy.h_analytics": "Statistiche di visita",
    "privacy.p_analytics": "Per sapere quante persone visitano il sito usiamo uno strumento di statistiche che non utilizza cookie e non raccoglie dati personali."
  },

  en: {
    "meta.tagline": "Handmade, one piece at a time.",
    "nav.catalog": "Catalogue",
    "nav.about": "About us",
    "nav.shipping": "Shipping & payment",
    "nav.privacy": "Privacy",

    "skip": "Skip to content",
    "lang.switch": "Change language",

    "home.hero.title.a": "Things made",
    "home.hero.title.b": "by hand",
    "home.hero.tag": "Crochet, sewing and a few resin pieces. A handful at a time, each one unique, made with care and passion.",
    "home.hero.cta": "See the catalogue",
    "home.hero.about": "About us",

    "catalog.title": "Catalogue",
    "catalog.intro": "Search, filter and write to us about the piece you like.",
    "catalog.search.label": "Search",
    "catalog.search.placeholder": "Search a product…",
    "catalog.category.label": "Category",
    "catalog.category.all": "All categories",
    "catalog.availability.label": "Availability",
    "catalog.availability.all": "All",
    "catalog.count.one": "1 product",
    "catalog.count.many": "{n} products",
    "catalog.empty": "No products with these filters. Try removing one.",
    "catalog.loaderror": "We can't load the catalogue right now. Please try again later.",

    "cat.cucito": "Sewing",
    "cat.uncinetto": "Crochet",
    "cat.altro": "Other",

    "avail.available": "Available",
    "avail.order": "Made to order",

    "product.material": "Material",
    "product.time": "Lead time",
    "product.description": "Description",
    "product.handmade": "Handmade piece: small differences from the photo are completely normal.",
    "product.contact": "Write to us about this piece",
    "product.close": "Close",
    "product.gallery": "Product photo gallery",

    "mail.subject": "Interested in: {name}",
    "mail.body": "Hi!\n\nI'm interested in this product: {name}.\nCould you give me more details (availability, shipping)?\n\nThank you!",

    "a11y.title": "Accessibility",
    "a11y.open": "Accessibility options",
    "a11y.font": "High-readability font",
    "a11y.large": "Large text and images",
    "a11y.motion": "Reduce animations",
    "a11y.theme": "Teal theme",

    "footer.tagline": "Unique, handmade pieces.",
    "footer.instagram": "Follow us on Instagram",
    "footer.rights": "All rights reserved.",

    "shipping.contact": "Write to us",
    "404.title": "Page not found",
    "404.text": "The page you're looking for doesn't exist or has moved.",
    "404.home": "Back to home",

    "about.title": "About us",
    "about.p1": "It's just the two of us, and we do this out of passion: to have a place of our own, a showcase where we can show you the things we love making.",
    "about.p2": "That's exactly what gaiacrochet is: crochet, needlework and a few resin pieces — amigurumi, accessories, small things for the home. A few pieces at a time, made calmly, each one different. No mass production.",
    "about.p3": "The site is a showcase: here you see the products, then you write to us by email or on Instagram and we sort it out. Simple as that — and a little of our passion reaches you too.",

    "shipping.title": "Shipping & payment",
    "shipping.h_ship": "Shipping",
    "shipping.p_ship": "We ship throughout Italy. Cost and time depend on the item and destination: we tell you by email before confirming the order. If you're nearby, hand delivery with no shipping cost is also possible.",
    "shipping.h_abroad": "Abroad",
    "shipping.p_abroad": "International shipping on request: write to us and we'll check cost and feasibility together.",
    "shipping.h_pay": "Payment",
    "shipping.p_pay": "The purchase is completed by email. We agree on the payment method together when you order.",
    "shipping.h_made": "Made-to-order pieces",
    "shipping.p_made": "Some pieces are made to order: in that case you'll find the lead time shown on the product card.",

    "privacy.title": "Privacy notice",
    "privacy.intro": "This page explains how we handle your personal data when you contact us.",
    "privacy.h_what": "What data we collect",
    "privacy.p_what": "We only collect the data you give us when writing: name, email address and, if you go ahead with a purchase, the shipping address. We don't collect data through the site: we use no profiling cookies.",
    "privacy.h_why": "Why we use it",
    "privacy.p_why": "We use your data only to reply to you, manage the order and ship it.",
    "privacy.h_how": "How we store it",
    "privacy.p_how": "We keep emails for as long as needed to handle the request and any post-sale obligations. We don't share your data with third parties for commercial purposes.",
    "privacy.h_rights": "Your rights",
    "privacy.p_rights": "You can ask us at any time to access, correct or delete your data by writing to info@gaiacrochet.com.",
    "privacy.h_analytics": "Visit statistics",
    "privacy.p_analytics": "To know how many people visit the site we use a statistics tool that uses no cookies and collects no personal data."
  }
};

const SUPPORTED = ["it", "en"];
const LANG_KEY = "gc_lang";

function detectLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
  } catch (e) { /* localStorage non disponibile: si prosegue */ }
  const nav = (navigator.language || "it").slice(0, 2).toLowerCase();
  return SUPPORTED.includes(nav) ? nav : "it";
}

let currentLang = detectLang();

function t(key, vars) {
  let s = (I18N[currentLang] && I18N[currentLang][key]) || (I18N.it[key]) || key;
  if (vars) for (const k in vars) s = s.replaceAll("{" + k + "}", vars[k]);
  return s;
}

function getLang() { return currentLang; }

function setLang(lang) {
  if (!SUPPORTED.includes(lang)) return;
  currentLang = lang;
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignora */ }
  document.documentElement.lang = lang;
  applyTranslations();
  document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
}

/* Applica le stringhe a tutti gli elementi marcati con data-i18n.
   - data-i18n="key"            -> textContent
   - data-i18n-attr="placeholder:key;aria-label:key2" -> attributi */
function applyTranslations(root) {
  const scope = root || document;
  scope.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  scope.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    el.getAttribute("data-i18n-attr").split(";").forEach((pair) => {
      const [attr, key] = pair.split(":");
      if (attr && key) el.setAttribute(attr.trim(), t(key.trim()));
    });
  });
}

document.documentElement.lang = currentLang;
