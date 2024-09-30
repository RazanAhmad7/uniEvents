
const toggleButton = document.getElementById('dark-mode-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    // Toggle dark-mode class on body
    body.classList.toggle('dark-mode');

    // Update the button text based on current mode
    if (body.classList.contains('dark-mode')) {
        toggleButton.textContent = 'Light Mode';
    } else {
        toggleButton.textContent = 'Dark Mode';
    }
});


// Fetch the selected event ID from localStorage
const clickedEventId = localStorage.getItem("selectedEventId");

// Retrieve the event data from localStorage using the ID
const event = JSON.parse(localStorage.getItem(clickedEventId));

const container = document.querySelector(".details-container");

// Use innerHTML to insert the entire structure at once
container.innerHTML = `
        <div class="title">
            <h1>${event.title}</h1>
        </div>

        <div class="right">

        
            <div class="image">
                <img src="${event.image}" alt="">
            </div>



            <div class="details-box">
            
            <div class="info-cards">
                <div class="info-card">
                    <i class="fa-solid fa-location-dot"></i>Location : ${event.location}
                </div>
                <div class="info-card">
                    <i class="fa-regular fa-calendar"></i>Date : ${event.date}
                </div>
                <div class="info-card">
                    <i class="fa-regular fa-clock" ></i>Time : ${event.time}
                </div>
            </div>
    
            <div class="full-desc">
                <p>${event.fullDesc}
                </p>
            </div>
        </div>
    </div>
    `;