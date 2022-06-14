const form = document.getElementById("form");

const loginError = document.getElementById("login-error");


form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendData(form);
});
async function sendData(form) {
  try {
    const formData = new FormData(form);
    const queryString = new URLSearchParams(formData).toString();
    const response = await fetch(`${url}/auth/local`, {
      method: "POST",
      body: queryString,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }
    const users = await response.json();
    showData(users);
  } catch (error) {
    //alert("Error al iniciar sesión");
    loginError.innerText = "Error al iniciar sesión";
    console.log("chachoooo el error muchacho");
    console.log(error);
  }
}

function showData(users) {
  localStorage.setItem("jwt", users.jwt);
  localStorage.setItem("id", users.user.id);
  localStorage.setItem("name", users.user.name);

  window.location.href = "/index.html";
}

function checkToken() {
  if (!isTokenExpired()) {
    window.location.href = "index.html";
  }
}
checkToken();
