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
      window.location.href = "../login.html";
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
                <a href="./editPickupDestination.html?/${item.id}" >Edit</a>
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

function initMap() {
  const bounds = new google.maps.LatLngBounds();
  const markersArray = [];
  const origin1 = { lat: 55.93, lng: -3.118 };
  const origin2 = "Greenwich, England";
  const destinationA = "Stockholm, Sweden";
  const destinationB = { lat: 50.087, lng: 14.421 };
  const destinationIcon =
    "https://chart.googleapis.com/chart?" +
    "chst=d_map_pin_letter&chld=D|FF0000|000000";
  const originIcon =
    "https://chart.googleapis.com/chart?" +
    "chst=d_map_pin_letter&chld=O|FFFF00|000000";
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 55.53, lng: 9.4 },
    zoom: 10,
  });
  const geocoder = new google.maps.Geocoder();
  const service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin1, origin2],
      destinations: [destinationA, destinationB],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    },
    (response, status) => {
      if (status !== "OK") {
        // alert("Error was: " + status);
        console.log(status);
      } else {
        const originList = response.originAddresses;
        const destinationList = response.destinationAddresses;
        const outputDiv = document.getElementById("output");
        outputDiv.innerHTML = "";
        deleteMarkers(markersArray);

        const showGeocodedAddressOnMap = function (asDestination) {
          const icon = asDestination ? destinationIcon : originIcon;

          return function (results, status) {
            if (status === "OK") {
              map.fitBounds(bounds.extend(results[0].geometry.location));
              markersArray.push(
                new google.maps.Marker({
                  map,
                  position: results[0].geometry.location,
                  icon: icon,
                })
              );
            } else {
              alert("Geocode was not successful due to: " + status);
            }
          };
        };

        for (let i = 0; i < originList.length; i++) {
          const results = response.rows[i].elements;
          geocoder.geocode(
            { address: originList[i] },
            showGeocodedAddressOnMap(false)
          );

          for (let j = 0; j < results.length; j++) {
            geocoder.geocode(
              { address: destinationList[j] },
              showGeocodedAddressOnMap(true)
            );
            outputDiv.innerHTML +=
              originList[i] +
              " to " +
              destinationList[j] +
              ": " +
              results[j].distance.text +
              " in " +
              results[j].duration.text +
              "<br>";
          }
        }
      }
    }
  );
}

function deleteMarkers(markersArray) {
  for (let i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}
