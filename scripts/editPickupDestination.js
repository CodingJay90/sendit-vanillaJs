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
        const myToast = Toastify({
          text: data.msg,
          duration: 3000,
          backgroundColor: "linear-gradient(135deg, #73a5ff, #5477f5)",
          close: true,
          position: "left",
          stopOnFocus: true,
        });
        myToast.showToast();
        setTimeout(
          () => (window.location.href = "../pages/userDashboard.html"),
          3001
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

form.addEventListener("submit", editDestination);
