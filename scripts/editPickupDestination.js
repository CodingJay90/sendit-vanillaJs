const parcel_id = window.location.search.substr(2);

const form = document.querySelector("form");

const editDestination = (e) => {
  e.preventDefault();
  //grab form values
  const destination = form.destination.value;

  fetch(`http://localhost:5000/parcels/${parcel_id}/destination`, {
    method: "PUT",
    body: JSON.stringify({
      destination,
      user_id: localStorage.getItem("currentUserId"),
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

form.addEventListener("submit", editDestination);
