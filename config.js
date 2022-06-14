function isTokenExpired() {
  const token = localStorage.getItem("jwt");

  if (!token) return true;
  try {
    const expiry = JSON.parse(atob(token.split(".")[1])).exp;
    const now = Math.floor(new Date().getTime() / 1000);

    return now >= expiry;
  } catch (error) {
    return true;
  }
}

function logout() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("name");
  localStorage.removeItem("id");

  window.location.href = "login.html";
}
const url = "https://proyecto-final-mayte-nuria.herokuapp.com/api";

function hideBtnSup() {
  const token = localStorage.getItem("jwt");
  const name = localStorage.getItem("name");
  if (token) {
    document.getElementById("btnLogin").style.display = "none";
    document.getElementById("btnLogup").style.display = "none";
    document.getElementById("nameUser").textContent = "¡Hola " + name + "!";
  } else {
    document.getElementById("btRequest2").style.display = "none";
  }
}
