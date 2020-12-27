const form = document.querySelector("form");

const registerUser = (e) => {
  e.preventDefault();
  //grab form values
  const first_name = form.first_name.value;
  const last_name = form.last_name.value;
  const email = form.email.value;
  const phone_no = form.phone_no.value;
  const password = form.email.value;

  fetch("http://localhost:5000/auth/register", {
    method: "POST",
    body: JSON.stringify({ first_name, last_name, email, phone_no, password }),
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
      } else {
        alert("there is an error");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

form.addEventListener("submit", registerUser);
