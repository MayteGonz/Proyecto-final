const form = document.getElementById("buscador");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    buscarRecetas(form);
});

async function buscarRecetas(form) {
    try {
        const formData = new FormData(form);

        //console.log(formData.get("cadenadebusqueda"));

        const response = await fetch(`${url}/recetas?filters[titulo][$containsi]=` + formData.get("cadenadebusqueda") + "&populate=*");
        //const response = await fetch(`${url}/recetas?populate=` + formData.get("cadenadebusqueda"));
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