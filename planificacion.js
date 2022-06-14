hideBtnSup();
const borrar = document.getElementById("btRequest2");
borrar.addEventListener("click", () => {
  deleteData();
});

function deleteData() {
  localStorage.removeItem("jwt");
  window.location.href = "index.html";
}
