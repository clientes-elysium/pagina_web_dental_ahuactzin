// Dental Ahuactzin - Interactividad y Animaciones

document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initStickyHeader();
    initScrollReveal();
    initFAQInteraction();
    initCTAActions();
    initTeamSlider();
});

// Menú Móvil (Drawer Lateral)
function initMobileMenu() {
    const burgerBtn = document.getElementById("mobile-menu-btn");
    const closeBtn = document.getElementById("close-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const overlay = document.getElementById("mobile-menu-overlay");
    const menuLinks = document.querySelectorAll("#mobile-menu nav a");

    function openMenu() {
        mobileMenu.classList.remove("translate-x-full");
        overlay.classList.remove("opacity-0", "pointer-events-none");
        overlay.classList.add("opacity-50");
        document.body.classList.add("overflow-hidden");
    }

    function closeMenu() {
        mobileMenu.classList.add("translate-x-full");
        overlay.classList.remove("opacity-50");
        overlay.classList.add("opacity-0", "pointer-events-none");
        document.body.classList.remove("overflow-hidden");
    }

    if (burgerBtn && mobileMenu && overlay) {
        burgerBtn.addEventListener("click", openMenu);
        closeBtn.addEventListener("click", closeMenu);
        overlay.addEventListener("click", closeMenu);

        menuLinks.forEach(link => {
            link.addEventListener("click", closeMenu);
        });
    }
}

// Encabezado Pegajoso (Sticky Header)
function initStickyHeader() {
    const header = document.querySelector("header");

    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("shadow-md", "bg-white/95", "backdrop-blur-md");
                header.classList.remove("bg-surface-container-lowest", "shadow-sm");
            } else {
                header.classList.remove("shadow-md", "bg-white/95", "backdrop-blur-md");
                header.classList.add("bg-surface-container-lowest", "shadow-sm");
            }
        });
    }
}

// Revelado de Secciones al hacer Scroll (Intersection Observer)
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Una vez revelado, podemos dejar de observar el elemento si no queremos que vuelva a ocultarse
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal-element");
    revealElements.forEach(el => {
        observer.observe(el);
    });
}

// Interacción Premium en FAQs (Asegurar que solo un panel esté abierto a la vez, opcional pero elegante)
function initFAQInteraction() {
    const details = document.querySelectorAll("details");

    details.forEach(targetDetail => {
        targetDetail.addEventListener("click", (e) => {
            // Permitimos la propagación para que se aplique la clase native de HTML5
            if (targetDetail.hasAttribute("open")) return; // Si ya se está abriendo, no hacemos nada

            // Cerrar los demás acordeones para un efecto de acordeón clásico
            details.forEach(detail => {
                if (detail !== targetDetail && detail.hasAttribute("open")) {
                    detail.removeAttribute("open");
                }
            });
        });
    });
}

// Acciones de Botones y Redirección a WhatsApp
function initCTAActions() {
    const whatsappNumber = "522224106154"; // Número del consultorio
    const buttons = document.querySelectorAll(".cta-whatsapp");
    const bookButtons = document.querySelectorAll(".cta-booking");

    const message = encodeURIComponent("Hola, quiero solicitar una cita para diagnóstico dental 🦷");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            window.open(whatsappUrl, "_blank");
        });
    });

    bookButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            window.open(whatsappUrl, "_blank");
        });
    });
}

// Control del Carrusel/Carrete de Especialistas
function initTeamSlider() {
    const slider = document.getElementById("team-slider");
    const prevBtn = document.getElementById("team-prev-btn");
    const nextBtn = document.getElementById("team-next-btn");

    if (slider && prevBtn && nextBtn) {
        // Desplazamiento al presionar el botón izquierdo
        prevBtn.addEventListener("click", () => {
            const itemWidth = slider.firstElementChild ? slider.firstElementChild.offsetWidth + 24 : 350;
            slider.scrollBy({ left: -itemWidth, behavior: "smooth" });
        });

        // Desplazamiento al presionar el botón derecho
        nextBtn.addEventListener("click", () => {
            const itemWidth = slider.firstElementChild ? slider.firstElementChild.offsetWidth + 24 : 350;
            slider.scrollBy({ left: itemWidth, behavior: "smooth" });
        });

        // Deshabilitar botones de navegación al inicio/final del scroll para un acabado premium
        const toggleButtons = () => {
            const maxScroll = slider.scrollWidth - slider.clientWidth;

            // Si el scroll está casi al inicio
            if (slider.scrollLeft <= 5) {
                prevBtn.classList.add("opacity-50", "pointer-events-none");
            } else {
                prevBtn.classList.remove("opacity-50", "pointer-events-none");
            }

            // Si el scroll está casi al final
            if (slider.scrollLeft >= maxScroll - 5) {
                nextBtn.classList.add("opacity-50", "pointer-events-none");
            } else {
                nextBtn.classList.remove("opacity-50", "pointer-events-none");
            }
        };

        // Escuchar el evento de scroll y redimensionamiento
        slider.addEventListener("scroll", toggleButtons);
        window.addEventListener("resize", toggleButtons);

        // Ejecución inicial para fijar los estados de los botones
        setTimeout(toggleButtons, 100);
    }
}

