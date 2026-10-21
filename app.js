/**
 * AGAPÉ CONNECT - LOGIQUE INTERACTIVE DU PROTOTYPE
 * Gère la synchronisation en temps réel entre l'App Mobile et le Dashboard Pasteur
 */

// Données initiales d'exemple réalistes
const AppData = {
  members: [
    {
      id: "MEM-001",
      name: "Frère DALLE",
      phone: "+225 07 48 99 12 34",
      dept: "Chorale",
      status: "Actif / Baptisé",
      joined: "12 Mars 2021",
      avatar: "profile_dalle.png"
    },
    {
      id: "MEM-002",
      name: "Grace Amani",
      phone: "+225 05 12 34 56 78",
      dept: "Intercession",
      status: "Responsable",
      joined: "05 Janv 2019",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces"
    },
    {
      id: "MEM-003",
      name: "Jean-Eudes Bamba",
      phone: "+225 01 98 76 54 32",
      dept: "Jeunesse",
      status: "Actif",
      joined: "22 Juin 2022",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
    },
    {
      id: "MEM-004",
      name: "Prisca Yao",
      phone: "+225 07 65 43 21 09",
      dept: "Accueil",
      status: "Nouvelle Adhérente",
      joined: "14 Sept 2024",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces"
    }
  ],

  announcements: [
    {
      id: "ANN-1",
      title: "Grande Veillée d'Impact & d'Onction",
      target: "Tous les fidèles",
      priority: "urgent",
      date: "Vendredi 24 Octobre • 22h00 - 05h00",
      content: "Thème : Briser les limitations. Venez jeûner et prier ensemble pour nos familles et la nation."
    },
    {
      id: "ANN-2",
      title: "Répétition Générale de la Chorale",
      target: "Chorale",
      priority: "normal",
      date: "Samedi 15h00 au Sanctuaire",
      content: "Préparation des cantiques d'actions de grâces pour le culte spécial de dimanche."
    }
  ],

  prayers: [
    {
      id: "PRAY-1",
      author: "Sœur Rebecca M.",
      title: "Guérison divine pour mon fils",
      desc: "Il souffre d'une forte fièvre depuis 3 jours. Prions ensemble pour la grâce restauratrice du Seigneur Jésus.",
      count: 24,
      isConfidential: false,
      date: "Il y a 2h",
      prayedByUser: false
    },
    {
      id: "PRAY-2",
      author: "Frère Marc T.",
      title: "Entretien d'embauche déterminant",
      desc: "Passe un entretien ce jeudi matin pour un poste de chef de projet. Que les portes de bénédiction s'ouvrent.",
      count: 18,
      isConfidential: false,
      date: "Il y a 5h",
      prayedByUser: false
    },
    {
      id: "PRAY-3",
      author: "Membre Anonyme (Fidèle)",
      title: "Restauration de la paix dans mon foyer",
      desc: "Pasteur, besoin urgent de vos conseils et prières en privé face à de lourdes épreuves conjugales.",
      count: 1,
      isConfidential: true,
      date: "Hier à 18h",
      prayedByUser: false
    }
  ],

  media: [
    {
      id: "MED-1",
      type: "audio",
      title: "La fidélité dans les petites choses",
      author: "Pasteur FIDEL ROMARIC",
      duration: "42 min",
      date: "Dimanche 18 Octobre",
      badge: "🎧 Prédication Audio"
    },
    {
      id: "MED-2",
      type: "pdf",
      title: "Guide d'Étude Biblique : Épître aux Éphésiens",
      author: "Département Enseignement",
      duration: "PDF (24 pages)",
      date: "Octobre 2024",
      badge: "📄 Document PDF"
    },
    {
      id: "MED-3",
      type: "video",
      title: "Culte d'Actions de Grâces & Louange",
      author: "Chorale & Pasteur",
      duration: "1h 45 min",
      date: "Dimanche 11 Octobre",
      badge: "🎥 Replay Vidéo"
    }
  ],

  finances: [
    {
      id: "TX-9982",
      donor: "Frère DALLE",
      type: "Dîme",
      method: "Wave",
      amount: "25 000 FCFA",
      status: "Validé",
      date: "Aujourd'hui 08:30"
    },
    {
      id: "TX-9981",
      donor: "Grace Amani",
      type: "Projet Construction",
      method: "Orange Money",
      amount: "50 000 FCFA",
      status: "Validé",
      date: "Hier 16:15"
    },
    {
      id: "TX-9980",
      donor: "Jean-Eudes Bamba",
      type: "Offrande",
      method: "MTN MoMo",
      amount: "5 000 FCFA",
      status: "Validé",
      date: "Hier 11:20"
    }
  ]
};

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  setupViewSwitcher();
  renderMembersTable();
  renderAdminBroadcastHistory();
  renderAdminPastoralPrayers();
  renderAdminFinancesTable();

  renderMobileHomeAnnouncements();
  renderMobilePrayers();
  renderMobileMedia('all');
  renderMobileAnnouncements();

  setupModalTriggers();
});

/* ========================================================
   1. GESTION DES MODES D'AFFICHAGE DU WORKSPACE
   ======================================================== */
