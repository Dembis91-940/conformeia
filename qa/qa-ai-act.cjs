#!/usr/bin/env node
/* ============================================================
   ConformeIA — Harness QA (liens, fichiers, prix, moteur d'audit)
   Usage : node qa/qa-ai-act.cjs   (depuis la racine du projet)
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
let failures = 0;

function fail(msg) { failures++; console.log("  ✗ " + msg); }
function ok(msg) { console.log("  ✓ " + msg); }

/* ---------- 1. Fichiers requis ---------- */
const REQUIRED = [
  "index.html", "audit.html", "paiement.html",
  "js/tarifs.js", "js/audit-engine.js", "js/chatbot.js",
  "pack/guide-conformite-art50.html", "pack/guide-conformite-art50.md",
  "pack/checklist-4-situations.html", "pack/modeles-mentions.html",
  "pack/procedure-interne.html", "README.md",
  "zip/ai-act-conformite-pack.zip"
];
console.log("1) Fichiers requis");
REQUIRED.forEach((f) => {
  fs.existsSync(path.join(ROOT, f)) ? ok(f) : fail("manquant : " + f);
});

/* ---------- 2. Liens internes ---------- */
console.log("2) Liens internes");
const htmlFiles = ["index.html", "audit.html", "paiement.html",
  "pack/guide-conformite-art50.html", "pack/checklist-4-situations.html",
  "pack/modeles-mentions.html", "pack/procedure-interne.html"];
let totalLinks = 0, broken = 0;

htmlFiles.forEach((rel) => {
  const abs = path.join(ROOT, rel);
  const html = fs.readFileSync(abs, "utf8");
  const dir = path.dirname(abs);
  const re = /\b(?:href|src)="([^"]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    let href = m[1];
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    if (/^https?:\/\//.test(href) || href.startsWith("data:") || href.startsWith("//")) continue;
    /* ignore placeholders EmailJS / JS string snippets */
    if (href.includes("{{") || href.includes("' + ") || href.includes('" + ')) continue;
    href = href.split("?")[0].split("#")[0];
    if (!href) continue;
    totalLinks++;
    if (!fs.existsSync(path.resolve(dir, decodeURIComponent(href)))) {
      broken++;
      fail(rel + " → " + href);
    }
  }
});
if (broken === 0) ok(totalLinks + " liens internes résolus (0 cassé)");

/* ---------- 3. Prix cohérents (source unique vs pages) ---------- */
console.log("3) Cohérence des prix");
const tarifs = fs.readFileSync(path.join(ROOT, "js/tarifs.js"), "utf8");
[["pack49", "prix: 49"], ["pack149", "prix: 149"], ["service", "prix: 290"], ["service", "prixMax: 590"]]
  .forEach(([k, v]) => {
    tarifs.includes(k) && tarifs.includes(v) ? ok("tarifs.js contient " + k + " " + v) : fail("tarifs.js : " + k + " " + v + " absent");
  });

["index.html", "paiement.html"].forEach((f) => {
  const html = fs.readFileSync(path.join(ROOT, f), "utf8");
  const checks = [
    ["tarifs.js inclus", /js\/tarifs\.js/]
  ];
  if (f === "index.html") {
    checks.push(["49 €", /49[^\d]|"49"/], ["149 €", /149[^\d]|"149"/],
      ["290 €", /290[^\d]|"290"/], ["590 €", /590[^\d]|"590"/]);
  } else {
    /* paiement.html rend les prix DEPUIS la source unique (tarifs.js) :
       vérifier l'usage de T.PACKS et des champs prix/prixMax */
    checks.push(
      ["utilise T.PACKS", /T\.PACKS/],
      ["utilise prixMax (590)", /prixMax/],
      ["utilise formatPrix", /formatPrix/]
    );
  }
  checks.forEach(([label, re]) => {
    re.test(html) ? ok(f + " : " + label) : fail(f + " : " + label + " introuvable");
  });
});

