document.addEventListener("DOMContentLoaded", () => {
    
    // 1. NAVIGATION ENTRE SECTIONS
    const navItems = document.querySelectorAll(".bottom-nav .nav-item");
    const sections = document.querySelectorAll(".app-section");

    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove("active"));
            sections.forEach(section => {
                section.classList.add("hidden");
                section.classList.remove("active");
            });

            item.classList.add("active");
            const targetId = item.getAttribute("data-target");
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove("hidden");
                targetSection.classList.add("active");
            }
        });
    });

    // 2. CRÉATION DE COMPTE UTILISATEUR
    const formRegister = document.getElementById("form-register");
    const authBox = document.getElementById("auth-box");
    const profileBox = document.getElementById("user-profile-box");
    const profileName = document.getElementById("profile-name");
    const profilePhone = document.getElementById("profile-phone");
    const btnLogout = document.getElementById("btn-logout");

    let currentUser = JSON.parse(localStorage.getItem("smartshop_user")) || null;

    function updateProfileUI() {
        if (currentUser) {
            authBox.classList.add("hidden");
            profileBox.classList.remove("hidden");
            profileName.textContent = currentUser.name;
            profilePhone.textContent = currentUser.phone;
        } else {
            authBox.classList.remove("hidden");
            profileBox.classList.add("hidden");
        }
    }
    updateProfileUI();

    if (formRegister) {
        formRegister.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("reg-name").value;
            const phone = document.getElementById("reg-phone").value;

            currentUser = { name, phone };
            localStorage.setItem("smartshop_user", JSON.stringify(currentUser));
            updateProfileUI();
            alert("✅ Compte créé avec succès !");
        });
    }

    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            localStorage.removeItem("smartshop_user");
            currentUser = null;
            updateProfileUI();
        });
    }

    // 3. PRÉVISUALISATION DE LA PHOTO DU PRODUIT
    const photoInput = document.getElementById("annonce-photo");
    const photoPreview = document.getElementById("photo-preview");
    let currentPhotoBase64 = "";

    photoInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                currentPhotoBase64 = event.target.result;
                photoPreview.innerHTML = `<img src="${currentPhotoBase64}" alt="Aperçu">`;
                photoPreview.classList.remove("hidden");
            };
            reader.readAsDataURL(file);
        }
    });

    // 4. PUBLICATION REELLE D'UNE ANNONCE
    const formAnnonce = document.getElementById("form-annonce");
    const productsFeed = document.getElementById("products-feed");
    const noProductsMsg = document.getElementById("no-products-msg");

    formAnnonce.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!currentUser) {
            alert("⚠️ Veuillez créer un compte dans l'onglet 'Compte' avant de publier une annonce.");
            return;
        }

        const title = document.getElementById("annonce-title").value;
        const price = document.getElementById("annonce-price").value;
        const city = document.getElementById("annonce-city").value;

        // Cacher le message "Aucune annonce" s'il existe
        if (noProductsMsg) noProductsMsg.style.display = "none";

        // Masquer/réinitialiser l'aperçu photo
        photoPreview.classList.add("hidden");

        // Créer l'élément d'annonce
        const card = document.createElement("article");
        card.className = "lbc-card";
        card.setAttribute("data-city", city);
        card.setAttribute("data-title", title.toLowerCase());

        card.innerHTML = `
            <div class="seller-header">
                <div class="seller-avatar">${currentUser.name.charAt(0).toUpperCase()}</div>
                <span class="seller-name">${currentUser.name}</span>
            </div>
            <div class="card-image">
                <img src="${currentPhotoBase64}" alt="${title}">
                <button class="like-btn"><i class="fa-regular fa-heart"></i></button>
            </div>
            <div class="card-details">
                <h3 class="card-title">${title}</h3>
                <p class="card-price">${price} $</p>
                <p class="card-delivery"><i class="fa-solid fa-truck"></i> Livraison possible</p>
                <p class="card-meta">${city} • À l'instant</p>
            </div>
        `;

        // Ajouter l'annonce au début du fil d'actualité
        productsFeed.prepend(card);

        // Réinitialiser le formulaire
        formAnnonce.reset();
        currentPhotoBase64 = "";

        alert("🎉 Votre annonce a été publiée avec succès sur SmartShop !");

        // Rediriger vers la page d'accueil
        document.querySelector('[data-target="section-accueil"]').click();
    });

    // 5. RECHERCHE EN TEMPS RÉEL (BARRE DE RECHERCHE)
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        const cards = document.querySelectorAll(".lbc-card");

        cards.forEach(card => {
            const title = card.getAttribute("data-title") || "";
            if (title.includes(query)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });

    // 6. FILTRE PAR VILLE (HEADER)
    const citySelect = document.getElementById("city-select");
    const displayCity = document.getElementById("display-city");

    citySelect.addEventListener("change", (e) => {
        const selectedCity = e.target.value;
        if (displayCity) displayCity.textContent = selectedCity;

        const cards = document.querySelectorAll(".lbc-card");
        cards.forEach(card => {
            const cardCity = card.getAttribute("data-city");
            if (selectedCity === "Toute la RDC" || cardCity === selectedCity) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });
});
                
