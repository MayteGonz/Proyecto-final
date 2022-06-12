const ingredients = [];
window.onload = () => {
  const addIngredientButton = document.getElementById("add-ingredient-button");
  const ingredientsContainer = document.querySelector(".ingredients");

  ingredientsContainer.classList.add("ingredientsContainer");
  addIngredientButton.classList.add("button-");

  if (!ingredientsContainer) {
    throw new Error("Ingredients container not found");
  }

  const createIngredientItem = (ingredient) => {
    const ingredientContainer = document.createElement("li");

    const ingredientText = document.createElement("p");
    ingredientText.innerHTML = `${ingredient.cantidad} ${ingredient.Unidades}  de ${ingredient.nombre}   `;

    const ingredientRemovalButton = document.createElement("button");
    ingredientRemovalButton.innerHTML = "";

    ingredientContainer.classList.add("ingredientContainer");
    ingredientRemovalButton.classList.add("btn-close");

    ingredientRemovalButton.addEventListener("click", () => {
      ingredientContainer.remove();
    });

    ingredientContainer.appendChild(ingredientText);
    ingredientContainer.appendChild(ingredientRemovalButton);

    return ingredientContainer;
  };

  addIngredientButton.addEventListener("click", (e) => {
    e.preventDefault();
    const ingredientNameInput = document.getElementById("new-ingredient-name");
    const ingredientAmountInput = document.getElementById(
      "new-ingredient-amount"
    );
    const ingredientMeasureInput = document.getElementById(
      "new-ingredient-measure"
    );

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

    ingredients.push(ingredient);

    ingredientsContainer.appendChild(createIngredientItem(ingredient));
  });

  const createRecipeButton = document.getElementById("crearReceta");
  createRecipeButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const tituloReceta = document.getElementById("titulo");
    const descripcionReceta = document.getElementById("descripcion");
    const fotoReceta = document.getElementById("foto");
    const ingredientesReceta = document.getElementById("ingredientes");

    var raw = JSON.stringify({
      data: {
        titulo: tituloReceta.value,
        descripcion: descripcionReceta.value,
        foto: fotoReceta.value,
        ingredientes: [],
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
      //fUNCION QUE MUESTRE LO QUE ACABO DE PONER O REDIRECCIONE HACIA ATRAS MOSTRANDO UN MENSAJE DE GUARDADO
    } catch (error) {
      console.log(error);
      //Mostrar error al usuario mediante css o js
    }
  });
};
