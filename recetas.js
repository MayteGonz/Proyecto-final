//REMOTO (HEROKU)
//https://proyecto-final-mayte-nuria.herokuapp.com/api
//LOCAL (MI ORDENADOR)
// http://localhost:1337/api

//--> const url= "http://localhost:1337/api" o la del remoto

requestRecipes();

async function requestRecipes() {
  try {
    const response = await fetch(
      "https://proyecto-final-mayte-nuria.herokuapp.com/api/recetas?populate=*"
    );
    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }
    const recipesResponse = await response.json();
    showRecipes(recipesResponse.data);
  } catch (error) {
    console.log(error);
  }
}

function showRecipes(data) {
  const listRecipes = document.getElementById("lista-recetas");
  for (const receta of data) {
    const div = document.createElement("div");
    const titulo = document.createElement("h2");
    const foto = document.createElement("img");
    const ingredientes = document.createElement("p");
    const descripcion = document.createElement("p");

    div.classList.add("contenedor");
    foto.classList.add("imagen-receta");

    foto.src = receta.attributes.foto;
    titulo.textContent = receta.attributes.titulo;
    ingredientes.textContent = receta.attributes.ingredientes.data;
    descripcion.textContent = receta.attributes.descripcion;

    div.appendChild(foto);
    div.appendChild(titulo);
    div.appendChild(ingredientes);
    div.appendChild(descripcion);
    listRecipes.appendChild(div);
  }
}