function setupViewSwitcher() {
  const workspace = document.getElementById("workspace");
  const btnSplit = document.getElementById("btn-view-split");
  const btnMobile = document.getElementById("btn-view-mobile");
  const btnAdmin = document.getElementById("btn-view-admin");

  const setViewMode = (mode, activeBtn) => {
    workspace.className = `presentation-workspace mode-${mode}`;
    [btnSplit, btnMobile, btnAdmin].forEach(b => b.classList.remove("active"));
    activeBtn.classList.add("active");
  };

  btnSplit.addEventListener("click", () => setViewMode("split", btnSplit));
  btnMobile.addEventListener("click", () => setViewMode("mobile", btnMobile));
  btnAdmin.addEventListener("click", () => setViewMode("admin", btnAdmin));
}

/* ========================================================
   2. APPLICATION MOBILE : NAVIGATION ET INTERACTIONS
   ======================================================== */
function switchMobileTab(tabKey) {
  // Masquer tous les onglets
  const allPanes = document.querySelectorAll(".mobile-tab-pane");
  allPanes.forEach(pane => pane.classList.remove("active"));

  // Afficher l'onglet sélectionné
  const targetPane = document.getElementById(`mobile-tab-${tabKey}`);
  if (targetPane) {
    targetPane.classList.add("active");
  }

  // Mettre à jour la barre de navigation basse
  const allNavBtns = document.querySelectorAll(".nav-tab-btn");
  allNavBtns.forEach(btn => {
    if (btn.getAttribute("data-tab") === tabKey) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Scroll to top of phone screen
  const container = document.querySelector(".mobile-app-content");
  if (container) container.scrollTop = 0;
}

// Rendu des annonces sur l'accueil mobile
function renderMobileHomeAnnouncements() {
  const container = document.getElementById("mobile-home-announcements-list");
  if (!container) return;

  const latest = AppData.announcements.slice(0, 2);
  container.innerHTML = latest.map(ann => `
    <div class="mini-announcement-card" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:10px; margin-bottom:8px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
        <span style="font-size:0.68rem; font-weight:700; color:${ann.priority === 'urgent' ? '#ef4444' : '#6366f1'}; background:${ann.priority === 'urgent' ? '#fee2e2' : '#ede9fe'}; padding:2px 6px; border-radius:4px;">
          ${ann.priority === 'urgent' ? '🔴 Urgente' : '📢 Officiel'}
        </span>
        <span style="font-size:0.68rem; color:#94a3b8;">${ann.target}</span>
      </div>
      <h6 style="font-size:0.82rem; font-weight:700; margin-bottom:2px; color:#0f172a;">${ann.title}</h6>
      <p style="font-size:0.75rem; color:#64748b; line-height:1.3;">${ann.content.substring(0, 75)}...</p>
    </div>
  `).join("");
}

// Rendu des prières dans l'onglet Prières
function renderMobilePrayers() {
  const container = document.getElementById("mobile-prayers-container");
  if (!container) return;

  // Filtrer les prières publiques
  const publicPrayers = AppData.prayers.filter(p => !p.isConfidential);

  container.innerHTML = publicPrayers.map(p => `
    <div class="prayer-card" id="prayer-card-${p.id}">
      <div class="prayer-card-header">
        <span class="prayer-author">${p.author}</span>
        <span class="prayer-time">${p.date}</span>
      </div>
      <div class="prayer-card-body">
        <h5>${p.title}</h5>
        <p>${p.desc}</p>
      </div>
      <div class="prayer-card-footer">
        <button class="btn-amen-counter ${p.prayedByUser ? 'prayed' : ''}" onclick="togglePrayForSubject('${p.id}')">
          <span>🙏</span>
          <span id="amen-count-${p.id}">${p.count} personnes ont prié</span>
        </button>
        <span style="font-size:0.7rem; color:#6366f1; font-weight:600;">En communion</span>
      </div>
    </div>
  `).join("");
}

// Action : cliquer sur "J'ai prié pour ce sujet"
function togglePrayForSubject(id) {
  const item = AppData.prayers.find(p => p.id === id);
  if (!item) return;

  item.prayedByUser = !item.prayedByUser;
  item.count += item.prayedByUser ? 1 : -1;

  const countElem = document.getElementById(`amen-count-${id}`);
  const card = document.getElementById(`prayer-card-${id}`);
  const btn = card.querySelector(".btn-amen-counter");

  if (countElem) {
    countElem.textContent = `${item.count} personnes ont prié`;
  }
  if (btn) {
    btn.classList.toggle("prayed", item.prayedByUser);
  }

  showToast("Gloire à Dieu", `Vous êtes entré en intercession pour : « ${item.title} »`);
}

// Médias & Enseignements
function filterMedia(type, btnElement) {
  if (btnElement) {
    const parent = btnElement.parentElement;
    parent.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
    btnElement.classList.add("active");
  }
  renderMobileMedia(type);
}

function renderMobileMedia(filter) {
  const container = document.getElementById("mobile-media-container");
  if (!container) return;

  const filtered = filter === 'all' ? AppData.media : AppData.media.filter(m => m.type === filter);

  container.innerHTML = filtered.map(m => `
    <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:12px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <span style="font-size:0.68rem; font-weight:700; color:#312e81; background:#e0e7ff; padding:2px 8px; border-radius:10px;">${m.badge}</span>
        <h5 style="font-size:0.85rem; font-weight:700; margin:4px 0 2px;">${m.title}</h5>
        <span style="font-size:0.72rem; color:#64748b;">${m.author} • ${m.duration}</span>
      </div>
      <button style="background:#f1f5f9; border:none; padding:8px 12px; border-radius:8px; font-size:0.75rem; font-weight:700; color:#1e1b4b; cursor:pointer;" onclick="playMediaDemo('${m.title}')">
        Ouvrir
      </button>
    </div>
  `).join("");
}

function playMediaDemo(title) {
  showToast("Lecture de l'enseignement", `Ouverture de : « ${title} »`);
}

// Rendu des Annonces complètes
function renderMobileAnnouncements() {
  const container = document.getElementById("mobile-announcements-container");
  if (!container) return;

  container.innerHTML = AppData.announcements.map(ann => `
    <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:14px; margin-bottom:12px;">
      <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
        <span style="font-size:0.7rem; font-weight:700; color:${ann.priority === 'urgent' ? '#dc2626' : '#4f46e5'};">
          ${ann.priority === 'urgent' ? '🔴 ALERTE OFFICIELLE' : '📢 ANNONCE PAROISSIALE'}
        </span>
        <span style="font-size:0.72rem; color:#94a3b8;">${ann.date}</span>
      </div>
      <h4 style="font-size:0.95rem; font-weight:800; margin-bottom:6px; color:#0f172a;">${ann.title}</h4>
      <p style="font-size:0.8rem; color:#475569; line-height:1.4;">${ann.content}</p>
      <div style="margin-top:10px; padding-top:8px; border-top:1px solid #f1f5f9; font-size:0.72rem; color:#64748b;">
        Destiné à : <strong>${ann.target}</strong>
      </div>
    </div>
  `).join("");
}

/* ========================================================
   3. SIMULATEUR DE DONS (MOBILE MONEY & CARTE)
   ======================================================== */
let selectedDonationType = "Dîme";

function selectDonationType(type, btn) {
  selectedDonationType = type;
  document.querySelectorAll(".donation-type-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function setDonationAmount(val, btn) {
  document.getElementById("custom-donation-amount").value = val;
  document.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function executeMobileDonation() {
  const amountInput = document.getElementById("custom-donation-amount");
  const amount = parseInt(amountInput.value) || 5000;
  const payMethodInput = document.querySelector("input[name='paymethod']:checked");
  const method = payMethodInput ? payMethodInput.value : "Wave";
  const ref = `TX-${Math.floor(10000 + Math.random() * 90000)}-${method.substring(0, 2).toUpperCase()}`;

  // Affichage du modal Reçu
  document.getElementById("receipt-donor").textContent = "Frère DALLE";
  document.getElementById("receipt-type").textContent = selectedDonationType;
  document.getElementById("receipt-method").textContent = method;
  document.getElementById("receipt-ref").textContent = ref;
  document.getElementById("receipt-amount").textContent = `${amount.toLocaleString()} FCFA`;

  // Mettre à jour la base financière
  AppData.finances.unshift({
    id: ref,
    donor: "Frère DALLE",
    type: selectedDonationType,
    method: method,
    amount: `${amount.toLocaleString()} FCFA`,
    status: "Validé",
    date: "À l'instant"
  });

  renderAdminFinancesTable();

  // Ouvrir le reçu
  openModal("modal-donation-receipt");

  // Déclencher notification globale
  showToast("Paiement validé avec succès", `${amount.toLocaleString()} FCFA versés par ${method} pour : ${selectedDonationType}`);
}

/* ========================================================
   4. DASHBOARD DU PASTEUR & ADMINISTRATION
   ======================================================== */
function switchAdminTab(tabKey) {
  document.querySelectorAll(".admin-tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".admin-content-pane").forEach(p => p.classList.remove("active"));

  event.currentTarget.classList.add("active");
  const target = document.getElementById(`admin-tab-${tabKey}`);
  if (target) target.classList.add("active");
}

function renderMembersTable() {
  const tbody = document.getElementById("members-table-body");
  if (!tbody) return;

  tbody.innerHTML = AppData.members.map(m => `
    <tr>
      <td>
        <div class="table-member-cell">
          <img src="${m.avatar}" class="table-avatar" alt="Avatar">
          <div>
            <div class="table-member-name">${m.name}</div>
            <small style="font-size:0.7rem; color:#94a3b8;">${m.id}</small>
          </div>
        </div>
      </td>
      <td><strong>${m.phone}</strong></td>
      <td><span class="dept-badge">${m.dept}</span></td>
      <td><span class="status-badge-ok">${m.status}</span></td>
      <td>${m.joined}</td>
      <td>
        <button style="background:none; border:none; color:#4338ca; font-weight:700; cursor:pointer; font-size:0.78rem;" onclick="showMemberProfile('${m.id}')">
          Voir fiche
        </button>
      </td>
    </tr>
  `).join("");

  // Compteurs
  const badgeCount = document.getElementById("admin-members-count");
  if (badgeCount) badgeCount.textContent = AppData.members.length;
}

function filterMembersTable() {
  const query = document.getElementById("member-search-input").value.toLowerCase();
  const deptFilter = document.getElementById("department-filter").value;
  const tbody = document.getElementById("members-table-body");

  const filtered = AppData.members.filter(m => {
    const matchQuery = m.name.toLowerCase().includes(query) || m.phone.includes(query) || m.dept.toLowerCase().includes(query);
    const matchDept = deptFilter === "all" || m.dept === deptFilter;
    return matchQuery && matchDept;
  });

  tbody.innerHTML = filtered.map(m => `
    <tr>
      <td>
        <div class="table-member-cell">
          <img src="${m.avatar}" class="table-avatar" alt="Avatar">
          <div>
            <div class="table-member-name">${m.name}</div>
            <small style="font-size:0.7rem; color:#94a3b8;">${m.id}</small>
          </div>
        </div>
      </td>
      <td><strong>${m.phone}</strong></td>
      <td><span class="dept-badge">${m.dept}</span></td>
      <td><span class="status-badge-ok">${m.status}</span></td>
      <td>${m.joined}</td>
      <td>
        <button style="background:none; border:none; color:#4338ca; font-weight:700; cursor:pointer; font-size:0.78rem;" onclick="showMemberProfile('${m.id}')">
          Voir fiche
        </button>
      </td>
    </tr>
  `).join("");
}

function showMemberProfile(id) {
  const m = AppData.members.find(x => x.id === id);
  if (m) {
    showToast(`Fiche Membre ${m.id}`, `${m.name} • ${m.dept} • Tél: ${m.phone}`);
  }
}

// Ajout d'un nouveau membre (Secrétariat)
function handleAddNewMember(event) {
  event.preventDefault();
  const lastname = document.getElementById("new-member-lastname").value.trim();
  const firstname = document.getElementById("new-member-firstname").value.trim();
  const phone = document.getElementById("new-member-phone").value.trim();
  const dept = document.getElementById("new-member-dept").value;

  const newId = `MEM-00${AppData.members.length + 1}`;
  const newMember = {
    id: newId,
    name: `${firstname} ${lastname}`,
    phone: phone,
    dept: dept,
    status: "Nouveau Membre",
    joined: "À l'instant",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
  };

  AppData.members.unshift(newMember);
  renderMembersTable();
  closeModal("modal-add-member");

  // Mise à jour KPI
  const kpiTotal = document.getElementById("kpi-total-members");
  if (kpiTotal) kpiTotal.textContent = (542 + AppData.members.length - 4).toString();

  showToast("Nouveau membre enregistré", `${firstname} ${lastname} a été ajouté au registre officiel avec l'ID ${newId}`);
  event.target.reset();
}

// Diffusion d'une annonce & notification PUSH en temps réel
function handleSendBroadcast(event) {
  event.preventDefault();
  const title = document.getElementById("broadcast-title").value.trim();
  const target = document.getElementById("broadcast-target").value;
  const priority = document.getElementById("broadcast-priority").value;
  const message = document.getElementById("broadcast-message").value.trim();

  const newAnn = {
    id: `ANN-${AppData.announcements.length + 1}`,
    title: title,
    target: target,
    priority: priority,
    date: "À l'instant",
    content: message
  };

  AppData.announcements.unshift(newAnn);

  // Mettre à jour l'historique admin
  renderAdminBroadcastHistory();

  // Mettre à jour l'application mobile en direct
  renderMobileHomeAnnouncements();
  renderMobileAnnouncements();

  // DÉCLENCHER LA NOTIFICATION PUSH FLOTTANTE SUR LE SMARTPHONE !
  triggerMobilePushBanner(title, message);

  // Déclencher le toast système
  showToast("Notification Push Envoyée", `Diffusé à "${target}" : ${title}`);

  event.target.reset();
}

function triggerMobilePushBanner(title, message) {
  const banner = document.getElementById("mobile-push-banner");
  const bannerText = document.getElementById("push-banner-text");

  bannerText.innerHTML = `<strong>${title}</strong> : ${message.substring(0, 50)}...`;
  banner.classList.remove("hidden");

  // Jouer un son subtil (bip simulé audio context web)
  playNotificationSound();

  // Faire clignoter l'onglet Annonces du smartphone
  const annTabBtn = document.querySelector(".nav-tab-btn[data-tab='announcements']");
  if (annTabBtn) {
    annTabBtn.style.animation = "pulseGlow 1s 3";
  }

  // Masquer la bannière après 6 secondes
  setTimeout(() => {
    banner.classList.add("hidden");
  }, 6000);
}

function playNotificationSound() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
    osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.35);
  } catch (e) {
    // Navigateur bloque l'audio sans interaction
  }
}

function renderAdminBroadcastHistory() {
  const container = document.getElementById("admin-broadcast-history");
  if (!container) return;

  container.innerHTML = AppData.announcements.map(ann => `
    <div class="history-card">
      <div class="history-card-header">
        <span style="font-weight:700; color:${ann.priority === 'urgent' ? '#ef4444' : '#6366f1'};">${ann.target}</span>
        <span>${ann.date}</span>
      </div>
      <h5>${ann.title}</h5>
      <p>${ann.content}</p>
    </div>
  `).join("");
}

// Suivi pastoral & Prières dans l'admin
function renderAdminPastoralPrayers() {
  const container = document.getElementById("admin-prayers-container");
  if (!container) return;

  container.innerHTML = AppData.prayers.map(p => `
    <div class="pastoral-prayer-card ${p.isConfidential ? 'confidential' : ''}">
      <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
        <span style="font-weight:800; font-size:0.82rem; color:#0f172a;">${p.author}</span>
        ${p.isConfidential ? '<span class="confidential-tag">🔒 CONFIDENTIEL PASTORAL</span>' : '<span style="font-size:0.7rem; color:#10b981; font-weight:700;">Public communauté</span>'}
      </div>
      <h5 style="font-size:0.88rem; font-weight:700; margin-bottom:4px;">${p.title}</h5>
      <p style="font-size:0.8rem; color:#475569; margin-bottom:8px; line-height:1.35;">${p.desc}</p>
      <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #f1f5f9; padding-top:6px; font-size:0.72rem;">
        <span style="color:#64748b;">${p.date} • ${p.count} intercessions</span>
        <button style="background:#f1f5f9; border:none; padding:4px 8px; border-radius:4px; font-weight:700; color:#312e81; cursor:pointer;" onclick="showToast('Suivi Pastoral', 'Message d’encouragement envoyé à ${p.author}')">
          📞 Contacter / Prier
        </button>
      </div>
    </div>
  `).join("");
}

// Tableau des finances
function renderAdminFinancesTable() {
  const tbody = document.getElementById("admin-finances-table-body");
  if (!tbody) return;

  tbody.innerHTML = AppData.finances.map(f => `
    <tr>
      <td><code>${f.id}</code></td>
      <td><strong>${f.donor}</strong></td>
      <td>${f.type}</td>
      <td><span class="dept-badge">${f.method}</span></td>
      <td><strong style="color:#10b981;">${f.amount}</strong></td>
      <td><span class="status-badge-ok">${f.status}</span></td>
      <td>${f.date}</td>
    </tr>
  `).join("");
}

/* ========================================================
   5. NOUVELLE REQUÊTE DE PRIÈRE (PAR LE MEMBRE)
   ======================================================== */
function handleAddNewPrayer(event) {
  event.preventDefault();
  const title = document.getElementById("new-prayer-title").value.trim();
  const desc = document.getElementById("new-prayer-desc").value.trim();
  const isConfidential = document.getElementById("new-prayer-confidential").checked;

  const newPrayer = {
    id: `PRAY-${AppData.prayers.length + 1}`,
    author: "Frère DALLE",
    title: title,
    desc: desc,
    count: 1,
    isConfidential: isConfidential,
    date: "À l'instant",
    prayedByUser: true
  };

  AppData.prayers.unshift(newPrayer);
  closeModal("modal-new-prayer");

  // Rendu
  renderMobilePrayers();
  renderAdminPastoralPrayers();

  if (isConfidential) {
    showToast("Requête confidentielle déposée", "Votre sujet a été transmis exclusivement au bureau du Pasteur Principal.");
  } else {
    showToast("Requête publiée sur le mur", "L'assemblée a été notifiée pour vous soutenir dans la prière.");
  }

  event.target.reset();
}

/* ========================================================
   6. SALON AUDIO DE PRIÈRE (SIMULATION JITSI / WEBRTC)
   ======================================================== */
let isMicActive = false;

function openPrayerRoomModal() {
  openModal("modal-prayer-room");
}

function toggleMicDemo() {
  isMicActive = !isMicActive;
  const label = document.getElementById("mic-label");
  const icon = document.getElementById("mic-icon");
  const btn = document.getElementById("btn-toggle-mic");

  if (isMicActive) {
    label.textContent = "Couper mon micro";
    icon.textContent = "🎙️";
    btn.style.background = "#10b981";
    showToast("Micro activé", "Vous pouvez maintenant intervenir dans la salle de prière.");
  } else {
    label.textContent = "Activer mon micro";
    icon.textContent = "🔇";
    btn.style.background = "#334155";
    showToast("Micro coupé", "Vous êtes en mode écoute.");
  }
}

function sendAmenReaction() {
  showToast("🙌 Amen partagé !", "Votre acclamation retentit dans la salle de prière.");
}

function openLiveModal() {
  openModal("modal-live-stream");
}

function handleSendLiveChatMessage(event) {
  event.preventDefault();
  const input = document.getElementById("live-chat-input");
  const text = input.value.trim();
  if (!text) return;

  const chatScroll = document.getElementById("live-chat-scroll");
  if (chatScroll) {
    const row = document.createElement("div");
    row.className = "chat-msg-row";
    row.innerHTML = `<strong class="chat-msg-author gold">Vous (Frère DALLE) :</strong> ${text}`;
    chatScroll.appendChild(row);
    chatScroll.scrollTop = chatScroll.scrollHeight;
  }
  input.value = "";
  showToast("Message diffusé", "Votre message est visible par les 348 fidèles connectés en direct.");
}

function sendLiveStreamReaction(reaction) {
  const chatScroll = document.getElementById("live-chat-scroll");
  if (chatScroll) {
    const row = document.createElement("div");
    row.className = "chat-msg-row";
    row.innerHTML = `<strong class="chat-msg-author gold">Vous (Frère DALLE) :</strong> ${reaction}`;
    chatScroll.appendChild(row);
    chatScroll.scrollTop = chatScroll.scrollHeight;
  }
  showToast("Réaction envoyée !", reaction);
}

/* ========================================================
   MESSAGERIE & GROUPES (PHASE 2)
   ======================================================== */
const channelData = {
  chorale: {
    title: "🎵 Chorale & Louange CCPE",
    sub: "48 membres • Répétition ce samedi",
    messages: [
      { sender: "Chef de Chœur Emmanuel", text: "Bien-aimés, n'oubliez pas notre répétition générale ce samedi à 15h00 au Sanctuaire.", time: "10:14", received: true },
      { sender: "Sœur Grace", text: "Parfait frère Emmanuel ! Nous répéterons aussi le cantique d'action de grâce.", time: "10:18", received: true },
      { sender: "Vous (Frère DALLE)", text: "Je serai présent à 14h45 pour installer les micros.", time: "10:22", received: false }
    ]
  },
  jeunesse: {
    title: "⚡ Jeunesse Connectée CCPE",
    sub: "112 membres • Mission & Réveil",
    messages: [
      { sender: "Responsable Jeunesse Paul", text: "Shalom la jeunesse ! Rendez-vous ce samedi à 10h pour l'évangélisation à Angré.", time: "09:00", received: true },
      { sender: "Sœur Déborah", text: "Présente avec les flyers imprimés par le secrétariat !", time: "09:12", received: true },
      { sender: "Frère Marc", text: "Gloire à Dieu, on sera au moins 35 jeunes mobilisés !", time: "09:30", received: true }
    ]
  },
  anciens: {
    title: "🏛️ Conseil des Anciens & Diaconat",
    sub: "14 membres • Direction Pastorale",
    messages: [
      { sender: "Pasteur FIDEL ROMARIC", text: "Chers serviteurs de Dieu, réunion d'évaluation mensuelle mardi soir après le culte.", time: "Hier", received: true },
      { sender: "Ancien Kouassi", text: "Bien reçu Pasteur. L'ordre du jour et le rapport des cellules sont prêts.", time: "Hier", received: true }
    ]
  },
  pastor: {
    title: "⭐ Pasteur FIDEL ROMARIC (Direct)",
    sub: "Ligne Pastorale Privée & Suivi",
    messages: [
      { sender: "Pasteur FIDEL ROMARIC", text: "La paix du Seigneur soit avec toi Frère DALLE. Que Sa grâce continue d'abonder sur ta famille.", time: "08:15", received: true },
      { sender: "Vous (Frère DALLE)", text: "Amen Pasteur ! Merci pour vos prières fidèles et vos conseils paternels.", time: "08:30", received: false }
    ]
  }
};

let currentChannel = "chorale";

function openMessagingModal() {
  openModal("modal-messaging");
}

function switchChatChannel(channelKey, el) {
  currentChannel = channelKey;
  document.querySelectorAll(".channel-item").forEach(item => item.classList.remove("active"));
  if (el) el.classList.add("active");

  const data = channelData[channelKey];
  if (!data) return;

  document.getElementById("active-channel-title").textContent = data.title;
  document.getElementById("active-channel-sub").textContent = data.sub;

  const historyEl = document.getElementById("channel-messages-history");
  if (!historyEl) return;

  historyEl.innerHTML = data.messages.map(m => `
    <div class="chat-bubble ${m.received ? 'received' : 'sent'}">
      <span class="chat-bubble-sender">${m.sender}</span>
      ${m.text}
      <span class="chat-bubble-time">${m.time}</span>
    </div>
  `).join("");

  historyEl.scrollTop = historyEl.scrollHeight;
}

function handleSendChannelMessage(event) {
  event.preventDefault();
  const input = document.getElementById("channel-message-input");
  const text = input.value.trim();
  if (!text) return;

  const historyEl = document.getElementById("channel-messages-history");
  if (historyEl) {
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble sent";
    bubble.innerHTML = `
      <span class="chat-bubble-sender">Vous (Frère DALLE)</span>
      ${text}
      <span class="chat-bubble-time">À l'instant</span>
    `;
    historyEl.appendChild(bubble);
    historyEl.scrollTop = historyEl.scrollHeight;
  }

  // Stocker dans channelData
  if (channelData[currentChannel]) {
    channelData[currentChannel].messages.push({
      sender: "Vous (Frère DALLE)",
      text: text,
      time: "À l'instant",
      received: false
    });
  }

  input.value = "";
  showToast("Message envoyé", "Votre message a été transmis instantanément au groupe.");
}

/* ========================================================
   CALENDRIER & ÉVÉNEMENTS (PHASE 2)
   ======================================================== */
const participatingEvents = {};

function openEventsCalendarModal() {
  openModal("modal-events-calendar");
}

function toggleEventParticipation(id) {
  const isPart = participatingEvents[id] = !participatingEvents[id];
  const btn = document.getElementById(`btn-event-${id}`);
  const cnt = document.getElementById(`event-cnt-${id}`);

  let currentCount = parseInt(cnt.textContent) || 0;
  if (isPart) {
    currentCount++;
    btn.classList.add("participating");
    btn.textContent = "✓ Inscrit (Rappel activé)";
    showToast("Inscription confirmée !", "Rappel programmé 24h avant l'événement sur votre téléphone.");
  } else {
    currentCount = Math.max(0, currentCount - 1);
    btn.classList.remove("participating");
    btn.textContent = "Je participe";
    showToast("Inscription annulée", "Vous avez retiré votre confirmation.");
  }
  cnt.textContent = currentCount;
}

/* ========================================================
   GALERIE MULTIMÉDIA (PHASE 2)
   ======================================================== */
function openGalleryModal() {
  openModal("modal-gallery");
}

function filterGalleryAlbum(albumKey, el) {
  document.querySelectorAll(".gallery-albums-tabs .pill").forEach(p => p.classList.remove("active"));
  if (el) el.classList.add("active");
  const items = document.querySelectorAll("#gallery-photos-container .gallery-photo-item");
  let count = 0;
  items.forEach(item => {
    if (albumKey === "all" || item.getAttribute("data-category") === albumKey) {
      item.style.display = "block";
      count++;
    } else {
      item.style.display = "none";
    }
  });
  showToast("Galerie Cultes CCPE", `Filtre activé : ${el ? el.textContent : albumKey} (${count} photo${count > 1 ? 's' : ''})`);
}

function previewGalleryPhoto(el) {
  const img = el.querySelector("img");
  const caption = el.querySelector(".gallery-photo-caption")?.textContent || "Photo officielle Culte CCPE";
  if (img) {
    const fullImg = document.getElementById("lightbox-full-img");
    const fullCaption = document.getElementById("lightbox-full-caption");
    if (fullImg) fullImg.src = img.src;
    if (fullCaption) fullCaption.textContent = caption;
    openModal("modal-gallery-lightbox");
    showToast("Agrandissement Photo HD", caption);
  }
}


/* ========================================================
   VISIOCONFÉRENCE WEBRTC (PHASE 3)
   ======================================================== */
let isCallMicMuted = false;
let isCallCamOff = false;

function openVideoCallModal() {
  openModal("modal-video-call");
  showToast("Appel Vidéo Établi", "Connexion chiffrée WebRTC avec Pasteur FIDEL ROMARIC et les participants.");
}

function toggleCallMic() {
  isCallMicMuted = !isCallMicMuted;
  const btn = document.getElementById("btn-call-mic");
  if (isCallMicMuted) {
    btn.textContent = "🔇";
    btn.style.background = "#ef4444";
    showToast("Micro coupé", "Votre micro est désactivé.");
  } else {
    btn.textContent = "🎙️";
    btn.style.background = "#334155";
    showToast("Micro actif", "Le Pasteur vous entend distinctement.");
  }
}

function toggleCallCam() {
  isCallCamOff = !isCallCamOff;
  const btn = document.getElementById("btn-call-cam");
  if (isCallCamOff) {
    btn.textContent = "🚫";
    btn.style.background = "#ef4444";
    showToast("Caméra coupée", "Votre flux vidéo est en pause.");
  } else {
    btn.textContent = "📹";
    btn.style.background = "#334155";
    showToast("Caméra active", "Flux vidéo HD rétabli.");
  }
}

/* ========================================================
   ASSISTANT IA PASTORAL & SPIRITUEL (PHASE 3)
   ======================================================== */
function openAIAssistantModal() {
  openModal("modal-ai-assistant");
}

const aiResponsesDatabase = {
  paix: "« Ne vous inquiétez de rien; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces. Et la paix de Dieu, qui surpasse toute intelligence, gardera vos cœurs et vos pensées en Jésus-Christ. » (Philippiens 4:6-7) — Sois fortifié, le Seigneur combat pour toi !",
  dime: "Pour régler votre dîme ou offrande en toute sécurité : rendez-vous dans l'onglet 'Dons' de l'application, choisissez le montant et payez directement par Wave, Orange Money ou MTN. Un reçu officiel est délivré instantanément !",
  theme: "Le thème majeur enseigné actuellement par le Pasteur FIDEL ROMARIC est : « Entrer dans sa saison de grâce & d'élévation ». Les replays audio et PDF sont disponibles dans l'onglet Enseignements.",
  priere: "L'apôtre Paul nous exhorte : « Priez sans cesse, rendez grâces en toutes choses, car c'est à votre égard la volonté de Dieu en Jésus-Christ. » (1 Th 5:17-18). Tu peux déposer ton sujet sur le Mur d'Intercession pour que toute l'église prie avec toi !",
  default: "Gloire à Dieu ! « Ta parole est une lampe à mes pieds, et une lumière sur mon sentier. » (Psaume 119:105). Le Pasteur FIDEL ROMARIC et l'équipe pastorale CCPE restent à votre écoute pour vous accompagner dans votre croissance spirituelle."
};

function getAIAnswer(query) {
  const q = query.toLowerCase();
  if (q.includes("paix") || q.includes("peur") || q.includes("tristesse") || q.includes("épreuve")) return aiResponsesDatabase.paix;
  if (q.includes("dîme") || q.includes("dime") || q.includes("offrande") || q.includes("argent") || q.includes("wave")) return aiResponsesDatabase.dime;
  if (q.includes("thème") || q.includes("theme") || q.includes("prédication") || q.includes("culte") || q.includes("pasteur")) return aiResponsesDatabase.theme;
  if (q.includes("prière") || q.includes("prier") || q.includes("intercession")) return aiResponsesDatabase.priere;
  return aiResponsesDatabase.default;
}

function askMobileAI(question) {
  document.getElementById("mobile-ai-input").value = question;
  triggerMobileAISend(question);
}

function handleMobileAISubmit(event) {
  event.preventDefault();
  const input = document.getElementById("mobile-ai-input");
  const text = input.value.trim();
  if (!text) return;
  triggerMobileAISend(text);
  input.value = "";
}

function triggerMobileAISend(questionText) {
  const container = document.getElementById("mobile-ai-chat-messages");
  if (!container) return;

  // Bulle utilisateur
  const userMsg = document.createElement("div");
  userMsg.className = "ai-msg user";
  userMsg.textContent = questionText;
  container.appendChild(userMsg);
  container.scrollTop = container.scrollHeight;

  // Réponse IA après courte latence
  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.className = "ai-msg bot";
    botMsg.textContent = getAIAnswer(questionText);
    container.appendChild(botMsg);
    container.scrollTop = container.scrollHeight;
  }, 400);
}

