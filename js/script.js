document.getElementById("restaurant-form")?.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const address = document.getElementById("address").value;
    const image = document.getElementById("image").value;

    if (name && description && address && image) {
        const newRestaurant = {
            name,
            description,
            address,
            image
        };

        // Guardar en LocalStorage (puedes cambiarlo por una base de datos si lo deseas)
        let restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];
        restaurants.push(newRestaurant);
        localStorage.setItem("restaurants", JSON.stringify(restaurants));

        alert("Restaurante agregado exitosamente!");
        window.location.href = "index.html"; // Redirigir a la lista de restaurantes
    }
});

// Código para cargar restaurantes en `index.html`
document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".restaurant-container");
    if (container) {
        let restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];
        restaurants.forEach(rest => {
            let div = document.createElement("div");
            div.classList.add("restaurant-item");
            div.innerHTML = `<h3>${rest.name}</h3><p>${rest.description}</p><p>${rest.address}</p><img src="${rest.image}" alt="${rest.name}">`;
            container.appendChild(div);
        });
    }
});