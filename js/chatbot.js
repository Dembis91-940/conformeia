/* ============================================================
   ConformeIA — CHATBOT FAQ + CAPTURE DE LEAD (EmailJS réel)
   Bouton flottant, réponses FAQ Art. 50, remontée de lead.
   ============================================================ */
(function () {
  "use strict";
  var NAME = "ConformeIA";
  var EMAILJS = {
    publicKey: "8Pui4ZEqxW2jRVF7h",
    serviceId: "service_cy1ytdb",
    templateId: "template_xpo58cv"
  };

  var FAQ = [
    { q: "Suis-je concerné par l'article 50 ?", a: "Oui si vous déployez une IA qui interagit avec des personnes (chatbot, voix, avatar), créez des deepfakes ou contenus photoréalistes, publiez des textes d'intérêt public générés par IA, ou commercialisez un outil génératif sous votre marque." },
    { q: "Quelle est l'échéance ?", a: "Les obligations de transparence (Art. 50) sont en vigueur depuis le 02/08/2026. Le marquage des systèmes déjà en service est à régulariser au plus tard le 02/12/2026." },
    { q: "Quelles amendes ?", a: "Jusqu'à 15 000 000 € ou 3 % du chiffre d'affaires annuel mondial (le montant le plus élevé), pour non-respect des obligations de transparence." },
    { q: "Fournisseur ou déployeur, quelle différence ?", a: "Le fournisseur développe ou met sur le marché le système (OpenAI, Mistral…). Le déployeur l'utilise dans son activité professionnelle (vous). Les deux ont des obligations Art. 50 distinctes — le pack couvre les deux cas." },
    { q: "Une mention « ceci est une IA » suffit-elle ?", a: "Pour un chatbot : oui, si elle est visible avant ou au premier contact. Pour les deepfakes : étiquetage clair. Pour les textes d'intérêt public : il faut en plus un marquage lisible par machine (C2PA/IPTC)." },
    { q: "Le pack remplace-t-il un avocat ?", a: "Non. C'est un outil de mise en conformité pratique (procédures, mentions, registre) qui réduit le risque. Pour un avis juridique formel, consultez un professionnel du droit." }
  ];

  function css() {
    var s = document.createElement("style");
    s.textContent = [
      "#cfia-chat{position:fixed;bottom:22px;right:22px;z-index:9999;font-family:system-ui,sans-serif}",
      "#cfia-fab{width:58px;height:58px;border-radius:50%;border:none;cursor:pointer;background:#064BD9;color:#fff;font-size:24px;box-shadow:0 8px 24px rgba(6,75,217,.45);transition:transform .2s}",
      "#cfia-fab:hover{transform:scale(1.08)}",
      "#cfia-box{display:none;position:absolute;bottom:72px;right:0;width:330px;max-width:calc(100vw - 40px);background:#fff;border:1px solid rgba(12,18,25,.12);border-radius:16px;box-shadow:0 24px 60px rgba(12,18,25,.25);overflow:hidden}",
      "#cfia-box.open{display:block}",
      "#cfia-head{background:#0C1219;color:#F3F1EA;padding:14px 16px;font-weight:700;font-size:15px}",
      "#cfia-msgs{height:260px;overflow-y:auto;padding:12px;background:#F7F6F1}",
      ".cfia-m{background:#fff;border:1px solid rgba(12,18,25,.08);border-radius:10px;padding:9px 11px;margin-bottom:8px;font-size:13.5px;line-height:1.45;color:#14181D}",
      ".cfia-m.user{background:#064BD9;color:#fff;border:none;margin-left:22px}",
      ".cfia-q{display:block;width:100%;text-align:left;background:#fff;border:1px solid rgba(12,18,25,.12);border-radius:8px;padding:8px 10px;margin-bottom:6px;font-size:12.5px;cursor:pointer;color:#0C1219}",
      ".cfia-q:hover{border-color:#064BD9;color:#064BD9}",
      "#cfia-foot{padding:10px;border-top:1px solid rgba(12,18,25,.1);background:#fff}",
      "#cfia-foot input{width:100%;box-sizing:border-box;padding:9px 11px;border:1px solid rgba(12,18,25,.2);border-radius:8px;font-size:13px}",
      "#cfia-note{font-size:11px;color:#6B7280;padding:6px 12px 10px;background:#fff}"
    ].join("");
    document.head.appendChild(s);
  }

  function initEmailJS() {
    if (window.emailjs) { try { emailjs.init({ publicKey: EMAILJS.publicKey }); } catch (e) {} return; }
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    s.onload = function () { try { emailjs.init({ publicKey: EMAILJS.publicKey }); } catch (e) {} };
    document.head.appendChild(s);
  }

  function sendLead(email, question) {
    if (!window.emailjs) return;
    try {
      emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, {
        name: "Visiteur chatbot ConformeIA",
        email: email,
        question: question || "Question FAQ",
        site: NAME
      });
    } catch (e) {}
  }

  function build() {
    css();
    initEmailJS();
    var root = document.createElement("div");
    root.id = "cfia-chat";
    root.innerHTML =
      '<button id="cfia-fab" aria-label="Ouvrir l\'assistant">💬</button>' +
      '<div id="cfia-box">' +
      '  <div id="cfia-head">ConformeIA — Assistant Art. 50</div>' +
      '  <div id="cfia-msgs">' +
      '    <div class="cfia-m">Bonjour 👋 Je réponds à vos questions sur l\'article 50 de l\'EU AI Act. Choisissez une question :</div>' +
      '  </div>' +
      '  <div id="cfia-foot"><input id="cfia-mail" type="email" placeholder="Votre email pour recevoir le diagnostic (optionnel)"></div>' +
      '  <div id="cfia-note">Réponses synthétiques — ne remplacent pas un conseil juridique.</div>' +
      '</div>';
    document.body.appendChild(root);

    var fab = document.getElementById("cfia-fab");
    var box = document.getElementById("cfia-box");
    fab.addEventListener("click", function () { box.classList.toggle("open"); });

    var msgs = document.getElementById("cfia-msgs");
    function ask() {
      msgs.innerHTML = '<div class="cfia-m">Choisissez une question :</div>';
      FAQ.forEach(function (item, i) {
        var b = document.createElement("button");
        b.className = "cfia-q";
        b.textContent = (i + 1) + ". " + item.q;
        b.addEventListener("click", function () {
          var mail = document.getElementById("cfia-mail").value.trim();
          msgs.innerHTML = "";
          var u = document.createElement("div"); u.className = "cfia-m user"; u.textContent = item.q;
          var r = document.createElement("div"); r.className = "cfia-m"; r.textContent = item.a;
          var more = document.createElement("button"); more.className = "cfia-q";
          more.textContent = "📋 Recevoir la checklist complète (gratuit)";
          more.addEventListener("click", function () {
            var m2 = document.getElementById("cfia-mail").value.trim();
            if (m2) { sendLead(m2, "Checklist complète Art. 50"); more.textContent = "✓ Envoyé — vérifiez votre boîte mail"; more.disabled = true; }
            else { more.textContent = "✍️ Indiquez d'abord votre email ci-dessous"; }
          });
          msgs.appendChild(u); msgs.appendChild(r); msgs.appendChild(more);
          if (mail) sendLead(mail, "FAQ : " + item.q);
        });
        msgs.appendChild(b);
      });
    }
    ask();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
