// Initialize and add the map
function initMap() {
  // The location of bolton college 53.574288, -2.436932
  const uluru = { lat: 53.574288, lng: -2.436932 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

window.initMap = initMap;