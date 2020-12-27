const authBtn = document.querySelector(".auth");
const logoutBtn = document.querySelector(".logout");
const token = localStorage.getItem("token");

window.addEventListener("load", () => {
  if (token) {
    authBtn.innerContent = "";
  }
});
