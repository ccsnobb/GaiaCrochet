#!/usr/bin/env node
/* ------------------------------------------------------------
   Strumento OPZIONALE di ottimizzazione foto.
   Ridimensiona a max 1600px e crea una copia .webp accanto a ogni
   JPG/PNG in assets/img. Da lanciare a mano quando serve:

       npm install
       npm run optimize

   Non è automatico: non gira da solo sul sito. Serve solo se vuoi
   alleggerire le foto prima di pubblicarle.
   ------------------------------------------------------------ */

import { readdir, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const DIR = "assets/img";
const MAX = 1600; // lato lungo massimo in px

const exts = new Set([".jpg", ".jpeg", ".png"]);

async function run() {
  let files;
  try {
    files = await readdir(DIR);
  } catch {
    console.error("Cartella non trovata:", DIR);
    process.exit(1);
  }

  let done = 0;
  for (const f of files) {
    if (!exts.has(extname(f).toLowerCase())) continue;
    const src = join(DIR, f);
    const out = src.replace(/\.(jpe?g|png)$/i, ".webp");

    const meta = await sharp(src).metadata();
    const resize =
      meta.width && meta.width > MAX ? { width: MAX } : {};

    await sharp(src).resize(resize).webp({ quality: 80 }).toFile(out);
    done++;
    console.log("✓", f, "→", out.split("/").pop());
  }
  console.log(`\nFatto: ${done} immagini ottimizzate in ${DIR}.`);
}

run();
