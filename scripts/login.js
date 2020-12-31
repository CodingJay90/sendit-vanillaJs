const form = document.querySelector("form");

const loginUser = (e) => {
  e.preventDefault();
  //grab form values
  const email = form.email.value;
  const password = form.password.value;

  fetch("https://sendit-parcel.herokuapp.com/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-type": "Application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        localStorage.setItem("currentUserId", data.userId);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", "member");
        window.location.href = "../userDashboard.html";
      } else {
        const myToast = Toastify({
          text: data.message ? data.message : data,
          duration: 5000,
          backgroundColor: "linear-gradient(135deg, #73a5ff, #5477f5)",
          close: true,
          position: "left",
          stopOnFocus: true,
        });
        myToast.showToast();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

form.addEventListener("submit", loginUser);
