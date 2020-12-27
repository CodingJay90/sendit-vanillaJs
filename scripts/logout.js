const authBtn = document.querySelectorAll(".auth");
const logoutBtn = document.querySelector("#logout");
const authToken = localStorage.getItem("token");
const user = document.querySelector(".user");

window.addEventListener("load", () => {
  if (authToken) {
    authBtn.forEach((i) => {
      i.parentElement.classList.add("none");
    });
  } else {
    logoutBtn.classList.add("none");
    user.classList.add("none");
  }
  fetch("http://localhost:5000/auth/user", {
    method: "GET",
    headers: {
      "Content-type": "Apllication/json",
      "x-access-token": authToken,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      user.innerHTML = data.first_name;
    })
    .catch((err) => {
      console.log(err);
    });
});

logoutBtn.addEventListener("click", () => {
  alert("logging you out");
  localStorage.removeItem("token");
  window.location.href = "../pages/index.html";
});
