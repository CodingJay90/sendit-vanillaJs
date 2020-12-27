const userId = localStorage.getItem("currentUserId");
const token = localStorage.getItem("token");
const orderWrapper = document.querySelector(".orders");

const loadContent = () => {
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
            <p>Recipient Mobile No: <span id="status">${item.recipient_phone_no}</span></p>
            <p>Pickup Location: <span id="location">${item.pickup_location}</span></p>
            <p>Destination: <span id="destination">${item.destination}</span></p>
            <p>Status: <span id="status">${item.status}</span></p>
            <p>Parcel Id: <span id="id">${item.id}</span></p>
            <a href="../pages/editPickupDestination.html?/${item.id}" >Edit</a>
        </div>
        `;
      });
    });
};
window.addEventListener("load", loadContent);
