// Fetch the selected event ID from localStorage
const clickedEventId = localStorage.getItem("selectedEventId");

// Retrieve the event data from localStorage using the ID
const event = JSON.parse(localStorage.getItem(clickedEventId));

const container = document.querySelector(".details-container");

// Use innerHTML to insert the entire structure at once
container.innerHTML = `
        <div class="details-box">
            <div class="title">
                <h1>${event.title}</h1>
            </div>
            
            <div class="image">
                <img src="${event.image}" alt="${event.title}">
            </div>
    
            <div class="info-cards">
                <div class="info-card">
                    <i class="fa-solid fa-location-dot"></i> Location: ${event.location}
                </div>
                <div class="info-card">
                    <i class="fa-regular fa-calendar"></i> Date: ${event.date}
                </div>
                <div class="info-card">
                    <i class="fa-regular fa-clock"></i> Time: ${event.time}
                </div>
            </div>
    
            <div class="full-desc">
                <p>${event.fullDesc}</p>
            </div>
        </div>
    `;