function askAdminAI(question) {
  document.getElementById("admin-ai-input").value = question;
  triggerAdminAISend(question);
}

function handleAdminAISubmit(event) {
  event.preventDefault();
  const input = document.getElementById("admin-ai-input");
  const text = input.value.trim();
  if (!text) return;
  triggerAdminAISend(text);
  input.value = "";
}

function triggerAdminAISend(questionText) {
  const container = document.getElementById("admin-ai-messages-list");
  if (!container) return;

  const userMsg = document.createElement("div");
  userMsg.className = "ai-msg user";
  userMsg.textContent = questionText;
  container.appendChild(userMsg);
  container.scrollTop = container.scrollHeight;

  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.className = "ai-msg bot";

    if (questionText.toLowerCase().includes("plan") || questionText.toLowerCase().includes("prédication")) {
      botMsg.innerHTML = `
        <strong>📖 Proposition d'Esquisse Homilétique pour le Pasteur FIDEL :</strong><br>
        <strong>Thème :</strong> Triompher au milieu des tempêtes (Marc 4:35-41)<br>
        <strong>I. La Présence dans la barque :</strong> Même quand Jésus dort, Il règne.<br>
        <strong>II. L'épreuve de la foi :</strong> La tempête révèle notre confiance en la Parole.<br>
        <strong>III. L'autorité de la Parole :</strong> « Silence, tais-toi ! » — Activer l'onction d'autorité.<br>
        <em>Versets complémentaires : Ésaïe 43:2, Romains 8:37.</em>
      `;
    } else if (questionText.toLowerCase().includes("analyse") || questionText.toLowerCase().includes("besoin")) {
      botMsg.innerHTML = `
        <strong>📊 Analyse Synthétique des Requêtes CCPE (Mois en cours) :</strong><br>
        • <strong>42% Santé & Guérison divine</strong> (besoin d'un temps d'imposition des mains)<br>
        • <strong>28% Travail & Déblocage financier</strong> (orientation vers le séminaire entrepreneuriat)<br>
        • <strong>18% Restauration des couples & familles</strong> (demandes confidentielles)<br>
        • <strong>12% Sanctification & délivrance spirituelle</strong>
      `;
    } else {
      botMsg.textContent = `Pasteur FIDEL, voici la réflexion théologique suggérée : « Tout ce que vous demanderez avec foi par la prière, vous le recevrez » (Matthieu 21:22). Les données de l'église confirment une grande soif spirituelle de la jeunesse. Je reste prêt à générer d'autres analyses.`;
    }

    container.appendChild(botMsg);
    container.scrollTop = container.scrollHeight;
  }, 450);
}

