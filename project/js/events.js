function fetchAndStoreData() {
  fetch("../jsonData.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("events", JSON.stringify(data));
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
var events = JSON.parse(localStorage.getItem("events"));

// events.events.forEach((element) => {
//   localStorage.setItem(element.id, JSON.stringify(element));
// });

window.onload = function () {
  fetchAndStoreData();
  displayContent(1);
};

let currentPage = 1; // Start on the first page
const eventsPerPage = 6; // Define how many events per page

function displayContent(page) {
  // Update the current page
  currentPage = page;

  // Logic to display the events for the current page
  const event = events.events; // Assuming this is your events array
  const start = (currentPage - 1) * eventsPerPage; // Calculate starting index
  const end = start + eventsPerPage; // Calculate ending index
  const eventsToDisplay = event.slice(start, end); // Get events for current page

  // Clear the existing cards
  const cardContainer = document.querySelector("#eventsCards");
  cardContainer.innerHTML = ""; // Clear previous cards

  // Create cards for the current page
  eventsToDisplay.forEach((event) => {
    createCard(event);
  });

  // Update pagination
  updatePagination(event.length);
}

function updatePagination(totalEvents) {
  const totalPages = Math.ceil(totalEvents / eventsPerPage); // Calculate total pages

  // Update the span with page numbers
  const paginationSpan = document.getElementById("span");
  paginationSpan.innerHTML = ""; // Clear previous content

  for (let i = 1; i <= totalPages; i++) {
    paginationSpan.innerHTML += `<a class="page-number" onclick="displayContent(${i})">${i}</a>`;
  }

  // Activate Previous and Next buttons
  const prevButton = document.getElementById("next");
  const nextButton = document.getElementById("perv");

  // Show/hide buttons based on the current page
  prevButton.style.display = currentPage === 1 ? "none" : "inline"; // Hide if on the first page
  nextButton.style.display = currentPage === totalPages ? "none" : "inline"; // Hide if on the last page
}

// Attach event listeners to the buttons
document.getElementById("next").addEventListener("click", () => {
  if (currentPage > 1) {
    displayContent(currentPage - 1);
  }
});

document.getElementById("perv").addEventListener("click", () => {
  if (currentPage < Math.ceil(events.events.length / eventsPerPage)) {
    displayContent(currentPage + 1);
  }
});

function createCard(event) {
  const card = document.querySelector("#eventsContainer div");
  const cardElement = document.createElement("div");
  cardElement.innerHTML = `
      <div class="eventCard" id="">
      <img src="${event.image}" alt="Event Photo" class="eventImage">
      <div class="eventDateTime">
      <i class="fa-regular fa-calendar"></i> ${event.date} ${event.time}
      </div>
      <div class="eventDetails">
          <h3>${event.title}</h3>
          <p class="eventLocation">
              <i class="fa-solid fa-location-dot"></i> ${event.location} 
          </p>
      `;
  card.appendChild(cardElement);

  cardElement.onclick = function () {
    // store the clicked event obj with its id as a key
    localStorage.setItem(event.id, JSON.stringify(event));
    // get the clicked event's id and send it to showDetails function
    let clickedEvent = JSON.parse(localStorage.getItem(event.id)).id;
    showDetails(clickedEvent);
  };
}

function showDetails(clickedEvent) {
  // Store the selected event ID in localStorage or pass through URL
  localStorage.setItem("selectedEventId", clickedEvent);

  // Redirect to the details page
  window.location.href = "eventDetails.html"; // Redirect to a page where details will be shown
}

function searchByFaculty() {
  let specificEvents = [];
  let faculty;

  // Get the selected value from the input
  const selectedValue = document.getElementById("searchByFaculty").value;
  console.log(selectedValue);

  // Map selected faculty to corresponding category
  switch (selectedValue) {
    case "Faculty of Information Technology":
      faculty = "it";
      break;
    case "Faculty of Medicine":
      faculty = "med";
      break;
    case "Faculty of Engineering":
      faculty = "eng";
      break;
    default:
      console.log("No valid faculty selected");
      return; // Exit if no valid faculty is selected
  }
  console.log(faculty);
  // Filter events based on the selected faculty category
  for (let i = 0; i < events.events.length; i++) {
    if (faculty === events.events[i].category) {
      specificEvents.push(events.events[i]);
    }
  }

  displayChoosenEvents(specificEvents);
}

function displayChoosenEvents(array) {
  const card = document.querySelector("#eventsContainer div");
  card.innerHTML = "";

  array.forEach((element) => {
    createCard(element);
  });
  document.getElementById("span").style.display = "none";
  document.getElementById("next").style.display = "none";
  document.getElementById("perv").style.display = "none";
}





window.transitionToPage = function(href) {
  document.querySelector('body').style.opacity = 0
  setTimeout(function() { 
      window.location.href = href
  }, 500)
}

document.addEventListener('DOMContentLoaded', function(event) {
  document.querySelector('body').style.opacity = 1
})