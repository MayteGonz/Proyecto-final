requestRecipe();

async function requestRecipe() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const response = await fetch(`${url}/recetas/` + id + `?populate=*`);
    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }
    const recipeResponse = await response.json();
    showRecipe(recipeResponse.recetas);
  } catch (error) {
    console.log(error);
  }
}

function showRecipe(recetas) {
  const recipe = document.getElementById("receta-id");
  recipe.innerHTML = "";
  for (const receta of recetas) {
    const div = document.createElement("div");
    const titulo = document.createElement("h2");
    const foto = document.createElement("img");
    const ingredientes = document.createElement("ul");
    const descripcion = document.createElement("p");

    div.classList.add("contenedor");
    foto.classList.add("imagen-receta");

    foto.src = receta.data.attributes.foto;
    titulo.textContent = receta.data.attributes.titulo;

    for (var ingrediente of receta.data.attributes.ingredientes.data) {
      const ingredienteItem = document.createElement("li");

      ingredienteItem.innerText += ingrediente.attributes.cantidad;
      ingredienteItem.innerText += "  ";
      ingredienteItem.innerText += ingrediente.attributes.Unidades + " de";
      ingredienteItem.innerText += "  ";
      ingredienteItem.innerText += ingrediente.attributes.nombre;
      ingredientes.appendChild(ingredienteItem);
    }

    descripcion.textContent = receta.data.attributes.descripcion;
    descripcion.innerHTML = descripcion.innerHTML.replaceAll("\n", "<br/>");

    div.appendChild(foto);
    div.appendChild(titulo);
    div.appendChild(ingredientes);
    div.appendChild(descripcion);
    recipe.appendChild(div);
  }
}
