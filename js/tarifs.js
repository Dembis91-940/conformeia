/* ============================================================
   ConformeIA — SOURCE UNIQUE DES PRIX (ne jamais dupliquer ailleurs)
   Règle : landing (index.html) + page paiement + QA lisent CES valeurs.

   Offre validée le 29/10/2026 — 3 niveaux, un contenu distinct par niveau :
     49 €  le pack seul
     149 € le pack ADAPTÉ à l'entreprise (questionnaire + mentions rédigées
           + registre pré-rempli + note d'écart + attestation documentaire)
     290 € le pack adapté PLUS 1 h de relecture en visio (grille 12 points + PV)

   Ne jamais réintroduire : atelier 2 h, audit vendu, formation d'équipe,
   fourchette 290–590 €. Ces formules n'existent plus.
   ============================================================ */
window.CONFORMEIA_TARIFS = (function () {
  "use strict";
  var PACKS = {
    pack49: {
      id: "pack49",
      nom: "Pack Art. 50 Express",
      prix: 49,
      prefixe: "",
      badge: "",
      cible: "PME qui veulent être en règle ce mois-ci",
      contenu: [
        "Guide pratique Art. 50 (≈ 40 pages, A4 imprimable)",
        "Checklist 4 situations déployeur (cochable, imprimable)",
        "Modèles de mentions prêts à l'emploi (chatbot, deepfake, voix, textes, marquage machine)",
        "Procédure interne + registre de conformité",
        "Mini-outil de diagnostic JS (questionnaire → plan d'action)",
        "Mises à jour réglementaires incluses 12 mois"
      ]
    },
    pack149: {
      id: "pack149",
      nom: "Pack Art. 50 Adapté",
      prix: 149,
      prefixe: "",
      badge: "LE PLUS CHOISI",
      cible: "PME qui veulent le pack rempli avec LEURS situations, pas un modèle générique",
      contenu: [
        "Tout le Pack Express (49 €)",
        "Questionnaire de cadrage : identité, 4 situations réellement en place, organisation",
        "Mentions rédigées pour vos canaux réels (à coller, plus rien à compléter)",
        "Registre de conformité pré-rempli avec vos systèmes et vos responsables",
        "Note d'écart : ce qui est déjà conforme, ce qui manque, dans quel ordre",
        "Rapport de synthèse de mise en conformité (document interne, pas un certificat officiel)"
      ]
    },
    pack290: {
      id: "pack290",
      nom: "Pack Art. 50 Adapté + relecture 1 h",
      prix: 290,
      prefixe: "",
      badge: "AVEC MOI",
      cible: "PME qui veulent faire relire le dossier en direct avant de l'envoyer à un client ou à un financeur",
      contenu: [
        "Tout le Pack Adapté (149 €)",
        "1 h de relecture en visio, agenda minuté en 6 séquences",
        "Grille de contrôle 12 points : chaque point vert, rouge ou non applicable",
        "Corrections faites en direct sur vos canaux réels",
        "PV de relecture envoyé sous 24 h ouvrées",
        "7 jours pour poser vos questions écrites, réponses incluses"
      ]
    }
  };

  /* Garde-fous affichés sur toutes les pages qui listent les offres.
     Ne jamais les retirer : ils protègent le client ET nous. */
  var GARDE_FOUS = [
    "Aucune certification n'est délivrée : nous attestons d'un dossier documentaire, pas d'une conformité validée par une autorité.",
    "Aucun avis juridique : nous produisons des documents opérationnels. Sur un litige ou une question de responsabilité, consultez un avocat."
  ];

  function formatPrix(p) {
    return String(p).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €";
  }

  function label(packId) {
    var p = PACKS[packId];
    if (!p) return "";
    return (p.prefixe ? p.prefixe + " " : "") + formatPrix(p.prix);
  }

  return { PACKS: PACKS, GARDE_FOUS: GARDE_FOUS, formatPrix: formatPrix, label: label };
})();
