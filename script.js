const URL_APIs = ["https://rickandmortyapi.com/api/character"
                ,"https://rickandmortyapi.com/api/character?page=2"
                ,"https://rickandmortyapi.com/api/character?page=3"
                ,"https://rickandmortyapi.com/api/character?page=4"
                ,"https://rickandmortyapi.com/api/character?page=5"];

const container = document.querySelector("#characterContainer");

let arregloPersonajes = [];

function showCharacters(array){
    for (const character of array) {
        container.innerHTML +=
        `<tr>
            <div>
                <td><img src=${character.image} class="img-thumbnail float-start"></td>
            </div>
            <div>
                <td><h2 class="text-center">Name: ${character.name}</h1></td>
            </div>
            <div class="row align-items-start">
                <div class="col">
                    <td><p class="text-center">Species: ${character.species}</p></td>

                    <td><p class="text-center">Gender: ${character.gender}</p></td>

                    <td><p class="text-center">Origin: ${character.origin.name}</p></td>
                </div>
            </div>
        </tr>`
    }
}

async function getCharacters(urls){
    for (const url of urls) {
        let response = await fetch(url);
    
        if (response.ok){
            responseContents = await response.json();
            for (const character of responseContents.results) {
                arregloPersonajes.push(character);
            }
            
            showCharacters(arregloPersonajes);
        } else {
            alert("HTTP error: " + response.status);
        }
    }
}

getCharacters(URL_APIs);

const episode = document.querySelector("#episode");
const nombre = document.querySelector("#name");
const gender = document.querySelector("#gender");
const species = document.querySelector("#species");
const apply = document.querySelector("#apply");
const clear = document.querySelector("#clear");

apply.addEventListener("click", function(){
    container.innerHTML = "";
    let arregloFiltrado = arregloPersonajes;
    if (episode.value != ""){
        arregloFiltrado = arregloFiltrado.filter((personaje) => { for (const capitulo of personaje.episode) {
                if(capitulo.includes(episode.value.toString())){
                    return true;
                }
            }
        });
    }
    if (nombre.value != ""){
        arregloFiltrado = arregloFiltrado.filter((personaje) => personaje.name.toUpperCase().includes(nombre.value.toUpperCase()));
    }
    if (gender.value != ""){
        arregloFiltrado = arregloFiltrado.filter((personaje) => personaje.gender.toUpperCase().includes(gender.value.toUpperCase()));
    }
    if (species.value != ""){
        arregloFiltrado = arregloFiltrado.filter((personaje) => personaje.species.toUpperCase().includes(species.value.toUpperCase()));
    }
    showCharacters(arregloFiltrado);
});

clear.addEventListener("click", function(){
    episode.value = "";
    nombre.value = "";
    gender.value = "";
    species.value = "";
    showCharacters(arregloPersonajes);
});

// personaje.episode.some((capitulo) => capitulo.includes(episode.value.toString())));