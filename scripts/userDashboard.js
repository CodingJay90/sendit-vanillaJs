const userId = localStorage.getItem("currentUserId");
const token = localStorage.getItem("token");
const orderWrapper = document.querySelector(".orders");

const loadContent = () => {
  if (!token) {
    const myToast = Toastify({
      text: "You are unauthenticated, you need to be logged in to view orders",
      duration: 2500,
      backgroundColor: "linear-gradient(135deg, #73a5ff, #5477f5)",
      close: true,
      position: "left",
      stopOnFocus: true,
    });
    myToast.showToast();
    setTimeout(() => {
      window.location.href = "../pages/login.html";
    }, 2501);
  }
  fetch(`https://sendit-parcel.herokuapp.com/parcels/${userId}`, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.msg === "You do not have any parcel order yet") {
        orderWrapper.innerHTML = data.msg + ", start by creating order";
      } else {
        data.map((item, index) => {
          orderWrapper.innerHTML += `
        <div class="order-item">
            <p>Recipient name: <span id="name">${item.recipient_name}</span></p>
            <p>Recipient Mobile No: <span id="phone_no">${item.recipient_phone_no}</span></p>
            <p>Pickup Location: <span id="location">${item.pickup_location}</span></p>
            <p>Destination: <span id="destination">${item.destination}</span></p>
            <p>Status: <span id="status">${item.status}</span></p>
            <p>Parcel Id: <span id="id">${item.id}</span></p>
            <div>
                <a href="../pages/editPickupDestination.html?/${item.id}" >Edit</a>
                <button class="btn" id="cancel-btn" data-status=${item.status} onclick='cancelOrder(${item.id})'>Cancel order</button>
            </div>
        </div>
        `;
        });
      }

      document.querySelectorAll("#cancel-btn").forEach((i) => {
        if (i.dataset.status === "cancelled") {
          i.classList.add("none");
        }
      });
    });
};
window.addEventListener("load", loadContent);

const cancelOrder = (id) => {
  fetch(`https://sendit-parcel.herokuapp.com/parcels/${id}/cancel`, {
    method: "PUT",
    body: JSON.stringify({ user_id: localStorage.getItem("currentUserId") }),
    headers: {
      "Content-type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        const myToast = Toastify({
          text: data.msg,
          duration: 2500,
          backgroundColor: "linear-gradient(135deg, #73a5ff, #5477f5)",
          close: true,
          position: "left",
          stopOnFocus: true,
        });
        myToast.showToast();
        setTimeout(() => window.location.reload(), 2501);
      }
    })
    .catch((err) => console.log(err));
};
