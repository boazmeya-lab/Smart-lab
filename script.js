let currentType = "url";
let selectedModelIsPaid = false;

// Presets de styles pour les modèles
const presets = {
  classic: { color: "#000000", bg: "#ffffff", type: "square" },
  rounded: { color: "#111111", bg: "#ffffff", type: "rounded" },
  dots: { color: "#000000", bg: "#ffffff", type: "dots" },
  ocean: { color: "#0066ff", bg: "#f0f7ff", type: "rounded" },
  sunset: { color: "#ff4500", bg: "#fff5f0", type: "dots" },
  neon: { color: "#00ff66", bg: "#0d0d0d", type: "dots" },
  glass: { color: "#1a202c", bg: "#e0e6ed", type: "rounded" },
  signature: { color: "#ff9900", bg: "#1a1a1a", type: "square" }
};

// Initialisation du QR Code
const qrCode = new QRCodeStyling({
  width: 220,
  height: 220,
  type: "svg",
  data: "https://votre-site.com",
  dotsOptions: presets.classic,
  backgroundOptions: { color: presets.classic.bg }
});

qrCode.append(document.getElementById("canvas-container"));

// 1. GESTION DES TYPES (Lien, Wi-Fi, SMS, Texte)
const formContainer = document.getElementById("form-container");

function renderForm(type) {
  if (type === "url") {
    formContainer.innerHTML = `
      <div class="input-group">
        <label>URL du site web</label>
        <input type="url" id="field-data" placeholder="https://votre-site.com">
      </div>`;
  } else if (type === "wifi") {
    formContainer.innerHTML = `
      <div class="input-group">
        <label>Nom du réseau (SSID)</label>
        <input type="text" id="wifi-ssid" placeholder="Ex: MonWiFi_Home">
        <label>Mot de passe</label>
        <input type="text" id="wifi-pass" placeholder="Mot de passe">
      </div>`;
  } else if (type === "sms") {
    formContainer.innerHTML = `
      <div class="input-group">
        <label>Numéro de téléphone</label>
        <input type="tel" id="sms-phone" placeholder="+33 6 12 34 56 78">
        <label>Message</label>
        <input type="text" id="sms-msg" placeholder="Votre message...">
      </div>`;
  } else if (type === "text") {
    formContainer.innerHTML = `
      <div class="input-group">
        <label>Texte libre</label>
        <textarea id="field-data" rows="3" placeholder="Écrivez votre texte ici..."></textarea>
      </div>`;
  }
  attachEvents();
}

renderForm("url");

// Écoute des boutons de type
document.querySelectorAll(".type-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    document.querySelectorAll(".type-btn").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    currentType = e.target.dataset.type;
    renderForm(currentType);
    updateQRData();
  });
});

// Mettre à jour le texte du QR Code selon le formulaire
function updateQRData() {
  let content = "https://votre-site.com";
  if (currentType === "url" || currentType === "text") {
    const field = document.getElementById("field-data");
    content = field.value || content;
  } else if (currentType === "wifi") {
    const ssid = document.getElementById("wifi-ssid").value;
    const pass = document.getElementById("wifi-pass").value;
    content = `WIFI:S:${ssid};T:WPA;P:${pass};;`;
  } else if (currentType === "sms") {
    const phone = document.getElementById("sms-phone").value;
    const msg = document.getElementById("sms-msg").value;
    content = `SMSTO:${phone}:${msg}`;
  }
  qrCode.update({ data: content });
}

function attachEvents() {
  const inputs = formContainer.querySelectorAll("input, textarea");
  inputs.forEach(input => input.addEventListener("input", updateQRData));
}

// 2. GESTION DES MODÈLES (Gratuits & Payants)
document.querySelectorAll(".model-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".model-card").forEach(c => c.classList.remove("active"));
    card.classList.add("active");

    const presetName = card.dataset.preset;
    const preset = presets[presetName];
    selectedModelIsPaid = card.dataset.paid === "true";

    qrCode.update({
      dotsOptions: { color: preset.color, type: preset.type },
      backgroundOptions: { color: preset.bg }
    });
  });
});

// 3. MODAL DE TÉLÉCHARGEMENT
const modal = document.getElementById("modal-download");
const btnTrigger = document.getElementById("btn-download-trigger");
const btnClose = document.querySelector(".close-modal");
const optionFree = document.getElementById("option-free");
const modalDivider = document.getElementById("modal-divider");
const videoTimer = document.getElementById("video-timer");
const btnFreeDownload = document.getElementById("btn-free-download");
const btnPayDownload = document.getElementById("btn-pay-download");

btnTrigger.addEventListener("click", () => {
  modal.classList.remove("hidden");
  
  // Si le modèle sélectionné est payant, on masque l'option vidéo gratuite
  if (selectedModelIsPaid) {
    optionFree.style.display = "none";
    modalDivider.style.display = "none";
  } else {
    optionFree.style.display = "block";
    modalDivider.style.display = "block";
  }
});

btnClose.addEventListener("click", () => modal.classList.add("hidden"));

// Décompte Pub Video
let timerStarted = false;
document.querySelector(".video-placeholder").addEventListener("click", () => {
  if (timerStarted) return;
  timerStarted = true;
  let timeLeft = 30;

  const interval = setInterval(() => {
    timeLeft--;
    videoTimer.innerText = `⏳ Pub : ${timeLeft}s restantes...`;
    if (timeLeft <= 0) {
      clearInterval(interval);
      videoTimer.innerText = "✅ Pub terminée !";
      btnFreeDownload.disabled = false;
    }
  }, 1000);
});

btnFreeDownload.addEventListener("click", () => {
  qrCode.download({ name: "smart-lab-qrcode", extension: "png" });
  modal.classList.add("hidden");
});

btnPayDownload.addEventListener("click", () => {
  alert("Paiement de $0.99 en cours...");
  qrCode.download({ name: "smart-lab-premium-qrcode", extension: "png" });
  modal.classList.add("hidden");
});
