# Guide pratique — Conformité Art. 50 EU AI Act pour PME

> ConformeIA · Pack Art. 50 Express · Version 1.1 — septembre 2026 (mise à jour Digital Omnibus)
> Document fondé sur le Règlement (UE) 2024/1689 tel que modifié par le Règlement (UE) 2026/1744 et les publications officielles (Commission européenne, economie.gouv.fr, OIA). **Ne constitue pas un conseil juridique.**

## 01. Ce que dit la loi — l'article 50 en 10 minutes

| Paragraphe | Obligation | Qui | Échéance |
|---|---|---|---|
| Art. 50 §1 | Informer les personnes qu'elles interagissent avec une IA (sauf si évident) | Fournisseurs + déployeurs | 02/08/2026 ✓ |
| Art. 50 §2 | Sorties des systèmes génératifs marquées machine-readable et détectables | Fournisseurs de systèmes génératifs | Nouveaux : 02/08/2026 ✓ · existants : 02/12/2026 |
| Art. 50 §3 | Informer les personnes exposées (reconnaissance émotions / biométrie) | Déployeurs concernés | 02/08/2026 ✓ |
| Art. 50 §4 | Divulguer les deepfakes et les textes d'intérêt public générés par IA | Déployeurs | 02/08/2026 ✓ |
| Art. 50 §5 | Information « claire et distinguable » à la première interaction | Tous | 02/08/2026 ✓ |

**Sanctions (art. 99.4)** : jusqu'à **15 000 000 € ou 3 % du CA annuel mondial** (le plus élevé des deux) — inchangées par le Digital Omnibus.

**Le point clé du Digital Omnibus (règl. UE 2026/1744)** : l'Art. 50 n'est **PAS reporté**. Le « l'AI Act est reporté à 2027 » est faux pour la transparence. Seul le haut risque est reporté (Annexe III → 02/12/2027 ; Annexe I → 02/08/2028). Seule concession : le marquage machine (Art. 50 §2) des systèmes déjà sur le marché avant le 02/08/2026 est exigible au plus tard le **02/12/2026**.

## 02. Le Digital Omnibus (règl. UE 2026/1744) — ce qui change vraiment

Publié au JO le 24/07/2026, en vigueur le 27/07/2026 : première modification de l'AI Act.

**Reporté (hors Art. 50)** :
- Haut risque Annexe III (recrutement, crédit, éducation, migration…) → **02/12/2027** (au lieu du 02/08/2026)
- Haut risque Annexe I (dispositifs médicaux, machines, jouets…) → **02/08/2028** (au lieu du 02/08/2027)
- Bacs à sable réglementaires nationaux (Art. 57) → opérationnels au 02/08/2027

**Durci — 2 nouvelles interdictions au 02/12/2026 (Art. 5, points (ba) et (bb))** :
- Applications « nudifier » : images/vidéos/audios intimes non consentis de personnes réelles générés par IA
- Génération de contenus pédocriminels (CSAM) par IA
- Sanction : jusqu'à **35 M€ ou 7 % du CA** (art. 99.3). Fournisseurs ET déployeurs concernés. Outils sous marque capables de produire ces contenus : garde-fous techniques (refus, filtres, modération) ou retrait avant le 02/12/2026.

**Adouci — AI literacy (Art. 4)** : depuis le 27/07/2026, obligation de moyens (« prendre des mesures pour soutenir le développement de la culture IA »), plus de niveau minimal garanti par personne. Applicable depuis le 02/02/2025 — conservez les preuves de vos actions de formation.

## 03. Fournisseur ou déployeur ?

- **Fournisseur** : développe ou met sur le marché le système (OpenAI, Mistral…, ou vous si vous commercialisez un outil génératif sous votre marque). Obligations de conception : sorties détectables/marquées machine, information des utilisateurs.
- **Déployeur** : utilise le système dans son activité (la plupart des PME). Obligations : informer le public, étiqueter, marquer.
- **Test** : outils tiers utilisés en interne → déployeur. Outil revendu sous votre marque → fournisseur. Les deux → les deux régimes.

