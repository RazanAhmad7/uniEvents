

function fetchAndStoreData() {
    fetch('../jsonData.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    return response.json(); 
  })
  .then(data => {
    localStorage.setItem("events", JSON.stringify(data));  
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}
var events =JSON.parse(localStorage.getItem("events"));
console.log(events);
window.onload = function(){
     fetchAndStoreData();
     displayContent(events);
    };



function displayContent(elements){

    const card = document.querySelector("#eventsContainer div");
    card.innerHTML = '';
        for (const key in elements) {
            for (var i = 0; i < elements[key].length; i++) {
            const cardElement = document.createElement('div');
            cardElement.innerHTML = `
            <div class="eventCard" id="eventsCard">
            <img src="${elements[key][i].image}" alt="Event Photo" class="eventImage">
            <div class="eventDateTime">
            <i class="fa-regular fa-calendar"></i> ${elements[key][i].date} ${elements[key][i].time}
            </div>
            <div class="eventDetails">
                <h3>${elements[key][i].title}</h3>
                <p class="eventLocation">
                    <i class="fa-solid fa-location-dot"></i> ${elements[key][i].location} 
                </p>
        `;
        card.appendChild(cardElement);
 }
}
}