# ConformeIA — Pack Conformité EU AI Act Article 50

SaaS/documentaire FR : mise en conformité des PME à l'article 50 du Règlement (UE) 2024/1689
(obligations de transparence en vigueur depuis le 02/08/2026 ; marquage des systèmes existants : 02/12/2026 ;
sanctions jusqu'à 15 M€ ou 3 % du CA).

## Structure

```
ai-act-conformite/
├── index.html              Landing (3D WebGL, forge 4 étapes, film de conversion,
│                           pricing 3 paliers, formulaire EmailJS, FAQ, SEO)
├── audit.html              Mini-outil d'audit JS : 14 questions → score + plan d'action
├── paiement.html           Commande (3 offres) + EmailJS + note Stripe (clé en attente)
├── js/
│   ├── tarifs.js           SOURCE UNIQUE des prix (49 / 149 / 290–590 €)
│   ├── audit-engine.js     Moteur d'audit pur (testé en Node)
│   └── chatbot.js          Widget FAQ + capture de lead (EmailJS)
├── pack/                   CONTENU LIVRÉ AU CLIENT (A4 imprimable)
│   ├── guide-conformite-art50.html   Guide ≈ 40 p. (+ .md)
│   ├── checklist-4-situations.html   Checklist cochable, responsable + délai
│   ├── modeles-mentions.html         Mentions prêtes à copier (chatbot, voix,
│   │                                 deepfakes, textes, marquage machine)
│   └── procedure-interne.html        Procédure 5 étapes + registre de conformité
├── zip/ai-act-conformite-pack.zip    Pack zippé (livraison après paiement)
├── qa/qa-ai-act.cjs        Harness : liens, fichiers, prix, moteur d'audit
└── README.md
```

## Déploiement (GitHub Pages ou hébergeur statique)

1. Pusher le dossier sur un dépôt (ex. `conformeia`) branché GitHub Pages.
2. Stripe : créer les Payment Links (49 €, 149 €, 290–590 €) puis remplacer les boutons
   `paiement.html` (actuellement : précommande EmailJS + note d'activation).
3. EmailJS : déjà câblé sur le compte du portfolio (service_cy1ytdb / template_xpo58cv) —
   les leads arrivent sur la boîte de réception configurée.

## Vérifications effectuées

- Harness Node `qa/qa-ai-act.cjs` : liens internes OK, fichiers requis présents, prix identiques
  entre index/paiement, moteur d'audit (3 scénarios : conforme / partiel / non conforme) → voir sortie.
- Serveur local python3 + curl HTTP 200 sur index, audit, paiement, pack/*.
- Voir `reports/2026-09-01-ai-act-art50-pack.md` pour le détail.

## Points d'honnêteté

- Le guide et les mentions sont fondés sur le Règlement (UE) 2024/1689 et les publications officielles
  (Commission, economie.gouv.fr, OIA) ; un disclaimer « pas un conseil juridique » figure sur chaque document.
- Aucun faux engagement : le paiement Stripe est annoncé « en cours d'activation » et la commande
  part en précommande EmailJS tant que la clé n'est pas fournie par l'utilisateur.
