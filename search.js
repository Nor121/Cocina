document.addEventListener("DOMContentLoaded", function() {

    // 🔍 Búsqueda dinámica con filtro por categoría
    document.getElementById('search-btn').addEventListener('click', function() {
        let searchTerm = document.getElementById('search').value.toLowerCase();
        let category = document.getElementById('category').value;
        console.log(`Buscando restaurantes de categoría "${category}" con el término "${searchTerm}"`);
        // Aquí puedes agregar lógica para filtrar y mostrar resultados
    });

    // ⭐ Guardar restaurantes en favoritos usando LocalStorage
    document.querySelectorAll('.fav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            let favs = JSON.parse(localStorage.getItem('favorites')) || [];
            favs.push(this.dataset.name);
            localStorage.setItem('favorites', JSON.stringify(favs));
            updateFavorites();
        });
    });

    function updateFavorites() {
        let favList = document.getElementById('favorite-list');
        favList.innerHTML = "";
        let favs = JSON.parse(localStorage.getItem('favorites')) || [];

        favs.forEach(fav => {
            let li = document.createElement('li');
            li.textContent = fav;
            favList.appendChild(li);
        });
    }

    updateFavorites(); // Carga los favoritos al iniciar

    // 📍 Google Maps - Inicialización
    function initMap() {
        let map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 4.711, lng: -74.072 },
            zoom: 12
        });

        new google.maps.Marker({
            position: { lat: 4.711, lng: -74.072 },
            map: map,
            title: "Restaurante Ejemplo"
        });
    }
    
    // Llama a Google Maps cuando la página cargue
    window.initMap = initMap;

    // 📝 Sistema de reservas
    document.getElementById('reservation-form').addEventListener('submit', function(event) {
        event.preventDefault();

        let name = document.getElementById('name').value;
        let date = document.getElementById('date').value;
        let time = document.getElementById('time').value;
        let people = document.getElementById('people').value;

        alert(`Reserva confirmada para ${name} el ${date} a las ${time} para ${people} personas.`);
    });

    // 🌙 Modo oscuro y claro
    document.getElementById('theme-toggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });

});