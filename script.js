document.addEventListener("DOMContentLoaded", () => {
    
    // VARIABLES D'ÉTAT
    let currentUser = JSON.parse(localStorage.getItem("smartshop_user")) || null;
    let loadedPhotos = [];
    let currentAnnonces = [];

    // 1. NAVIGATION
    const navItems = document.querySelectorAll(".bottom-nav .nav-item");
    const sections = document.querySelectorAll(".app-section");

    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = item.getAttribute("data-target");

            // Règle : Authentification obligatoire pour publier
            if (targetId === "section-deposer" && !currentUser) {
                alert("⚠️ Vous devez vérifier votre numéro de téléphone pour publier une annonce.");
                openSection("section-compte");
                return;
            }

            openSection(targetId);
        });
    });

    function openSection(targetId) {
        navItems.forEach(nav => {
            if (nav.getAttribute("data-target") === targetId) nav.classList.add("active");
            else nav.classList.remove("active");
        });

        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.remove("hidden");
                section.classList.add("active");
            } else {
                section.classList.add("hidden");
                section.classList.remove("active");
            }
        });
    }

    // 2. GESTION DES PHOTOS (JUSQU'À 5)
    const photosInput = document.getElementById("annonce-photos");
    const photosPreviewGrid = document.getElementById("photos-preview");
    const photoCountSpan = document.getElementById("photo-count");

    photosInput.addEventListener("change", (e) => {
        const files = Array.from(e.target.files);
        if (loadedPhotos.length + files.length > 5) {
            alert("Vous pouvez ajouter 5 photos maximum.");
            return;
        }

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = function(event) {
                loadedPhotos.push(event.target.result);
                renderPhotoPreviews();
            };
            reader.readAsDataURL(file);
        });
    });

    function renderPhotoPreviews() {
        photosPreviewGrid.innerHTML = "";
        photoCountSpan.textContent = loadedPhotos.length;

        loadedPhotos.forEach((src, index) => {
            const div = document.createElement("div");
            div.className = "preview-item";
            div.innerHTML = `
                <img src="${src}">
                <button type="button" class="remove-photo" data-index="${index}">&times;</button>
            `;
            photosPreviewGrid.appendChild(div);
        });

        document.querySelectorAll(".remove-photo").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const idx = parseInt(e.target.getAttribute("data-index"));
                loadedPhotos.splice(idx, 1);
                renderPhotoPreviews();
            });
        });
    }

    // 3. SOUMISSION ANNONCE
    const formAnnonce = document.getElementById("form-annonce");
    const productsFeed = document.getElementById("products-feed");
    const noProductsMsg = document.getElementById("no-products-msg");

    formAnnonce.addEventListener("submit", (e) => {
        e.preventDefault();

        if (loadedPhotos.length === 0) {
            alert("Veuillez ajouter au moins une photo du produit.");
            return;
        }

        const newAnnonce = {
            id: Date.now(),
            title: document.getElementById("annonce-title").value,
            category: document.getElementById("annonce-category").value,
            desc: document.getElementById("annonce-desc").value,
            price: document.getElementById("annonce-price").value,
            currency: document.getElementById("annonce-currency").value,
            state: document.getElementById("annonce-state").value,
            qty: document.getElementById("annonce-qty").value,
            city: document.getElementById("annonce-city").value,
            photos: [...loadedPhotos],
            sellerName: currentUser.name,
            sellerPhone: currentUser.phone
        };

        currentAnnonces.unshift(newAnnonce);
        renderAnnoncesFeed();

        // Reset
        formAnnonce.reset();
        loadedPhotos = [];
        renderPhotoPreviews();

        alert("🎉 Votre annonce a été publiée avec succès !");
        openSection("section-accueil");
    });

    function renderAnnoncesFeed() {
        productsFeed.innerHTML = "";
        if (currentAnnonces.length === 0) {
            productsFeed.appendChild(noProductsMsg);
            noProductsMsg.style.display = "block";
            return;
        }

        currentAnnonces.forEach(annonce => {
            const card = document.createElement("article");
            card.className = "lbc-card";
            card.innerHTML = `
                <div class="seller-header">
                    <div class="seller-avatar">${annonce.sellerName.charAt(0).toUpperCase()}</div>
                    <span class="seller-name">${annonce.sellerName}</span>
                </div>
                <div class="card-image">
                    <img src="${annonce.photos[0]}" alt="${annonce.title}">
                    <button class="like-btn"><i class="fa-regular fa-heart"></i></button>
                </div>
                <div class="card-details">
                    <h3 class="card-title">${annonce.title}</h3>
                    <p class="card-price">${annonce.price} ${annonce.currency}</p>
                    <p class="card-meta">${annonce.city} • À l'instant</p>
                </div>
            `;

            card.addEventListener("click", () => openProductModal(annonce));
            productsFeed.appendChild(card);
        });
    }

    // 4. MODALE VUE PRODUIT (STYLE LEBONCOIN)
    const productModal = document.getElementById("product-modal");
    const btnCloseModal = document.getElementById("btn-close-modal");

    function openProductModal(item) {
        document.getElementById("modal-title").textContent = item.title;
        document.getElementById("modal-price").textContent = `${item.price} ${item.currency}`;
        document.getElementById("modal-state").textContent = item.state;
        document.getElementById("modal-category").textContent = item.category;
        document.getElementById("modal-qty").textContent = `Stock: ${item.qty}`;
        document.getElementById("modal-location").textContent = item.city;
        document.getElementById("modal-desc").textContent = item.desc;
        document.getElementById("modal-img").src = item.photos[0];
        document.getElementById("modal-photo-count").innerHTML = `<i class="fa-solid fa-camera"></i> 1/${item.photos.length}`;
        
        document.getElementById("modal-seller-name").textContent = item.sellerName;
        document.getElementById("modal-seller-avatar").textContent = item.sellerName.charAt(0).toUpperCase();

        productModal.classList.remove("hidden");
    }

    btnCloseModal.addEventListener("click", () => productModal.classList.add("hidden"));

    // 5. AUTHENTIFICATION & VÉRIFICATION NUMÉRO
    const btnSendCode = document.getElementById("btn-send-code");
    const step1 = document.getElementById("step-1");
    const step2 = document.getElementById("step-2");
    const formAuth = document.getElementById("form-auth");
    const authBox = document.getElementById("auth-box");
    const profileBox = document.getElementById("user-profile-box");
    const btnLogout = document.getElementById("btn-logout");

    function updateAuthUI() {
        if (currentUser) {
            authBox.classList.add("hidden");
            profileBox.classList.remove("hidden");
            document.getElementById("profile-name").textContent = currentUser.name;
            document.getElementById("profile-phone").textContent = currentUser.phone;
        } else {
            authBox.classList.remove("hidden");
            profileBox.classList.add("hidden");
        }
    }
    updateAuthUI();

    btnSendCode.addEventListener("click", () => {
        const phone = document.getElementById("auth-phone").value.trim();
        if (!phone) {
            alert("Veuillez saisir un numéro valide.");
            return;
        }
        alert(`📲 Un SMS de vérification avec le code [1234] a été envoyé au +243${phone}`);
        step1.classList.add("hidden");
        step2.classList.remove("hidden");
    });

    formAuth.addEventListener("submit", (e) => {
        e.preventDefault();
        const code = document.getElementById("auth-code").value.trim();
        const name = document.getElementById("auth-name").value.trim();
        const phone = document.getElementById("auth-phone").value.trim();

        if (code !== "1234") {
            alert("Code SMS incorrect. Utilisez le code 1234.");
            return;
        }

        currentUser = { name: name || "Utilisateur", phone: `+243${phone}` };
        localStorage.setItem("smartshop_user", JSON.stringify(currentUser));
        updateAuthUI();
        alert("✅ Numéro vérifié et compte connecté !");
    });

    btnLogout.addEventListener("click", () => {
        localStorage.removeItem("smartshop_user");
        currentUser = null;
        step2.classList.add("hidden");
        step1.classList.remove("hidden");
        updateAuthUI();
    });
});
                             
