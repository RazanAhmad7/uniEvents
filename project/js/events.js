var events = JSON.parse(localStorage.getItem("events"));

// events.events.forEach((element) => {
//   localStorage.setItem(element.id, JSON.stringify(element));
// });

// Ensure this is triggered on page load to avoid flickering issues
window.onload = function () {
  displayContent(1);
};



let currentPage = 1; // Start on the first page
const eventsPerPage = 6; // Define how many events per page
function displayContent(page) {
  // Fade out before updating content
  document.querySelector('#eventsContainer').style.opacity = 0;

  // Wait for 500ms (or match your CSS transition time) before updating content
  setTimeout(function () {
    // Update the current page
    currentPage = page;
  // Logic to display the events for the current page
  const event = events; // Assuming this is your events array
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

    highlightActivePage(currentPage);

    // Fade in the content after it is updated
    document.querySelector('#eventsContainer').style.opacity = 1;
  }, 500); // 500ms matches the fade-out transition duration
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

function highlightActivePage(page) {
  const pageNumbers = document.querySelectorAll(".page-number");
  pageNumbers.forEach((pageNumber, index) => {
    if (index + 1 === page) {
      pageNumber.classList.add("active");
    } else {
      pageNumber.classList.remove("active");
    }
  });
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
      
      <div class="eventDetails">
          <h3>${event.title}</h3>
          <div class="eventDateTime">
          <i class="fa-regular fa-calendar"></i> ${event.date} ${event.time}
          </div>
          <p class="eventLocation">
              <i class="fa-solid fa-location-dot"></i> ${event.location} 
          </p>
       </div>
       <p class="showMore"> click to see the details! </p>
        </div>
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
  for (key in events.events) {
      if (faculty === events.events[key].category) { 
      specificEvents.push(events.events[key]);
    }
  }

  displayChoosenEvents(specificEvents);
}
const searchDateInput = document.getElementById('searchDateInput');
searchDateInput.addEventListener('change', filterEvents);

function filterEvents() {
  // Get search terms
  const dateSearchTerm = searchDateInput.value; // This is in YYYY-MM-DD format

  // Log search terms to see if they are captured correctly
  console.log('Date Search Term:', dateSearchTerm);

  // Filter events based on title and date search terms
  const filteredEvents = events.filter(event => {
    const matchesDate = dateSearchTerm ? event.date === dateSearchTerm : true; // If no date is provided, return true for all

    // Log each event to see how it matches the filter

    return matchesDate; // Return events that match both criteria
  });

  // Log filtered events to verify if filtering works
  console.log('Filtered Events:', filteredEvents);

  // Populate the table with filtered events
  createCard(filteredEvents);
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



document.addEventListener('DOMContentLoaded', function(event) {
  document.querySelector('body').style.opacity = 1
})

