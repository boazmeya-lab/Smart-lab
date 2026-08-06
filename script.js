document.addEventListener("DOMContentLoaded", () => {
    
    // 1. GESTION DE LA NAVIGATION DU BAS (BOTTOM NAV)
    const navItems = document.querySelectorAll(".bottom-nav .nav-item");
    const sections = document.querySelectorAll(".app-section");

    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();

            // Retirer la classe active de tous les liens de navigation
            navItems.forEach(nav => nav.classList.remove("active"));
            
            // Masquer toutes les sections
            sections.forEach(section => section.classList.add("hidden"));
            sections.forEach(section => section.classList.remove("active"));

            // Activer l'élément cliqué
            item.classList.add("active");

            // Afficher la section cible
            const targetId = item.getAttribute("data-target");
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove("hidden");
                targetSection.classList.add("active");
            }
        });
    });

    // 2. GESTION DU SÉLECTEUR DE VILLE (MENU EN HAUT)
    const citySelect = document.getElementById("city-select");
    const displayCity = document.getElementById("display-city");
    const cards = document.querySelectorAll(".lbc-card");

    citySelect.addEventListener("change", (e) => {
        const selectedCity = e.target.value;
        if (displayCity) displayCity.textContent = selectedCity;

        // Filtrer les annonces selon la ville choisie
        cards.forEach(card => {
            const cardCity = card.getAttribute("data-city");
            if (selectedCity === "Toute la RDC" || cardCity === selectedCity) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });

    // 3. GESTION DES FAVORIS (BOUTON CŒUR)
    const likeButtons = document.querySelectorAll(".like-btn");

    likeButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // Éviter de cliquer sur la carte
            const icon = btn.querySelector("i");

            if (icon.classList.contains("fa-regular")) {
                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");
                icon.style.color = "#ff6e14"; // Couleur orange
            } else {
                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");
                icon.style.color = "";
            }
        });
    });

    // 4. RECHERCHE PAR IMAGE (BOUTON CAMÉRA)
    const imageUpload = document.getElementById("image-upload");

    imageUpload.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) {
            const fileName = e.target.files[0].name;
            alert(`📷 Image sélectionnée : ${fileName}\nRecherche vectorielle des téléphones similaires en cours...`);
        }
    });

    // 5. SOUMISSION DU FORMULAIRE DE DÉPÔT D'ANNONCE
    const formAnnonce = document.getElementById("form-annonce");
    if (formAnnonce) {
        formAnnonce.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("✅ Votre annonce a été soumise avec succès ! Elle sera vérifiée avant publication.");
            formAnnonce.reset();
        });
    }

});