/* ========================================================
   RÉSEAU MULTI-PAROISSES (PHASE 3)
   ======================================================== */
const parishNetworkData = {
  all: { name: "Toutes les Paroisses CCPE (Vue Consolidée)", members: "1 840", prayers: "48", funds: "4 850 000 F", presence: "1 520", retention: "88.2%" },
  siege: { name: "Paroisse Siège (Cocody Angré)", members: "542", prayers: "18", funds: "1 485 000 F", presence: "520", retention: "84.5%" },
  yopougon: { name: "Paroisse Yopougon", members: "380", prayers: "12", funds: "890 000 F", presence: "340", retention: "81.0%" },
  bouake: { name: "Mission Régionale Bouaké", members: "210", prayers: "9", funds: "420 000 F", presence: "185", retention: "79.2%" },
  diaspora: { name: "Assemblée Diaspora (Paris / Montréal)", members: "125", prayers: "9", funds: "2 055 000 F", presence: "115", retention: "92.0%" }
};

function switchParishNetwork(parishKey) {
  const p = parishNetworkData[parishKey] || parishNetworkData.siege;

  const kpiMembers = document.getElementById("kpi-total-members");
  const kpiPrayers = document.getElementById("kpi-total-prayers");
  const kpiFunds = document.getElementById("kpi-total-funds");
  const anPresence = document.getElementById("an-presence");
  const anRetention = document.getElementById("an-retention");

  if (kpiMembers) kpiMembers.textContent = p.members;
  if (kpiPrayers) kpiPrayers.textContent = p.prayers;
  if (kpiFunds) kpiFunds.textContent = p.funds;
  if (anPresence) anPresence.textContent = p.presence;
  if (anRetention) anRetention.textContent = p.retention;

  showToast("🌐 Réseau Multi-Paroisses", `Filtrage actif : ${p.name}`);
}

