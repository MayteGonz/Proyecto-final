//REMOTO (HEROKU)
//https://proyecto-final-mayte-nuria.herokuapp.com/api
//LOCAL (MI ORDENADOR)
// http://localhost:1337/api

//--> const url= "http://localhost:1337/api" o la del remoto

requestRecipes();

async function requestRecipes() {
  try {
    const response = await fetch(`${url}/recetas?populate=*`);
    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }
    const recipesResponse = await response.json();
    console.log(recipesResponse.data);
    showRecipes(recipesResponse.data);
  } catch (error) {
    console.log(error);
  }
}

function showRecipes(data) {
  const listRecipes = document.getElementById("lista-recetas");
  listRecipes.innerHTML = "";
  for (const receta of data) {
    const a = document.createElement("a");
    const div = document.createElement("div");
    const titulo = document.createElement("h2");
    const foto = document.createElement("img");

    div.classList.add("contenedor");
    foto.classList.add("imagen-receta");

    a.href = "recetas-id.html/" + receta.id + "?populate=*";
    foto.src = receta.attributes.foto;
    titulo.textContent = receta.attributes.titulo;

    div.appendChild(foto);
    div.appendChild(titulo);
    a.appendChild(div);
    listRecipes.appendChild(a);
  }
}
