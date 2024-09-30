document.addEventListener('DOMContentLoaded', function () {
  let events = JSON.parse(localStorage.getItem('events')) || []; // Fetch events from local storage or initialize an empty array

  // Check if events exist in local storage, if not fetch from JSON file
  if (!events.length) {
    fetch('../jsonData.json') // Assuming jsonData.json contains the events
      .then(response => response.json())
      .then(data => {
        events = data.events; // Store fetched events
        localStorage.setItem('events', JSON.stringify(events)); // Save fetched data to local storage
        populateEvents(events);
        updateCards(events);
      });
  } else {
    populateEvents(events); // Populate from localStorage
    updateCards(events); // Update card totals
  }

  document.getElementById('image').addEventListener('change', function(event) {
      const reader = new FileReader();
      
      reader.onload = function() {
          const preview = document.getElementById('imagePreview');
          preview.src = reader.result;
          preview.style.display = 'block'; // Show the preview
      };
      
      // Read the uploaded file as a data URL
      reader.readAsDataURL(event.target.files[0]);
  });

  function populateEvents(events) {
    const eventsTableBody = document.querySelector('#eventsTable tbody');
    eventsTableBody.innerHTML = ''; // Clear table

    events.forEach(event => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${event.title}</td>
        <td>${event.date}</td>
        <td>${event.location}</td>
        <td>${event.time}</td>
        <td>${event.category.toUpperCase()}</td>
        <td>
          <div class="action-buttons">
              <button class="edit-btn" data-id="${event.id}">Edit</button>
              <button class="delete-btn" data-id="${event.id}">Delete</button>
          </div>
        </td>
      `;
      eventsTableBody.appendChild(row);
    });

    // Add event listeners for edit buttons
    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', function() {
        const eventId = this.dataset.id;
        const eventToEdit = events.find(e => e.id == eventId);
        openModal(eventToEdit);
      });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const eventId = this.dataset.id;
            deleteEvent(eventId);
        });
    });
  }

  function updateCards(events) {
    const totalITEvents = events.filter(event => event.category === 'it').length;
    const totalMedEvents = events.filter(event => event.category === 'med').length;
    const totalEngEvents = events.filter(event => event.category === 'eng').length;

    document.getElementById('total-it-events').textContent = totalITEvents;
    document.getElementById('total-med-events').textContent = totalMedEvents;
    document.getElementById('total-eng-events').textContent = totalEngEvents;
  }

  // Search functionality
  const searchTitleInput = document.getElementById('searchTitleInput');
  const searchDateInput = document.getElementById('searchDateInput');

  searchTitleInput.addEventListener('input', filterEvents);
  searchDateInput.addEventListener('change', filterEvents);

  function filterEvents() {
    // Get search terms
    const titleSearchTerm = searchTitleInput.value.toLowerCase();
    const dateSearchTerm = searchDateInput.value; // This is in YYYY-MM-DD format

    // Log search terms to see if they are captured correctly
    console.log('Title Search Term:', titleSearchTerm);
    console.log('Date Search Term:', dateSearchTerm);

    // Filter events based on title and date search terms
    const filteredEvents = events.filter(event => {
      const matchesTitle = event.title.toLowerCase().includes(titleSearchTerm);
      const matchesDate = dateSearchTerm ? event.date === dateSearchTerm : true; // If no date is provided, return true for all

      // Log each event to see how it matches the filter
      console.log(`Event: ${event.title} | Matches Title: ${matchesTitle} | Matches Date: ${matchesDate}`);

      return matchesTitle && matchesDate; // Return events that match both criteria
    });

    // Log filtered events to verify if filtering works
    console.log('Filtered Events:', filteredEvents);

    // Populate the table with filtered events
    populateEvents(filteredEvents);
  }

  function deleteEvent(eventId) {
      // Show SweetAlert confirmation dialog before deleting the event
      Swal.fire({
          title: 'Are you sure?',
          text: "Do you really want to delete this event? This action cannot be undone.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
          if (result.isConfirmed) {
          // If confirmed, proceed with deletion
          events = events.filter(event => event.id != eventId); // Filter out the event to be deleted
          localStorage.setItem('events', JSON.stringify(events)); // Update local storage
          populateEvents(events); // Refresh the table
          updateCards(events); // Update card totals
          // Show SweetAlert success message after deletion
          Swal.fire({
              title: 'Deleted!',
              text: 'The event has been deleted.',
              icon: 'success',
              confirmButtonText: 'OK'
          });
          }
      });
}

  // Modal functionality
  const modal = document.getElementById('eventModal');
  const addEventButton = document.getElementById('addEventButton');
  const closeModal = document.querySelector('.close');
  const eventForm = document.getElementById('eventForm');

  addEventButton.onclick = () => openModal();
  closeModal.onclick = () => closeModalFunc();
  window.onclick = event => { if (event.target == modal) closeModalFunc(); };

  function openModal(eventToEdit = null) {
      modal.style.display = "flex";
      document.getElementById('modalTitle').textContent = eventToEdit ? "Edit Event" : "Add Event";
      document.getElementById('eventId').value = eventToEdit ? eventToEdit.id : '';
      document.getElementById('title').value = eventToEdit ? eventToEdit.title : '';
      document.getElementById('date').value = eventToEdit ? eventToEdit.date : '';
      document.getElementById('location').value = eventToEdit ? eventToEdit.location : '';
      document.getElementById('description').value = eventToEdit ? eventToEdit.fullDesc : '';
      document.getElementById('startTime').value = eventToEdit ? convertTo24Hour(eventToEdit.time.split(' - ')[0]) : '';
      document.getElementById('endTime').value = eventToEdit ? convertTo24Hour(eventToEdit.time.split(' - ')[1]) : '';
      document.getElementById('category').value = eventToEdit ? eventToEdit.category : '';
      const imagePreview = document.getElementById('imagePreview');
      if (eventToEdit && eventToEdit.image) {
          imagePreview.src = eventToEdit.image;
          imagePreview.style.display = "block";
      } else {
          imagePreview.style.display = "none"; // Hide if no image
      }
} 
document.getElementById('image').addEventListener('change', function(event) {
    const reader = new FileReader();
    reader.onload = function() {
      const preview = document.getElementById('imagePreview');
      preview.src = reader.result;
      preview.style.display = 'block'; // Show the preview
    };
    reader.readAsDataURL(event.target.files[0]); // Convert image to Base64 string
});

  function closeModalFunc() {
    modal.style.display = "none";
    eventForm.reset();
    document.getElementById('imagePreview').style.display = "none"; // Hide the image preview
  }

  window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeModalFunc();
  });

  eventForm.onsubmit = function(event) {
    event.preventDefault();

    const eventId = document.getElementById('eventId').value;
    const imagePreview = document.getElementById('imagePreview').src; // Fetch the current image from the preview

    const newEvent = {
      id: eventId || Date.now().toString(), // Use a timestamp as a simple ID for new events
      title: document.getElementById('title').value,
      date: document.getElementById('date').value,
      location: document.getElementById('location').value,
      fullDesc: document.getElementById('description').value,
      time: formatTime12(document.getElementById('startTime').value) + ' - ' + formatTime12(document.getElementById('endTime').value), // Store start-end time
      category: document.getElementById('category').value,
      image: imagePreview // Save the image data (Base64)
    };

    if (eventId) {
      // Edit existing event
      const index = events.findIndex(e => e.id == eventId);
      events[index] = newEvent; // Update event in the array
      Swal.fire({
      title: 'Event Updated!',
      text: 'The event has been successfully updated.',
      icon: 'success',
      confirmButtonText: 'OK'
  });
    } else {
      // Add new event
      events.push(newEvent);
      // Show SweetAlert for successful addition
      Swal.fire({
      title: 'Event Added!',
      text: 'The event has been successfully added.',
      icon: 'success',
      confirmButtonText: 'OK'
  });
    }

    localStorage.setItem('events', JSON.stringify(events)); // Update local storage with new/edited events
    populateEvents(events); // Refresh table
    updateCards(events); // Refresh card totals
    closeModalFunc();
  }
  function formatTime12(time24) {
      const [hours, minutes] = time24.split(':');
      const period = hours >= 12 ? 'PM' : 'AM';
      let hours12 = hours % 12 || 12; // Convert 0 or 24 to 12 in 12-hour format
      return `${hours12}:${minutes} ${period}`;
  }
  function convertTo24Hour(time12) {
      const [time, modifier] = time12.split(' ');
      let [hours, minutes] = time.split(':');
      if (modifier === 'PM' && hours !== '12') {
      hours = parseInt(hours, 10) + 12;
      } else if (modifier === 'AM' && hours === '12') {
      hours = '00';
      }
      return `${hours}:${minutes}`;
  }
});