/* ========================================================
   7. LECTEUR AUDIO DÉMO
   ======================================================== */
let isAudioPlaying = false;
let audioTimer = null;

function toggleAudioDemo() {
  isAudioPlaying = !isAudioPlaying;
  const icon = document.getElementById("audio-play-icon");
  const bar = document.getElementById("audio-progress-bar");

  if (isAudioPlaying) {
    icon.textContent = "⏸";
    showToast("🎧 Prédication en cours", "« La fidélité dans les petites choses » - Pasteur FIDEL ROMARIC");
    let progress = 25;
    audioTimer = setInterval(() => {
      progress = (progress + 2) % 100;
      bar.style.width = `${progress}%`;
    }, 1000);
  } else {
    icon.textContent = "▶";
    clearInterval(audioTimer);
  }
}

/* ========================================================
   8. GESTIONNAIRE DE MODALS & TOAST
   ======================================================== */
function setupModalTriggers() {
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      e.target.classList.add("hidden");
    }
  });
}

function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove("hidden");
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add("hidden");
}

function openAddMemberModal() {
  openModal("modal-add-member");
}

function openNewPrayerModal() {
  openModal("modal-new-prayer");
}

function openPastorProfileModal() {
  openModal("modal-pastor-profile");
}

let toastTimer = null;
function showToast(title, message) {
  const toast = document.getElementById("system-toast");
  const titleEl = document.getElementById("toast-title");
  const msgEl = document.getElementById("toast-message");

  titleEl.textContent = title;
  msgEl.textContent = message;

  toast.classList.remove("hidden");
  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 4500);
}

function closeToast() {
  document.getElementById("system-toast").classList.add("hidden");
}
