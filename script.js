// Initialisation du QR Code avec la bibliothèque qr-code-styling
const qrCode = new QRCodeStyling({
  width: 200,
  height: 200,
  type: "svg",
  data: "https://votre-site.com",
  dotsOptions: {
    color: "#000000",
    type: "square"
  },
  backgroundOptions: {
    color: "#ffffff",
  }
});

// Afficher le QR Code au chargement
qrCode.append(document.getElementById("canvas-container"));

// Interactions formulaire
const inputData = document.getElementById("qr-data");
const inputColor = document.getElementById("qr-color");
const selectStyle = document.getElementById("qr-dots-style");

inputData.addEventListener("input", (e) => {
  qrCode.update({ data: e.target.value || "https://votre-site.com" });
});

inputColor.addEventListener("input", (e) => {
  qrCode.update({ dotsOptions: { color: e.target.value } });
});

selectStyle.addEventListener("change", (e) => {
  qrCode.update({ dotsOptions: { type: e.target.value } });
});

// Gestion de la Pop-up Modal & Téléchargement
const modal = document.getElementById("modal-download");
const btnTrigger = document.getElementById("btn-download-trigger");
const btnClose = document.querySelector(".close-modal");
const videoTimer = document.getElementById("video-timer");
const btnFreeDownload = document.getElementById("btn-free-download");
const btnPayDownload = document.getElementById("btn-pay-download");

// Ouvrir la modal
btnTrigger.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// Fermer la modal
btnClose.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Simulation du lecteur vidéo publicitaire (Décompte 30 secondes)
let timerStarted = false;
document.querySelector(".video-placeholder").addEventListener("click", () => {
  if (timerStarted) return;
  timerStarted = true;
  let timeLeft = 30;

  const interval = setInterval(() => {
    timeLeft--;
    videoTimer.innerText = `⏳ Lecture pub : ${timeLeft}s restantes...`;

    if (timeLeft <= 0) {
      clearInterval(interval);
      videoTimer.innerText = "✅ Vidéo terminée !";
      btnFreeDownload.disabled = false;
      btnFreeDownload.innerText = "Télécharger gratuitement";
    }
  }, 1000);
});

// Téléchargement Gratuit
btnFreeDownload.addEventListener("click", () => {
  qrCode.download({ name: "smart-lab-qrcode", extension: "png" });
  modal.classList.add("hidden");
});

// Téléchargement Payant $0.99 (Intégrer Stripe plus tard)
btnPayDownload.addEventListener("click", () => {
  alert("Redirection vers la passerelle de paiement ($0.99)...");
  // Après validation du paiement Stripe :
  qrCode.download({ name: "smart-lab-qrcode-hd", extension: "png" });
  modal.classList.add("hidden");
});
