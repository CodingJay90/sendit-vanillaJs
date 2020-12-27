const user_id = localStorage.getItem("currentUserId");
const form = document.querySelector("form");

const loginUser = (e) => {
  e.preventDefault();
  //grab form values
  const recipient_name = form.recipient_name.value;
  const recipient_phone_no = form.recipient_phone_no.value;
  const destination = form.destination.value;
  const pickup_location = form.pickup_location.value;

  fetch("http://localhost:5000/parcels", {
    method: "POST",
    body: JSON.stringify({
      user_id,
      pickup_location,
      destination,
      recipient_name,
      recipient_phone_no,
    }),
    headers: {
      "Content-type": "Application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        window.location.href = "../pages/userDashboard.html";
        alert(data.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

form.addEventListener("submit", loginUser);
