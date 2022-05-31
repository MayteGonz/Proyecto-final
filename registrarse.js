const input = document.getElementById("input");
const result = document.getElementById("result");
input.oninput = function () {
  result.value = input.value;
};
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendData(form);
});

async function sendData(form) {
  try {
    const formData = new FormData(form);
    const queryString = new URLSearchParams(formData).toString();
    const response = await fetch(`${url}/auth/local/register`, {
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
    const data = await response.json();
    showData(data);
  } catch (error) {
    console.log(error);
  }
}

function showData(data) {
  localStorage.setItem("jwt", data.jwt);

  //console.log(users.jwt);
  window.location.href = "/index.html";
}

function checkToken() {
  if (!isTokenExpired()) {
    window.location.href = "index.html";
  }
}
checkToken();
