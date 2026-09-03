/* ============================================================
   ConformeIA — MOTEUR D'AUDIT ART. 50 (logique pure, testable en Node)
   Le questionnaire couvre les 4 situations déployeur + rôle + échéances.
   computeAudit(answers) -> { score, statut, parSituation, plan }
   ============================================================ */
(function (global) {
  "use strict";

  var SITUATIONS = {
    chatbot: {
      id: "chatbot",
      titre: "Chatbot, avatar ou voix (interaction directe)",
      obligation: "Informer la personne qu'elle interagit avec une IA, avant ou au premier contact.",
      echeance: "En vigueur depuis le 02/08/2026"
    },
    deepfake: {
      id: "deepfake",
      titre: "Images, vidéos ou audios photoréalistes (deepfakes)",
      obligation: "Étiqueter clairement le contenu comme artificiellement généré ou manipulé.",
      echeance: "En vigueur depuis le 02/08/2026"
    },
    textes: {
      id: "textes",
      titre: "Textes d'intérêt public (info, presse, communication)",
      obligation: "Marquage lisible par machine du contenu généré par IA + mention détectable.",
      echeance: "Marquage des systèmes existants : au plus tard le 02/12/2026"
    },
    marque: {
      id: "marque",
      titre: "Outils génératifs développés sous votre marque",
      obligation: "Obligations de fournisseur : sorties marquées machine, info des utilisateurs.",
      echeance: "En vigueur depuis le 02/08/2026"
    }
  };

  /* Chaque question : { id, situation, q, choix:[{v, points, label}] } */
  var QUESTIONS = [
    {
      id: "q1",
      situation: "chatbot",
      q: "Avez-vous un chatbot, un assistant vocal, un avatar ou tout système IA qui dialogue avec vos clients ou visiteurs ?",
      choix: [
        { v: "non", points: 10, label: "Non, aucun" },
        { v: "partiel", points: 5, label: "Oui, mais je ne suis pas sûr qu'il soit concerné" },
        { v: "oui", points: 0, label: "Oui, en production ou en test" }
      ]
    },
    {
      id: "q2",
      situation: "chatbot",
      q: "Vos utilisateurs sont-ils informés, avant ou au premier contact, qu'ils interagissent avec une IA (mention visible : « Vous discutez avec un agent virtuel ») ?",
      choix: [
        { v: "oui", points: 10, label: "Oui, mention visible au premier contact" },
        { v: "partiel", points: 5, label: "Partiellement (dans les CGU, petits caractères…)" },
        { v: "non", points: 0, label: "Non / je ne sais pas" }
      ]
    },
    {
      id: "q3",
      situation: "chatbot",
      q: "Votre chatbot ou avatar se fait-il passer pour un humain (prénom, photo, ton « agent commercial » sans mention IA) ?",
      choix: [
        { v: "non", points: 10, label: "Non, il est présenté comme une IA" },
        { v: "partiel", points: 5, label: "Ambigu (prénom humain sans précision)" },
        { v: "oui", points: 0, label: "Oui, il se présente comme un humain" }
      ]
    },
    {
      id: "q4",
      situation: "deepfake",
      q: "Créez-vous ou diffusez-vous des images, vidéos ou audios photoréalistes générés ou modifiés par IA (visages, voix, produits) ?",
      choix: [
        { v: "non", points: 10, label: "Non" },
        { v: "partiel", points: 5, label: "Rarement / ponctuellement" },
        { v: "oui", points: 0, label: "Oui, régulièrement" }
      ]
    },
    {
      id: "q5",
      situation: "deepfake",
      q: "Ces contenus sont-ils étiquetés de façon claire, visible et durable (« image générée par IA », « voix synthétique ») ?",
      choix: [
        { v: "oui", points: 10, label: "Oui, étiquette visible sur chaque diffusion" },
        { v: "partiel", points: 5, label: "Parfois / dans les métadonnées uniquement" },
        { v: "non", points: 0, label: "Non" }
      ]
    },
    {
      id: "q6",
      situation: "deepfake",
      q: "Pouvez-vous prouver (version du fichier, journal, nom de l'outil) qu'un contenu diffusé a été généré ou modifié par IA ?",
      choix: [
        { v: "oui", points: 10, label: "Oui, traçabilité complète" },
        { v: "partiel", points: 5, label: "Partiellement" },
        { v: "non", points: 0, label: "Non" }
      ]
    },
    {
      id: "q7",
      situation: "textes",
      q: "Publiez-vous des textes d'intérêt public générés ou assistés par IA (articles d'info, communiqués, contenus d'information) ?",
      choix: [
        { v: "non", points: 10, label: "Non" },
        { v: "partiel", points: 5, label: "Rarement" },
        { v: "oui", points: 0, label: "Oui" }
      ]
    },
    {
      id: "q8",
      situation: "textes",
      q: "Ces textes portent-ils un marquage lisible par machine (métadonnées C2PA/IPTC ou équivalent) + une mention détectable ?",
      choix: [
        { v: "oui", points: 10, label: "Oui, marquage machine + mention" },
        { v: "partiel", points: 5, label: "Mention seule, sans marquage machine" },
        { v: "non", points: 0, label: "Non" }
      ]
    },
    {
      id: "q9",
      situation: "textes",
      q: "Avez-vous identifié vos canaux de publication « d'intérêt public » (site, newsletter, presse, réseaux) et qui doit appliquer le marquage ?",
      choix: [
        { v: "oui", points: 10, label: "Oui, listés et responsables désignés" },
        { v: "partiel", points: 5, label: "En partie" },
        { v: "non", points: 0, label: "Non" }
      ]
    },
    {
      id: "q10",
      situation: "marque",
      q: "Commercialisez-vous des outils ou contenus génératifs sous VOTRE marque (white label, outil maison, API revendue) ?",
      choix: [
        { v: "non", points: 10, label: "Non" },
        { v: "partiel", points: 5, label: "En réflexion / bientôt" },
        { v: "oui", points: 0, label: "Oui" }
      ]
    },
    {
      id: "q11",
      situation: "marque",
      q: "Vos sorties génératives sont-elles conçues pour être détectables/marquées machine (métadonnées, filigrane) dès la conception ?",
      choix: [
        { v: "oui", points: 10, label: "Oui, marquage à la génération" },
        { v: "partiel", points: 5, label: "Partiellement" },
        { v: "non", points: 0, label: "Non / je ne sais pas" }
      ]
    },
    {
      id: "q12",
      situation: "marque",
      q: "Vos utilisateurs finaux sont-ils informés qu'ils utilisent un système d'IA (mentions, onboarding) ?",
      choix: [
        { v: "oui", points: 10, label: "Oui" },
        { v: "partiel", points: 5, label: "Partiellement" },
        { v: "non", points: 0, label: "Non" }
      ]
    },
    {
      id: "q13",
      situation: "chatbot",
      q: "Avez-vous un registre ou une trace documentaire de vos systèmes d'IA (outil, fournisseur, usage, date de mise en service) ?",
      choix: [
        { v: "oui", points: 10, label: "Oui, registre à jour" },
        { v: "partiel", points: 5, label: "Quelques notes éparses" },
        { v: "non", points: 0, label: "Non" }
      ]
    },
    {
      id: "q14",
      situation: "chatbot",
      q: "Connaissez-vous votre rôle exact (fournisseur, déployeur, ou les deux) et les échéances qui s'y appliquent (02/08/2026, 02/12/2026) ?",
      choix: [
        { v: "oui", points: 10, label: "Oui" },
        { v: "partiel", points: 5, label: "À peu près" },
        { v: "non", points: 0, label: "Non / je découvre" }
      ]
    }
  ];

  function scoreSituation(answers, situationId) {
    var total = 0, max = 0;
    QUESTIONS.forEach(function (q) {
      if (q.situation !== situationId) return;
      var rep = answers[q.id];
      max += 10;
      if (!rep) return;
      var c = q.choix.filter(function (x) { return x.v === rep; })[0];
      if (c) total += c.points;
    });
    return max === 0 ? 100 : Math.round((total / max) * 100);
  }

  function statut(score) {
    if (score < 40) return "URGENT";
    if (score < 75) return "À TRAITER";
    return "EN BONNE VOIE";
  }

  function computeAudit(answers) {
    var parSituation = {};
    var totalPts = 0, totalMax = 0;
    Object.keys(SITUATIONS).forEach(function (sid) {
      var s = scoreSituation(answers, sid);
      parSituation[sid] = s;
      /* poids égal entre situations pour le score global */
      totalPts += s;
      totalMax += 100;
    });
    var score = Math.round((totalPts / totalMax) * 100);

    /* Plan d'action priorisé : situations les plus faibles d'abord */
    var plan = [];
    Object.keys(SITUATIONS)
      .map(function (sid) { return { sid: sid, score: parSituation[sid] }; })
      .sort(function (a, b) { return a.score - b.score; })
      .forEach(function (item) {
        var s = SITUATIONS[item.sid];
        var action;
        if (item.score < 40) {
          action = "Régulariser immédiatement : appliquer l'obligation « " + s.obligation + " » avant toute nouvelle diffusion. " + s.echeance + ".";
        } else if (item.score < 75) {
          action = "Consolider : formaliser la mention, documenter la procédure et tracer les contenus. " + s.echeance + ".";
        } else {
          action = "Maintenir : documenter la preuve (captures, registre, versions) et surveiller les évolutions. " + s.echeance + ".";
        }
        plan.push({ situation: s.titre, score: item.score, action: action });
      });

    return {
      score: score,
      statut: statut(score),
      parSituation: parSituation,
      plan: plan,
      date: new Date().toISOString()
    };
  }

  var api = {
    SITUATIONS: SITUATIONS,
    QUESTIONS: QUESTIONS,
    computeAudit: computeAudit,
    statut: statut
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  global.CONFORMEIA_AUDIT = api;
})(typeof window !== "undefined" ? window : globalThis);
