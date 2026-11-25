document.addEventListener("DOMContentLoaded", () => {
  // Año dinámico en el pie de página
  const yearEl = document.getElementById("yearNow");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Menú móvil
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Botón de impresión / exportar PDF
  const printBtn = document.getElementById("printBtn");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // Filtro de certificaciones
  const filterButtons = document.querySelectorAll(".filter-btn");
  const certCards = document.querySelectorAll(".cert-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.filter;

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      certCards.forEach((card) => {
        const category = card.dataset.category;
        const show = target === "all" || category === target;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  // Copiar correo al portapapeles
  const copyBtn = document.getElementById("copyEmailBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.dataset.copy || "evelynmiteflores@gmail.com";
      const originalText = copyBtn.textContent;
      try {
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = "Copiado";
      } catch {
        // Respaldo si clipboard no está disponible en file://
        const temp = document.createElement("input");
        temp.value = email;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
        copyBtn.textContent = "Copiado";
      }
      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 2000);
    });
  }

  // Formulario de contacto via mailto
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("senderName").value.trim();
      const email = document.getElementById("senderEmail").value.trim();
      const message = document.getElementById("senderMessage").value.trim();

      if (!name || !email || !message) {
        if (formFeedback) {
          formFeedback.textContent = "Por favor completa todos los campos antes de enviar.";
        }
        return;
      }

      const subject = encodeURIComponent(`Contacto desde Portafolio — ${name}`);
      const body = encodeURIComponent(
        `Hola Evelyn,\n\nSoy ${name} (${email}).\n\n${message}\n`
      );

      window.location.href = `mailto:evelynmiteflores@gmail.com?subject=${subject}&body=${body}`;

      if (formFeedback) {
        formFeedback.textContent = "Abriendo tu cliente de correo para enviar el mensaje...";
      }
      contactForm.reset();
    });
  }

  // Animación de aparición al desplazarse
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  // Resaltado del enlace activo en el menú según la sección visible
  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window && sections.length > 0) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              const matches = link.getAttribute("href") === `#${id}`;
              link.classList.toggle("active", matches);
            });
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((sec) => navObserver.observe(sec));
  }

  // Botón flotante "Volver a inicio" (y marca del menú) siempre regresan arriba del todo
  const backToTopLinks = document.querySelectorAll('#backToTopBtn, a[href="#top"]');
  backToTopLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
});
