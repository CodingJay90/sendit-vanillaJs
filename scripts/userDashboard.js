const userId = localStorage.getItem("currentUserId");
const token = localStorage.getItem("token");
const orderWrapper = document.querySelector(".orders");

const loadContent = () => {
  if (!token) {
    alert("You are authenticated, you nned to be logged to view orders");
    window.location.href = "../pages/login.html";
  }
  fetch(`http://localhost:5000/parcels/${userId}`, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
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
      document.querySelectorAll("#cancel-btn").forEach((i) => {
        if (i.dataset.status === "cancelled") {
          i.classList.add("none");
        }
      });
    });
};
window.addEventListener("load", loadContent);

const cancelOrder = (id) => {
  fetch(`http://localhost:5000/parcels/${id}/cancel`, {
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
        window.location.reload();
      }
    })
    .catch((err) => console.log(err));
};