let currentStep = 1;
let selectedType = "url";
let qrContent = "https://smartech.site";

// Initialisation du QR Code
const qrCode = new QRCodeStyling({
  width: 200,
  height: 200,
  type: "svg",
  data: qrContent,
  dotsOptions: { color: "#00b050", type: "square" },
  backgroundOptions: { color: "#ffffff" }
});

qrCode.append(document.getElementById("canvas-container"));

// Navigation Stepper
function goToStep(step) {
  currentStep = step;
  document.querySelectorAll(".wizard-step").forEach(s => s.classList.remove("active"));
  document.getElementById(`step-${step}`).classList.add("active");

  document.querySelectorAll(".step-item").forEach((item, idx) => {
    if (idx + 1 <= step) item.classList.add("active");
    else item.classList.remove("active");
  });

  if (step === 4) {
    document.getElementById("final-canvas-container").innerHTML = "";
    qrCode.append(document.getElementById("final-canvas-container"));
  }
}

// 1. Sélection du type (Cartes)
document.querySelectorAll(".qr-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".qr-card").forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    selectedType = card.dataset.type;
  });
});

document.getElementById("btn-to-step-2").addEventListener("click", () => {
  renderForm(selectedType);
  goToStep(2);
});

// 2. Formulaire dynamique
function renderForm(type) {
  const container = document.getElementById("dynamic-form");
  if (type === "url") {
    container.innerHTML = `
      <div class="form-group">
        <label>URL du site Web *</label>
        <input type="url" id="input-url" value="https://smartech.site" placeholder="https://votre-site.com">
      </div>`;
  } else if (type === "wifi") {
    container.innerHTML = `
      <div class="form-group">
        <label>Nom du réseau Wi-Fi (SSID) *</label>
        <input type="text" id="input-ssid" placeholder="Ex: MonWiFi">
        <label>Mot de passe</label>
        <input type="text" id="input-pass" placeholder="Mot de passe">
      </div>`;
  } else {
    container.innerHTML = `
      <div class="form-group">
        <label>Contenu / Texte / Lien *</label>
        <input type="text" id="input-generic" placeholder="Entrez vos données...">
      </div>`;
  }
}

document.getElementById("btn-back-1").addEventListener("click", () => goToStep(1));
document.getElementById("btn-to-step-3").addEventListener("click", () => {
  // Capture des données
  const inputUrl = document.getElementById("input-url");
  const inputGeneric = document.getElementById("input-generic");
  
  if (inputUrl) qrContent = inputUrl.value || "https://smartech.site";
  else if (inputGeneric) qrContent = inputGeneric.value || "Exemple";
  
  qrCode.update({ data: qrContent });
  goToStep(3);
});

// 3. Personnalisation du QR
document.getElementById("qr-color-picker").addEventListener("input", (e) => {
  qrCode.update({ dotsOptions: { color: e.target.value } });
});

document.getElementById("qr-pattern-select").addEventListener("change", (e) => {
  qrCode.update({ dotsOptions: { type: e.target.value } });
});

document.getElementById("btn-back-2").addEventListener("click", () => goToStep(2));
document.getElementById("btn-to-step-4").addEventListener("click", () => goToStep(4));

// 4. Téléchargement & Pub
let timerStarted = false;
document.getElementById("video-box").addEventListener("click", () => {
  if (timerStarted) return;
  timerStarted = true;
  let time = 30;
  const timerText = document.getElementById("timer-text");
  
  const interval = setInterval(() => {
    time--;
    timerText.innerText = `⏳ Pub : ${time}s restantes...`;
    if (time <= 0) {
      clearInterval(interval);
      timerText.innerText = "✅ Pub terminée !";
      document.getElementById("btn-free-dl").disabled = false;
    }
  }, 1000);
});

document.getElementById("btn-free-dl").addEventListener("click", () => {
  qrCode.download({ name: "smart-lab-qr", extension: "png" });
});

document.getElementById("btn-pay-dl").addEventListener("click", () => {
  alert("Redirection paiement Stripe ($0.99)...");
  qrCode.download({ name: "smart-lab-qr-hd", extension: "svg" });
});

document.getElementById("btn-back-3").addEventListener("click", () => goToStep(3));
