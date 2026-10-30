/* ============================================================
   ConformeIA — SOURCE UNIQUE DES PRIX (ne jamais dupliquer ailleurs)
   Règle : landing (index.html) + page paiement + QA lisent CES valeurs.

   État du 30/10/2026, après le roast (rapport :
   memoire-partagee/hermes/roast-conformeia-290-2026-10-30.md).

   CE QUI CHANGE PAR RAPPORT À LA VERSION PRÉCÉDENTE — et pourquoi :

   1. Les pages annoncées sont les pages RÉELLES, mesurées sur les fichiers :
      guide 4 056 mots ≈ 9 pages A4 ; pack complet 6 433 mots ≈ 14 pages A4.
      L'ancienne mention « ≈ 40 pages » était fausse d'un facteur 4.

   2. Deux livrables annoncés au pack 49 € n'existent sous aucune forme
      (registre de conformité pré-rempli, mini-outil de diagnostic JS) :
      ils sont retirés. On n'annonce que ce qui est livré.

   3. Les niveaux 149 € et 290 € ne listent plus que les documents qui
      existent réellement dans pack/niveaux/ (3 pour le 149, 6 pour le 290).
      Les mentions « registre pré-rempli », « note d'écart » et
      « rapport de synthèse » sont retirées : aucun fichier ne les porte.

   4. Seul le 49 € est en vente. Les 149 € et 290 € passent « sur demande »
      jusqu'à la première vente (décision de Demba, 30/10/2026).
      Le bouton d'achat n'est donc plus affiché pour eux.

   Ne jamais réintroduire : atelier 2 h, audit vendu, formation d'équipe,
   fourchette 290–590 €, ni aucun livrable qui n'existe pas sur le disque.
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
      disponibilite: "en_vente",
      cible: "PME qui veulent être en règle ce mois-ci",
      contenu: [
        "Guide pratique Art. 50 — 9 pages A4 imprimables (ce que dit la loi, qui est concerné, vos obligations selon votre rôle)",
        "Checklist des 4 situations déployeur — cases à cocher avec responsable et délai, imprimable A4",
        "Modèles de mentions prêts à l'emploi — chatbot, avatar/voix, deepfakes, textes d'intérêt public, marquage machine (C2PA/IPTC)",
        "Procédure interne — qui fait quoi, qui valide, qui conserve les preuves",
        "Soit 4 documents, 14 pages A4 au total",
        "Mises à jour réglementaires incluses 12 mois"
      ]
    },

    pack149: {
      id: "pack149",
      nom: "Pack Art. 50 Adapté",
      prix: 149,
      prefixe: "",
      badge: "SUR DEMANDE",
      disponibilite: "sur_demande",
      cible: "PME qui veulent le pack rempli avec LEURS situations, pas un modèle générique",
      contenu: [
        "Tout le Pack Express (49 €)",
        "Questionnaire de cadrage — identité, 4 situations réellement en place, organisation",
        "Notice d'adaptation — comment transposer chaque modèle à vos canaux réels",
        "Mentions personnalisées (modèle à compléter avec vos réponses)",
        "Soit 3 documents supplémentaires"
      ]
    },

    pack290: {
      id: "pack290",
      nom: "Pack Art. 50 Adapté + relecture 1 h",
      prix: 290,
      prefixe: "",
      badge: "SUR DEMANDE",
      disponibilite: "sur_demande",
      cible: "PME qui veulent faire relire le dossier en direct avant de l'envoyer à un client ou à un financeur",
      contenu: [
        "Tout le Pack Adapté (149 €)",
        "Agenda de relecture — 6 séquences minutées sur 1 h",
        "Grille de contrôle 12 points — chaque point vert, rouge ou non applicable",
        "PV de relecture (modèle) à compléter et signer",
        "Soit 6 documents au total : 3 du niveau Adapté + 3 de la relecture"
      ]
    }
  };

  /* Garde-fous affichés sur toutes les pages qui listent les offres.
     Ne jamais les retirer : ils protègent le client ET nous. */
  var GARDE_FOUS = [
    "Aucune certification n'est délivrée : nous attestons d'un dossier documentaire, pas d'une conformité validée par une autorité.",
    "Aucun avis juridique : nous produisons des documents opérationnels. Sur un litige ou une question de responsabilité, consultez un avocat.",
    "Aucune conformité n'est garantie : les documents sont des outils de travail, pas une attestation de conformité."
  ];

  /* Message affiché à la place du bouton d'achat tant que les commandes
     ne sont pas ouvertes (SIRET en cours d'immatriculation). */
  var MESSAGE_COMMANDES_FERMEES = "Ouverture des commandes très bientôt";

  function formatPrix(p) {
    return String(p).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €";
  }

  function label(packId) {
    var p = PACKS[packId];
    if (!p) return "";
    return (p.prefixe ? p.prefixe + " " : "") + formatPrix(p.prix);
  }

  /* Un pack est achetable seulement s'il est en vente ET si les commandes
     sont ouvertes. Aujourd'hui : aucun, car le SIRET n'est pas attribué. */
  var COMMANDES_OUVERTES = false;

  function estAchetable(packId) {
    var p = PACKS[packId];
    if (!p) return false;
    return COMMANDES_OUVERTES && p.disponibilite === "en_vente";
  }

  return {
    PACKS: PACKS,
    GARDE_FOUS: GARDE_FOUS,
    MESSAGE_COMMANDES_FERMEES: MESSAGE_COMMANDES_FERMEES,
    COMMANDES_OUVERTES: COMMANDES_OUVERTES,
    estAchetable: estAchetable,
    formatPrix: formatPrix,
    label: label
  };
})();
