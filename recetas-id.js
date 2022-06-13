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
  const divSup = document.createElement("div");
  const foto = document.createElement("img");
  const allingredientes = document.createElement("div");
  const titleingredientes = document.createElement("h4");
  const ingredientes = document.createElement("ul");
  const alldescripcion = document.createElement("div");
  const titledescripcion = document.createElement("h4");
  const descripcion = document.createElement("p");

  div.classList.add("compl-receta");
  titulo.classList.add("tit-receta");
  foto.classList.add("img-receta");
  divSup.classList.add("div-sup");
  allingredientes.classList.add("div-ingredientes");
  titleingredientes.classList.add("tit-ingr");
  ingredientes.classList.add("ingre-receta");
  alldescripcion.classList.add("div-description");
  descripcion.classList.add("des-receta");
  titledescripcion.classList.add("tit-desc");

  foto.src = receta.attributes.foto;
  titulo.textContent = receta.attributes.titulo;
  titleingredientes.textContent = "Ingredientes:";

  for (var ingrediente of receta.attributes.ingredientes.data) {
    const ingredienteItem = document.createElement("li");

    ingredienteItem.innerText += ingrediente.attributes.cantidad;
    ingredienteItem.innerText += "  ";
    ingredienteItem.innerText += ingrediente.attributes.Unidades + " de";
    ingredienteItem.innerText += "  ";
    ingredienteItem.innerText += ingrediente.attributes.nombre;
    ingredientes.appendChild(ingredienteItem);
  }
  titledescripcion.textContent = "Preparación:";
  descripcion.textContent = receta.attributes.descripcion;
  descripcion.innerHTML = descripcion.innerHTML.replaceAll("\n", "<br/>");

  div.appendChild(titulo);
  divSup.appendChild(foto);
  allingredientes.appendChild(titleingredientes);
  allingredientes.appendChild(ingredientes);
  divSup.appendChild(allingredientes);
  div.appendChild(divSup);
  alldescripcion.appendChild(titledescripcion);
  alldescripcion.appendChild(descripcion);
  div.appendChild(alldescripcion);
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

/* Borrar receta*/

const btnDelete = document.getElementById("btnDelete");
btnDelete.addEventListener("click", () => {
  borrarReceta();
});
async function borrarReceta() {
  try {
    const token = localStorage.getItem("jwt");
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("idreceta");
    const response = await fetch(`${url}/recetas/` + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }
  } catch (error) {
    console.log(error);
  }
}
