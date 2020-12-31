const form = document.querySelector("form");

const registerUser = (e) => {
  e.preventDefault();
  //grab form values
  const first_name = form.first_name.value;
  const last_name = form.last_name.value;
  const email = form.email.value;
  const phone_no = form.phone_no.value;
  const password = form.email.value;

  fetch("https://sendit-parcel.herokuapp.com/auth/register", {
    method: "POST",
    body: JSON.stringify({ first_name, last_name, email, phone_no, password }),
    headers: {
      "Content-type": "Application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        window.location.href = "../userDashboard.html";
        localStorage.setItem("currentUserId", data.userId);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", "member");
      } else {
        data.errors.map((error) => {
          const myToast = Toastify({
            text: error.msg,
            duration: 5000,
            backgroundColor: "linear-gradient(135deg, #73a5ff, #5477f5)",
            close: true,
            position: "left",
            stopOnFocus: true,
          });
          myToast.showToast();
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

form.addEventListener("submit", registerUser);
