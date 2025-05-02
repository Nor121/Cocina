document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("restaurant-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Detiene el envío predeterminado

        // Simulación de almacenamiento o envío de datos
        console.log("Formulario enviado");

        // Mostrar mensaje de éxito
        alert("Restaurante guardado correctamente");

        // Redirigir a la página de inicio
        window.location.href = "index.html";
    });
});