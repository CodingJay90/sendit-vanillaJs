const parcel_id = window.location.search.substr(2);
const role = localStorage.getItem("role")

const form = document.querySelector("form");

window.addEventListener("load", () => {
  if(role !== "admin") {
    const myToast = Toastify({
      text: "You do not have access to thos route",
      duration: 2500,
      backgroundColor: "linear-gradient(135deg, #73a5ff, #5477f5)",
      close: true,
      position: "left",
      stopOnFocus: true,
    });
    myToast.showToast();
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 2501);
  }
})

const editDestination = (e) => {
  e.preventDefault();
  //grab form values
  const location = form.location.value;

  fetch(`https://sendit-parcel.herokuapp.com/parcels/${parcel_id}/location`, {
    method: "PUT",
    body: JSON.stringify({
      location,
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
        window.location.href = "../userDashboard.html";
        alert(data.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

form.addEventListener("submit", editDestination);