/* Vérification fonctionnelle de la source unique des prix (labels rendus) */
console.log("3b) Labels de prix générés par tarifs.js (Node)");
global.window = {};
require(path.join(ROOT, "js/tarifs.js"));
const T = global.window.CONFORMEIA_TARIFS;
const lbl49 = T.label("pack49");
const lbl149 = T.label("pack149");
const lblSvc = T.label("service");
lbl49 === "À partir de 49 €"
  ? ok("pack49 → « " + lbl49 + " »")
  : fail("pack49 label inattendu : " + lbl49);
lbl149 === "À partir de 149 €"
  ? ok("pack149 → « " + lbl149 + " »")
  : fail("pack149 label inattendu : " + lbl149);
lblSvc === "À partir de 290 € – 590 €"
  ? ok("service → « " + lblSvc + " »")
  : fail("service label inattendu : " + lblSvc);

/* ---------- 4. Moteur d'audit (3 scénarios) ---------- */
console.log("4) Moteur d'audit (audit-engine.js)");
const A = require(path.join(ROOT, "js/audit-engine.js"));
const qids = A.QUESTIONS.map((q) => q.id);
const Q = A.QUESTIONS.length;
if (Q !== 14) fail("14 questions attendues, trouvé " + Q); else ok("14 questions");

/* Certaines questions sont formulées « à l'envers » (ex. « se fait-il passer
   pour un humain ? » → oui = mauvais). Le scénario conforme = meilleur choix
   PAR QUESTION (max de points), non « tout à oui ». */
function bestWorst() {
  const best = {}, worst = {};
  A.QUESTIONS.forEach((q) => {
    let b = q.choix[0], w = q.choix[0];
    q.choix.forEach((c) => {
      if (c.points > b.points) b = c;
      if (c.points < w.points) w = c;
    });
    best[q.id] = b.v; worst[q.id] = w.v;
  });
  return { best, worst };
}
const { best, worst } = bestWorst();
const conforme = A.computeAudit(best);
const nonConforme = A.computeAudit(worst);
const mixte = A.computeAudit(Object.fromEntries(qids.map((id) => [id, "partiel"])));

conforme.score === 100 && conforme.statut === "EN BONNE VOIE"
  ? ok("scénario conforme : score " + conforme.score + " → " + conforme.statut)
  : fail("scénario conforme inattendu : " + conforme.score + " / " + conforme.statut);
nonConforme.score === 0 && nonConforme.statut === "URGENT"
  ? ok("scénario non conforme : score " + nonConforme.score + " → " + nonConforme.statut)
  : fail("scénario non conforme inattendu : " + nonConforme.score + " / " + nonConforme.statut);
mixte.score > 30 && mixte.score < 70 && mixte.statut === "À TRAITER"
  ? ok("scénario mixte : score " + mixte.score + " → " + mixte.statut)
  : fail("scénario mixte inattendu : " + mixte.score + " / " + mixte.statut);

if (nonConforme.plan.length !== 4) fail("plan doit avoir 4 actions, trouvé " + nonConforme.plan.length);
else ok("plan d'action : 4 situations priorisées");
nonConforme.plan.forEach((p, i) => {
  if (!p.action || p.action.length < 30) fail("action " + i + " vide");
});

/* scores par situation cohérents */
const sAll = Object.keys(A.SITUATIONS).map((s) => conforme.parSituation[s]);
if (sAll.every((x) => x === 100)) ok("scores par situation (conforme) = 100/100");
else fail("scores par situation inattendus : " + JSON.stringify(conforme.parSituation));

/* ---------- 5. Structure HTML de base ---------- */
console.log("5) Structure HTML de base");
htmlFiles.forEach((f) => {
  const html = fs.readFileSync(path.join(ROOT, f), "utf8");
  const lang = /<html lang="fr">/.test(html);
  const meta = /<meta name="description"/.test(html);
  const title = /<title>.*<\/title>/.test(html);
  lang && meta && title ? ok(f + " : lang=fr, meta description, title") : fail(f + " : structure incomplète (lang=" + lang + " meta=" + meta + " title=" + title + ")");
});

/* ---------- Bilan ---------- */
console.log("");
if (failures > 0) {
  console.log("❌ QA : " + failures + " échec(s)");
  process.exit(1);
} else {
  console.log("✅ QA : tout est vert (" + totalLinks + " liens, " + Q + " questions, prix OK)");
}
