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
  fetch("https://sendit-parcel.herokuapp.com/auth/user", {
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
  const myToast = Toastify({
    text: "Loging You out",
    duration: 2500,
    backgroundColor: "linear-gradient(135deg, #73a5ff, #5477f5)",
    close: true,
    position: "left",
    stopOnFocus: true,
  });
  myToast.showToast();
  localStorage.removeItem("token");
  localStorage.removeItem("currentUserId");
  setTimeout(() => (window.location.href = "https://codingjay90.github.io/sendit-vanillaJs/"), 2501);
});