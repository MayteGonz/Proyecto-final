//REMOTO (HEROKU)
//https://proyecto-final-mayte-nuria.herokuapp.com/api
//LOCAL (MI ORDENADOR)
// http://localhost:1337/api

//--> const url= "http://localhost:1337/api" o la del remoto
hideBtn();
hideBtnSup();
requestRecipes();

function hideBtn() {
  const token = localStorage.getItem("jwt");
  if (!token) {
    document.getElementById("addRecipeBtn").style.visibility = "hidden";
  }
}
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
  console.log(data);
  const listRecipes = document.getElementById("lista-recetas");
  listRecipes.innerHTML = "";
  for (const receta of data) {
    const a = document.createElement("a");
    const div = document.createElement("div");
    const titulo = document.createElement("h2");
    const foto = document.createElement("img");

    a.classList.add("card");
    div.classList.add("cont-recipe");
    titulo.classList.add("card-title");
    foto.classList.add("card-img-bottom");

    a.href = "recetas-id.html?idreceta=" + receta.id;
    foto.src = receta.attributes.foto;
    titulo.textContent = receta.attributes.titulo;

    div.appendChild(titulo);
    div.appendChild(foto);
    a.appendChild(div);
    listRecipes.appendChild(a);
  }
}

function showRecipesMoreInfo(data) {
  const listRecipes = document.getElementById("lista-recetas");
  listRecipes.innerHTML = "";
  for (const receta of data) {
    const div = document.createElement("div");
    const titulo = document.createElement("h2");
    const foto = document.createElement("img");
    const ingredientes = document.createElement("ul");
    const descripcion = document.createElement("p");

    div.classList.add("contenedor");
    foto.classList.add("imagen-receta");

    foto.src = receta.attributes.foto;
    titulo.textContent = receta.attributes.titulo;

    for (var ingrediente of receta.attributes.ingredientes.data) {
      const ingredienteItem = document.createElement("li");

      ingredienteItem.innerText += ingrediente.attributes.cantidad;
      ingredienteItem.innerText += "  ";
      ingredienteItem.innerText += ingrediente.attributes.Unidades + " de";
      ingredienteItem.innerText += "  ";
      ingredienteItem.innerText += ingrediente.attributes.nombre;
      ingredientes.appendChild(ingredienteItem);
    }

    descripcion.textContent = receta.attributes.descripcion;
    descripcion.innerHTML = descripcion.innerHTML.replaceAll("\n", "<br/>");

    div.appendChild(foto);
    div.appendChild(titulo);
    div.appendChild(ingredientes);
    div.appendChild(descripcion);
    listRecipes.appendChild(div);
  }
}
const borrar = document.getElementById("btRequest2");
borrar.addEventListener("click", () => {
  deleteData();
});

function deleteData() {
  localStorage.removeItem("jwt");
  window.location.href = "recetas.html";
}
