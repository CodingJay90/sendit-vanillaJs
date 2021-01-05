const user_id = localStorage.getItem("currentUserId");
const form = document.querySelector("form");

const loginUser = (e) => {
  e.preventDefault();
  //grab form values
  const recipient_name = form.recipient_name.value;
  const recipient_phone_no = form.recipient_phone_no.value;
  const destination = form.destination.value;
  const pickup_location = form.pickup_location.value;

  fetch("https://sendit-parcel.herokuapp.com/parcels", {
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
          () => (window.location.href = "https://codingjay90.github.io/sendit-vanillaJs/userDashboard.html"),
          3001
        );
      } else {
        data.errors.map((err) => {
          const myToast = Toastify({
            text: err.msg,
            duration: 4000,
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

form.addEventListener("submit", loginUser);