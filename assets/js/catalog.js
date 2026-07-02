/* ============================================================
   catalog.js — catalogo prodotti.
   Sorgente unica: data/products.json (modificabile da Sveltia CMS).
   Stati: available | order | hidden. "hidden" non viene mostrato.
   ============================================================ */

(function () {
  "use strict";

  const CONTACT_EMAIL = "info@gaiacrochet.com";
  const GAME_CLICKS_NEEDED = 5;   // clic sul prezzo per sbloccare
  let gameClicks = 0;
  let gameWon = false;            // stato di sessione, nessun localStorage

  const grid = document.getElementById("grid");
  const countEl = document.getElementById("result-count");
  const searchInput = document.getElementById("f-search");
  const catSelect = document.getElementById("f-category");
  const availSelect = document.getElementById("f-availability");
  if (!grid) return; // non siamo nella pagina catalogo

  let PRODUCTS = [];

  /* ---------- Altezza header -> --header-h ---------- */
  // La barra filtri è sticky sotto l'header (anch'esso sticky, altezza non
  // fissa: cambia con "testo grande" e col wrap della nav). Si misura
  // l'altezza reale e la si scrive in --header-h su :root.
  const header = document.querySelector(".site-header");
  function updateHeaderVar() {
    if (!header) return;
    document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
  }
  updateHeaderVar();
  if (header && "ResizeObserver" in window) {
    // Copre resize, cambio scala a11y-large e wrap della nav
    new ResizeObserver(updateHeaderVar).observe(header);
  } else if (header) {
    // Fallback: solo resize finestra, con debounce
    let headerVarTimer;
    window.addEventListener("resize", () => {
      clearTimeout(headerVarTimer);
      headerVarTimer = setTimeout(updateHeaderVar, 150);
    });
  }

  /* ---------- Caricamento dati ---------- */
  fetch("data/products.json", { cache: "no-cache" })
    .then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then((data) => {
      // Accetta sia un array sia un oggetto { "products": [...] } (formato CMS)
      const list = Array.isArray(data) ? data : (data && data.products) || [];
      // Mostra solo i prodotti non nascosti
      PRODUCTS = list.filter((p) => p && p.availability !== "hidden");
      render();
    })
    .catch(() => {
      grid.innerHTML =
        '<div class="empty">' + escapeHtml(t("catalog.loaderror")) + "</div>";
    });

  /* ---------- Eventi filtri ---------- */
  [searchInput, catSelect, availSelect].forEach((el) => {
    if (el) el.addEventListener("input", render);
  });
  document.addEventListener("langchange", render);

  /* ---------- Helper ---------- */
  function field(p, base) { return p[base + "_" + getLang()] || p[base + "_it"] || ""; }

  function formatPrice(value) {
    const [int, dec] = Number(value).toFixed(2).split(".");
    return (
      '<span class="price">' +
      '<span class="price__cur" aria-hidden="true">€</span>' +
      '<span class="price__int">' + int + "</span>" +
      '<span class="price__dec">' + dec + "</span>" +
      '<span class="sr-only"> euro</span>' +
      "</span>"
    );
  }

  function isHandmade(p) {
    // flag esplicito, con fallback sulle categorie fatte a mano
    if (typeof p.handmade === "boolean") return p.handmade;
    return p.category === "cucito" || p.category === "uncinetto";
  }

  function mailtoFor(p) {
    const name = field(p, "name");
    const subject = t("mail.subject", { name });
    const body = t("mail.body", { name });
    return (
      "mailto:" + CONTACT_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body)
    );
  }

  // Come mailtoFor ma con il P.S. del codice sconto in fondo al corpo.
  function mailtoForGame(p) {
    const name = field(p, "name");
    const subject = t("mail.subject", { name });
    const body = t("mail.body", { name }) + "\n\n" + t("game.ps");
    return (
      "mailto:" + CONTACT_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body)
    );
  }

  // Mostra il premio dentro la scheda, sotto la riga prezzo. role="status"
  // lo fa annunciare agli screen reader nel momento in cui compare.
  function revealPrize(dlg, p) {
    const row = dlg.querySelector(".product__price-row");
    if (!row || dlg.querySelector(".price-prize")) return; // niente duplicati
    const prize = document.createElement("div");
    prize.className = "price-prize";
    prize.setAttribute("role", "status");
    prize.innerHTML =
      '<p class="price-prize__msg">' + escapeHtml(t("game.win")) + "</p>" +
      '<a class="price-prize__cta" href="' + escapeAttr(mailtoForGame(p)) + '">' +
        escapeHtml(t("game.cta")) + "</a>";
    row.insertAdjacentElement("afterend", prize);
  }

  function matchesFilters(p) {
    const cat = catSelect ? catSelect.value : "";
    const avail = availSelect ? availSelect.value : "";
    const q = searchInput ? searchInput.value.trim().toLowerCase() : "";

    if (cat && p.category !== cat) return false;
    if (avail && p.availability !== avail) return false;
    if (q) {
      const hay = [
        p.name_it, p.name_en, p.desc_it, p.desc_en, p.material_it, p.material_en
      ].filter(Boolean).join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }

  /* ---------- Rendering ---------- */
  function render() {
    const list = PRODUCTS.filter(matchesFilters);

    countEl.textContent =
      list.length === 1 ? t("catalog.count.one") : t("catalog.count.many", { n: list.length });

    if (list.length === 0) {
      grid.innerHTML = '<div class="empty">' + escapeHtml(t("catalog.empty")) + "</div>";
      return;
    }

    grid.innerHTML = "";
    list.forEach((p) => grid.appendChild(buildCard(p)));
  }

  function buildCard(p) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.setAttribute("aria-haspopup", "dialog");

    const img = (p.images && p.images[0]) || "assets/img/placeholder.svg";
    const name = field(p, "name");
    const availLabel = t("avail." + p.availability);
    const badgeClass = p.availability === "available" ? "badge--available" : "badge--order";

    card.innerHTML =
      '<span class="card__media"><img src="' + escapeAttr(img) +
        '" alt="' + escapeAttr(name) + '" loading="lazy" decoding="async"></span>' +
      '<span class="card__body">' +
        '<span class="card__name">' + escapeHtml(name) + "</span>" +
        '<span class="card__foot">' +
          formatPrice(p.price) +
          '<span class="badge ' + badgeClass + '">' + escapeHtml(availLabel) + "</span>" +
        "</span>" +
      "</span>";

    card.addEventListener("click", () => openProduct(p));
    return card;
  }

  /* ---------- Modale prodotto ---------- */
  let dialog;

  function openProduct(p) {
    gameClicks = 0; // ogni apertura riparte da zero
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.className = "product";
      document.body.appendChild(dialog);
    }

    const name = field(p, "name");
    const images = (p.images && p.images.length) ? p.images : ["assets/img/placeholder.svg"];
    const availLabel = t("avail." + p.availability);
    const badgeClass = p.availability === "available" ? "badge--available" : "badge--order";

    const thumbs = images.length > 1
      ? '<div class="product__thumbs" role="group" aria-label="' + escapeAttr(t("product.gallery")) + '">' +
          images.map((src, i) =>
            '<button type="button" data-thumb="' + i + '"' +
            (i === 0 ? ' aria-current="true"' : "") +
            '><img src="' + escapeAttr(src) + '" alt="" loading="lazy" decoding="async"></button>'
          ).join("") +
        "</div>"
      : "";

    const material = field(p, "material");
    const time = field(p, "time");
    const desc = field(p, "description") || field(p, "desc");

    const metaRows =
      (material ? '<dt>' + escapeHtml(t("product.material")) + '</dt><dd>' + escapeHtml(material) + "</dd>" : "") +
      (time ? '<dt>' + escapeHtml(t("product.time")) + '</dt><dd>' + escapeHtml(time) + "</dd>" : "") +
      (desc ? '<dt>' + escapeHtml(t("product.description")) + '</dt><dd>' + escapeHtml(desc) + "</dd>" : "");

    const handmade = isHandmade(p)
      ? '<p class="handmade-note"><span aria-hidden="true">✶</span><span>' +
        escapeHtml(t("product.handmade")) + "</span></p>"
      : "";

    dialog.innerHTML =
      '<button type="button" class="product__close" aria-label="' + escapeAttr(t("product.close")) + '">✕</button>' +
      '<div class="product__grid">' +
        '<div class="product__gallery">' +
          '<img id="pgImg" src="' + escapeAttr(images[0]) + '" alt="' + escapeAttr(name) + '">' +
          thumbs +
        "</div>" +
        '<div class="product__info">' +
          '<span class="badge ' + badgeClass + '">' + escapeHtml(availLabel) + "</span>" +
          "<h2 id=\"pgTitle\">" + escapeHtml(name) + "</h2>" +
          '<dl class="product__meta">' + metaRows + "</dl>" +
          handmade +
          '<div class="product__price-row">' +
            '<button type="button" class="price-game" data-price-game>' + formatPrice(p.price) + "</button>" +
            '<div class="product__cta">' +
              '<a class="btn" href="' + escapeAttr(mailtoFor(p)) + '">' +
                escapeHtml(t("product.contact")) + "</a>" +
              '<button type="button" class="btn btn--ghost" data-copy-email aria-live="polite">' +
                escapeHtml(t("product.copy")) + "</button>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>";

    dialog.setAttribute("aria-label", name);

    // Galleria: cambio immagine
    dialog.querySelectorAll("[data-thumb]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-thumb"));
        dialog.querySelector("#pgImg").src = images[idx];
        dialog.querySelectorAll("[data-thumb]").forEach((b) => b.removeAttribute("aria-current"));
        btn.setAttribute("aria-current", "true");
      });
    });

    // Copia email: feedback "Copiata!" per 2 secondi, poi torna al testo normale
    const copyBtn = dialog.querySelector("[data-copy-email]");
    if (copyBtn) {
      let copyTimer;
      copyBtn.addEventListener("click", () => {
        copyText(CONTACT_EMAIL).then((ok) => {
          if (!ok) return;
          copyBtn.textContent = t("product.copied");
          clearTimeout(copyTimer);
          copyTimer = setTimeout(() => { copyBtn.textContent = t("product.copy"); }, 2000);
        });
      });
    }

    dialog.querySelector(".product__close").addEventListener("click", () => dialog.close());
    // Chiusura cliccando sullo sfondo
    dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });

    // Gioco "clicca il prezzo" (easter egg). Se gia' vinto in questa sessione,
    // mostra subito il premio; altrimenti conta i clic fino allo sblocco.
    const priceGame = dialog.querySelector("[data-price-game]");
    if (priceGame) {
      if (gameWon) {
        revealPrize(dialog, p);
      } else {
        priceGame.addEventListener("click", () => {
          gameClicks++;
          priceGame.classList.remove("price-game--bounce");
          void priceGame.offsetWidth; // forza il riavvio dell'animazione
          priceGame.classList.add("price-game--bounce");
          if (gameClicks >= GAME_CLICKS_NEEDED) {
            gameWon = true;
            revealPrize(dialog, p);
          }
        });
      }
    }

    dialog.showModal();
  }

  /* ---------- Copia negli appunti ---------- */
  // Ritorna una Promise<boolean>. Il fallback con textarea serve ai browser
  // senza navigator.clipboard (o in contesti non sicuri, es. http).
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(() => true, () => legacyCopy(text));
    }
    return Promise.resolve(legacyCopy(text));
  }

  function legacyCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    // Dentro la modale: col dialog aperto il resto della pagina e' inerte
    (dialog || document.body).appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    ta.remove();
    return ok;
  }

  /* ---------- Escape ---------- */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function escapeAttr(s) { return escapeHtml(s); }
})();
