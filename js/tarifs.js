/* ============================================================
   ConformeIA — SOURCE UNIQUE DES PRIX (ne jamais dupliquer ailleurs)
   Règle : landing (index.html) + page paiement + QA lisent CES valeurs.
   ============================================================ */
window.CONFORMEIA_TARIFS = (function () {
  "use strict";
  var PACKS = {
    pack49: {
      id: "pack49",
      nom: "Pack Art. 50 Express",
      prix: 49,
      prefixe: "À partir de",
      badge: "",
      cible: "PME qui veulent être en règle ce mois-ci",
      contenu: [
        "Guide pratique Art. 50 (≈ 40 pages, A4 imprimable)",
        "Checklist 4 situations déployeur (cochable, imprimable)",
        "Modèles de mentions prêts à l'emploi (chatbot, deepfake, voix, textes, marquage machine)",
        "Procédure interne + registre de conformité",
        "Mini-outil d'audit JS (questionnaire → plan d'action)",
        "Mises à jour réglementaires incluses 12 mois"
      ]
    },
    pack149: {
      id: "pack149",
      nom: "Pack Pro + Atelier 2 h",
      prix: 149,
      prefixe: "À partir de",
      badge: "LE PLUS CHOISI",
      cible: "PME avec IA en production qui veulent la preuve documentaire",
      contenu: [
        "Tout le Pack Express (49 €)",
        "Atelier visio 2 h : diagnostic de vos 4 situations réelles",
        "Relecture personnalisée de vos mentions et étiquetages",
        "Registre de conformité pré-rempli pour votre entreprise",
        "Attestation documentaire de mise en conformité"
      ]
    },
    service: {
      id: "service",
      nom: "Conformité complète",
      prix: 290,
      prixMax: 590,
      prefixe: "À partir de",
      badge: "SERVICE",
      cible: "PME qui veulent tout déléguer (périmètre : 290 € → 590 €)",
      contenu: [
        "Audit complet de vos usages IA (4 situations)",
        "Rédaction des mentions + intégration (chatbot, site, contenus)",
        "Procédure interne et registre remplis",
        "Formation 1 h de votre équipe (10 personnes max)",
        "Attestation + accompagnement jusqu'à conformité"
      ]
    }
  };

  function formatPrix(p) {
    return String(p).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €";
  }

  function label(packId) {
    var p = PACKS[packId];
    if (!p) return "";
    if (p.prixMax) return p.prefixe + " " + formatPrix(p.prix) + " – " + formatPrix(p.prixMax);
    return p.prefixe + " " + formatPrix(p.prix);
  }

  return { PACKS: PACKS, formatPrix: formatPrix, label: label };
})();
