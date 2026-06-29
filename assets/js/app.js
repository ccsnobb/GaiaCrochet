/* ============================================================
   app.js — logica comune a tutte le pagine:
   selettore lingua, pannello accessibilità, stato navigazione.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Preferenze di accessibilità ---------- */
  const A11Y = [
    { key: "gc_a11y_dys", cls: "a11y-dys", toggle: "a11y-font" },
    { key: "gc_a11y_large", cls: "a11y-large", toggle: "a11y-large" },
    { key: "gc_a11y_reduce", cls: "a11y-reduce", toggle: "a11y-motion" }
  ];

  function readPref(key) {
    try { return localStorage.getItem(key) === "1"; } catch (e) { return false; }
  }
  function writePref(key, on) {
    try { localStorage.setItem(key, on ? "1" : "0"); } catch (e) { /* ignora */ }
  }

  // Applica subito le preferenze salvate (prima del rendering visivo).
  A11Y.forEach((p) => {
    if (readPref(p.key)) document.documentElement.classList.add(p.cls);
  });

  /* ---------- Avvio dopo il caricamento del DOM ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    applyTranslations();

    /* Anno corrente nel footer */
    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = new Date().getFullYear();
    });

    /* Selettore lingua */
    document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
      updateLangButton(btn);
      btn.addEventListener("click", function () {
        setLang(getLang() === "it" ? "en" : "it");
      });
    });
    document.addEventListener("langchange", function () {
      document.querySelectorAll("[data-lang-toggle]").forEach(updateLangButton);
    });

    /* Pannello accessibilità */
    setupA11yPanel();
  });

  function updateLangButton(btn) {
    const cur = getLang();
    const other = cur === "it" ? "EN" : "IT";
    btn.innerHTML =
      '<b>' + cur.toUpperCase() + '</b><span>&nbsp;/&nbsp;' + other + '</span>';
    btn.setAttribute("aria-label", t("lang.switch"));
  }

  function setupA11yPanel() {
    const toggle = document.querySelector(".a11y-toggle");
    const menu = document.querySelector(".a11y-menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
      const open = menu.hasAttribute("hidden");
      if (open) { menu.removeAttribute("hidden"); }
      else { menu.setAttribute("hidden", ""); }
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Chiudi cliccando fuori o con Escape
    document.addEventListener("click", function (e) {
      if (!menu.hasAttribute("hidden") &&
          !menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hasAttribute("hidden")) {
        menu.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });

    // Collega gli switch alle preferenze
    A11Y.forEach((p) => {
      const input = menu.querySelector('[data-pref="' + p.toggle + '"]');
      if (!input) return;
      input.checked = readPref(p.key);
      input.addEventListener("change", function () {
        document.documentElement.classList.toggle(p.cls, input.checked);
        writePref(p.key, input.checked);
      });
    });
  }
})();