## 04. Les 4 situations déployeur (synthèse)

| # | Situation | Obligation | Échéance |
|---|---|---|---|
| 1 | Chatbot, avatar, voix | Informer avant/au premier contact | 02/08/2026 ✓ |
| 2 | Deepfakes photoréalistes | Étiquetage clair, visible, durable | 02/08/2026 ✓ |
| 3 | Textes d'intérêt public | Marquage machine + mention détectable | 02/12/2026 (existants) |
| 4 | Outils génératifs sous marque | Sorties marquées + information utilisateurs | 02/08/2026 ✓ |

## 05. Situation 1 — Chatbot, avatar, voix

Exigences : mention visible au premier message ; interdiction de se faire passer pour un humain ; annonce vocale en début d'appel.

Exemple de mention : « Bonjour 👋 Je suis l'assistant virtuel de [Entreprise]. Je suis un programme d'intelligence artificielle : pour toute question, je vous réponds 24 h/24. Souhaitez-vous parler à un conseiller humain ? »

## 06. Situation 2 — Deepfakes

Exigences : étiquette visible sur le contenu (pas seulement en métadonnées), durable sur toutes les diffusions ; traçabilité conservée (outil, prompt, version) ; vigilance RGPD/droit à l'image pour visages/voix réels.

## 07. Situation 3 — Textes d'intérêt public

Deux couches : **marquage machine** (C2PA/IPTC/balises meta) + **mention lisible** (« Rédigé avec l'assistance d'une IA, vérifié par [équipe] »). Étapes : cartographier les canaux → outiller le marquage → formaliser la mention. Systèmes déjà sur le marché avant le 02/08/2026 : 02/12/2026.

## 08. Situation 4 — Outils génératifs sous votre marque

Rôle fournisseur : sorties marquées machine à la génération, information des utilisateurs finaux, documentation technique (modèle, version, date de mise en service). Piège white label : mettre son logo sur un outil tiers = statut de fournisseur. Avant le 02/12/2026 : vérifier l'absence d'usages « nudifier »/CSAM et activer les garde-fous techniques.

## 09. Procédure interne en 5 étapes

1. **Inventaire** des usages IA (direction/référent numérique)
2. **Qualification** des risques (référent conformité)
3. **Application des mentions** (équipes, second regard)
4. **Documentation** : registre + preuves datées, archivage 5 ans
5. **Revue** annuelle + à chaque changement majeur

## 10. Registre de conformité

Un tableau par système : référence, désignation, fournisseur, modèle sous-jacent, usage, situation Art. 50, rôle, date de mise en service, obligations appliquées, preuves, responsable, dernière revue, écarts.

## 11. FAQ + ressources officielles

- Usage interne sans exposition du public → pas d'obligation d'information ; dès publication → situations 2/3.
- « Assisté par IA » vs « généré par IA » : marquez dès que substantiellement produit par IA, documentez votre ligne de conduite.
- Les obligations fournisseur et déployeur se cumulent, les deux sont sanctionnables.
- Transparence = argument commercial ; l'absence de marquage devient suspecte.
- « L'AI Act est reporté à 2027 ? » → Faux pour l'Art. 50 : le report du Digital Omnibus ne couvre que le haut risque (02/12/2027 / 02/08/2028). La transparence s'applique depuis le 02/08/2026.
- Interdictions « nudifier »/CSAM (Art. 5) : fournisseurs ET déployeurs, garde-fous techniques obligatoires avant le 02/12/2026 pour les outils génératifs.
- AI literacy (Art. 4) : toujours obligatoire (obligation de moyens depuis le 27/07/2026), documentez vos actions.

Ressources : EUR-Lex (Règlements UE 2024/1689 et UE 2026/1744) · Commission européenne (digital-strategy.ec.europa.eu) · AI Act Service Desk · economie.gouv.fr · oia.fr · CNIL · c2pa.org · iptc.org.

---

*ConformeIA — Pack Art. 50 Express. Ne remplace pas un conseil juridique.*
