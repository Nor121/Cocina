import { restaurantes } from "./restaurantes.js";

const SearchResults = document.getElementById("search-results");
const categoria = document.getElementById("category");
const btnBuscar = document.getElementById("search-btn");
const nombreBuscado = document.getElementById("search");

const mostrarRestaurantes= (lista = restaurantes)=>{
    SearchResults.innerHTML += lista.map(
        ({name, estrellas, direccion, imagen, categoria})=>
        `
            <div class="restaurant-card">
                    <img src="${imagen}" alt="Restaurante ${name}">
                    <h3>${name}</h3>
                    <p>${direccion}</p>
                    <p>${estrellas} | ${categoria}</p>
            </div>
        `
        ).join("");
};


categoria.addEventListener("change", (e) => {
    SearchResults.innerHTML = "";
    
    switch(e.target.value){
        case "Italiano":
            mostrarRestaurantes(restaurantes.filter((restaurante) => restaurante.categoria === "Italiano"));
            break;
        case "Mexicano":
            mostrarRestaurantes(restaurantes.filter((restaurante) => restaurante.categoria === "Mexicano"));
            break;
        case "Mar":
            mostrarRestaurantes(restaurantes.filter((restaurante) => restaurante.categoria === "Mar"));
            break;
    
    default:
        mostrarRestaurantes();
    }
});

btnBuscar.addEventListener("click",()=>{
    SearchResults.innerHTML= "";
    mostrarRestaurantes(restaurantes.filter((restaurante)=> restaurante.name.toLowerCase().includes(nombreBuscado.value.toLowerCase())));
    categoria.value=""
});

mostrarRestaurantes();
