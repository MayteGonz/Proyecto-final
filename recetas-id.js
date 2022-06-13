requestRecipe();

async function requestRecipe() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("idreceta");
    const response = await fetch(`${url}/recetas/` + id + `?populate=*`);

    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }
    const recipeResponse = await response.json();
    console.log(recipeResponse);

    showRecipesMoreInfo(recipeResponse.data);
  } catch (error) {
    console.log(error);
  }
}

function showRecipesMoreInfo(data) {
  const listRecipes = document.getElementById("lista-recetas");
  listRecipes.innerHTML = "";

  receta = data;

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

  div.appendChild(titulo);
  div.appendChild(foto);
  div.appendChild(ingredientes);
  div.appendChild(descripcion);
  listRecipes.appendChild(div);
}
const borrar = document.getElementById("btRequest2");
borrar.addEventListener("click", () => {
  deleteData();
});

function deleteData() {
  localStorage.removeItem("jwt");
  window.location.href = "recetas.html";
}