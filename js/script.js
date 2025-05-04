var swiper = new Swiper(".mySwiper-2", {
    slidesPerView: 2, // Mostrar más restaurantes al mismo tiempo
    spaceBetween: 20,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    }
});

// Cargar restaurantes desde LocalStorage
document.addEventListener("DOMContentLoaded", function () {
    const idiomaSelector = document.getElementById("idioma");

    if (!idiomaSelector) {
        console.error("El selector de idioma no está presente en el HTML.");
        return;
    }

    const idiomaGuardado = localStorage.getItem("idioma") || "es";
    idiomaSelector.value = idiomaGuardado;
    cambiarIdioma(idiomaGuardado);

    idiomaSelector.addEventListener("change", function () {
        const lang = this.value;
        localStorage.setItem("idioma", lang);
        console.log("Idioma guardado en localStorage:", localStorage.getItem("idioma"));
        cambiarIdioma(lang);
    });

    cargarRestaurantes(idiomaGuardado);
});

// Definir traducciones fuera de la función para que estén disponibles globalmente
const traducciones = {
    es: {
        titulo: "Directorio de Restaurantes Max Food",
        destacados: "🍽️ Restaurantes Destacados",
        descripcion: `"Descubre los mejores restaurantes, donde la calidad, el sabor y la experiencia se combinan 
        para ofrecerte momentos inolvidables. Desde acogedores bistrós hasta elegantes establecimientos gourmet, 
        cada lugar te invita a disfrutar de una gastronomía excepcional. ¡Ven y descubre el arte de la buena mesa!"`,
        restaurantes: "Restaurantes",
        footer: "© 2025 Directorio Gastronómico. Todos los derechos reservados."
    },
    en: {
        titulo: "Max Food Restaurant Directory",
        destacados: "🍽️ Featured Restaurants",
        descripcion: `"Discover the best restaurants, where quality, flavor, and experience come together 
        to offer unforgettable moments. From cozy bistros to elegant gourmet establishments, 
        each place invites you to enjoy exceptional cuisine. Come and discover the art of fine dining!"`,
        restaurantes: "Restaurants",
        footer: "© 2025 Gastronomic Directory. All rights reserved."
    },
    fr: {
        titulo: "Annuaire des Restaurants Max Food",
        destacados: "🍽️ Restaurants en Vedette",
        descripcion: `"Découvrez les meilleurs restaurants, où la qualité, la saveur et l'expérience se combinent 
        pour offrir des moments inoubliables. Des bistros chaleureux aux établissements gastronomiques élégants, 
        chaque endroit vous invite à savourer une cuisine exceptionnelle. Venez découvrir l'art de la bonne table!"`,
        restaurantes: "Restaurants",
        footer: "© 2025 Annuaire Gastronomique. Tous droits réservés."
    }
};

// Función para cambiar el idioma
function cambiarIdioma(lang) {
    console.log("Cambiando idioma a:", lang);

    const elementos = {
        titulo: document.querySelector(".titulo-directorio"),
        destacados: document.querySelector(".slider-text h1"),
        descripcion: document.querySelectorAll(".slider-text p"), // Selecciona todos los párrafos
        restaurantes: document.querySelector(".titulo-restaurantes"),
        footer: document.querySelector("footer p")
    };

    Object.keys(elementos).forEach((key) => {
        if (elementos[key]) {
            if (key === "descripcion" && elementos[key].length > 0) {
                elementos[key].forEach((el, index) => {
                    el.textContent = traducciones[lang][key].split("\n")[index] || traducciones[lang][key];
                });
            } else {
                elementos[key].textContent = traducciones[lang][key];
            }
        } else {
            console.warn(`Elemento no encontrado para la clave: ${key}`);
        }
    });

    cargarRestaurantes(lang);
}

// Función para cargar restaurantes desde LocalStorage y traducirlos dinámicamente
function cargarRestaurantes(lang) {
    const container = document.querySelector(".restaurant-container");
    let restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];

    if (container) {
        container.innerHTML = "";

        if (restaurants.length > 0) {
            restaurants.forEach(rest => {
                let div = document.createElement("div");
                div.classList.add("restaurant-item");

                let nombre = rest[`name_${lang}`] || rest.name;
                let descripcion = rest[`description_${lang}`] || rest.description;
                let direccion = rest[`address_${lang}`] || rest.address;

                div.innerHTML = `<h3>${nombre}</h3>
                                 <p>${descripcion}</p>
                                 <p>${direccion}</p>
                                 <img src="${rest.image}" alt="${nombre}">`;
                container.appendChild(div);
            });
        } else {
            container.innerHTML = "<p>No se encontraron restaurantes en LocalStorage.</p>";
        }
    }
}