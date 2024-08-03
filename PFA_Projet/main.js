document.addEventListener("DOMContentLoaded", () => {
  // Sélection des éléments
  const navbar = document.getElementById("navbar");
  const themeToggleButton = document.getElementById("theme-toggle");
  const backToHomeButton = document.getElementById("backToHome");
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal-content");
  const span = document.querySelector(".close");

  // Gestion de la classe 'active' sur la barre de navigation lors du défilement
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("active");
    } else {
      navbar.classList.remove("active");
    }

    // Affichage du bouton de retour à l'accueil après défilement
    if (!document.body.classList.contains("home") && window.scrollY > 200) {
      backToHomeButton.classList.add("show");
    } else {
      backToHomeButton.classList.remove("show");
    }
  });

  // Scroll to top on button click
  backToHomeButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Définition des animations
  const scrollrevealOptions = {
    distance: "50px",
    origin: "bottom",
    duration: 1500,
  };

  ScrollReveal().reveal(".home h1", scrollrevealOptions);
  ScrollReveal().reveal(".home h4", { ...scrollrevealOptions, delay: 800 });
  ScrollReveal().reveal(".home .btn-explore", {
    ...scrollrevealOptions,
    delay: 1200,
  });
  ScrollReveal().reveal(".about .about-title", scrollrevealOptions);
  ScrollReveal().reveal(".about .about-desc", {
    ...scrollrevealOptions,
    delay: 600,
  });
  ScrollReveal().reveal(".about .item-data", {
    ...scrollrevealOptions,
    delay: 1200,
  });
  ScrollReveal().reveal(".btn-explore", {
    ...scrollrevealOptions,
    delay: 2000,
  });
  ScrollReveal().reveal(".btn-more", { ...scrollrevealOptions, delay: 2000 });
  ScrollReveal().reveal(".card", scrollrevealOptions);
  ScrollReveal().reveal(".card .image", { ...scrollrevealOptions, delay: 600 });
  ScrollReveal().reveal(".card .content-card h4", {
    ...scrollrevealOptions,
    delay: 1600,
  });
  ScrollReveal().reveal(".next .card .content-card p", {
    ...scrollrevealOptions,
    delay: 2000,
  });

  // Gestion du modal
  document.querySelectorAll(".btn-read-more").forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      const content = `<h2>${
        this.previousElementSibling.previousElementSibling.innerText
      }</h2><p>${this.getAttribute("data-content")}</p>`;
      openModal(content);
    });
  });

  function openModal(content) {
    modalContent.innerHTML = `${content}<span class="close">&times;</span>`;
    modal.classList.add("show");
  }

  function closeModal() {
    modal.classList.remove("show");
  }

  modalContent.addEventListener("click", (event) => {
    if (event.target.classList.contains("close")) {
      closeModal();
    }
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Gestion du bouton de basculement du thème
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);

  themeToggleButton.addEventListener("click", () => {
    const newTheme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Stocker la préférence de l'utilisateur
  });
});
