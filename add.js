hideBtnSup();
const ingredients = [];

const ingredientNameInput = document.getElementById("new-ingredient-name");
const ingredientAmountInput = document.getElementById("new-ingredient-amount");
const ingredientMeasureInput = document.getElementById(
  "new-ingredient-measure"
);

const addIngredientButton = document.getElementById("add-ingredient-button");
const ingredientsContainer = document.querySelector(".ingredients");

ingredientsContainer.classList.add("ingredientsContainer");
addIngredientButton.classList.add("button-");

if (!ingredientsContainer) {
  throw new Error("Ingredients container not found");
}

const createIngredientItem = (data) => {
  const ingredientContainer = document.createElement("li");
  console.log(data);
  const ingredient = data.data.attributes;
  const ingredientText = document.createElement("p");
  ingredientText.innerHTML = `${ingredient.cantidad} ${ingredient.Unidades}  de ${ingredient.nombre}   `;

  const ingredientRemovalButton = document.createElement("button");
  ingredientRemovalButton.innerHTML = "";

  ingredientContainer.classList.add("ingredientContainer");
  ingredientRemovalButton.classList.add("btn-close");

  ingredientRemovalButton.addEventListener("click", () => {
    ingredientContainer.remove();
    borrarIngrediente(data.data.id);
  });

  ingredientContainer.appendChild(ingredientText);
  ingredientContainer.appendChild(ingredientRemovalButton);

  return ingredientContainer;
};

addIngredientButton.addEventListener("click", (e) => {
  e.preventDefault();

  let nombre, cantidad, Unidades;

  if (ingredientNameInput) {
    nombre = ingredientNameInput.value;
  } else {
    throw new Error("Añade un ingrediente");
  }

  if (ingredientAmountInput) {
    cantidad = ingredientAmountInput.value;
  } else {
    throw new Error("Añade una cantidad");
  }

  if (ingredientMeasureInput) {
    Unidades = ingredientMeasureInput.value;
  } else {
    throw new Error("Elige una unidad");
  }

  if (!nombre || cantidad === undefined || !Unidades) {
    return;
  }
  const ingredient = { nombre, cantidad, Unidades };
  añadirIngrediente(ingredient);
});

const createRecipeButton = document.getElementById("crearReceta");
createRecipeButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const tituloReceta = document.getElementById("titulo");
  const descripcionReceta = document.getElementById("descripcion");
  const fotoReceta = document.getElementById("foto");
  const idUser = localStorage.getItem("id");

  var raw = JSON.stringify({
    data: {
      titulo: tituloReceta.value,
      descripcion: descripcionReceta.value,
      foto: fotoReceta.value,
      ingredientes: ingredients,
      user: idUser,
    },
  });

  try {
    const token = localStorage.getItem("jwt");
    const response = await fetch(`${url}/recetas`, {
      method: "POST",
      body: raw,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status == 401) {
        logout();
        return;
      } else {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }
    }
    const data = await response.json();
    console.log(data);

    location.href = "recetas.html";
  } catch (error) {
    console.log(error);
  }
});

/* Post ingrediente */
async function añadirIngrediente(ingredient) {
  try {
    const token = localStorage.getItem("jwt");

    var raw = JSON.stringify({
      data: ingredient,
    });
    const response = await fetch(`${url}/ingredientes/`, {
      method: "POST",
      body: raw,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();

    ingredients.push(data.data.id);
    ingredientsContainer.appendChild(createIngredientItem(data));

    ingredientNameInput.value = "";
    ingredientAmountInput.value = "";
    ingredientMeasureInput.value = "";
  } catch (error) {
    console.log(error);
  }
}

/* DELETE ingrediente*/

async function borrarIngrediente(id) {
  try {
    const token = localStorage.getItem("jwt");

    const response = await fetch(`${url}/ingredientes/` + id, {
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

const borrar = document.getElementById("btRequest2");
borrar.addEventListener("click", () => {
  deleteData();
});

function deleteData() {
  localStorage.removeItem("jwt");
  window.location.href = "index.html";
}
