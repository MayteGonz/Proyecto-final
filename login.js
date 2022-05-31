const form = document.getElementById("form");
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
    console.log(error);
  }
}

function showData(users) {
  localStorage.setItem("jwt", users.jwt);
  window.location.href = "/index.html";
}

function checkToken() {
  if (!isTokenExpired()) {
    window.location.href = "index.html";
  }
}
checkToken();
