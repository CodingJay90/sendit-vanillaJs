const form = document.querySelector("form");

const loginUser = (e) => {
  e.preventDefault();
  //grab form values
  const email = form.email.value;
  const password = form.password.value;

  fetch("http://localhost:5000/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-type": "Application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("token", data.token);
      if (data.success) {
        window.location.href = "../pages/userDashboard.html";
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

form.addEventListener("submit", loginUser);
