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
document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".restaurant-container");
    let restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];

    if (container && restaurants.length > 0) {
        restaurants.forEach(rest => {
            let div = document.createElement("div");
            div.classList.add("restaurant-item");
            div.innerHTML = `<h3>${rest.name}</h3>
                             <p>${rest.description}</p>
                             <p>${rest.address}</p>
                             <img src="${rest.image}" alt="${rest.name}">`;
            container.appendChild(div);
        });
    } else {
        console.log("No se encontraron restaurantes en LocalStorage.");
    }
});