function applyDarkMode() {
    const isDarkMode = localStorage.getItem('dark-mode') === 'enabled';
    const imgElement = document.querySelector('#dark-mode-toggle img');

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        imgElement.src = '../assets/night-mode-removebg-preview.webp'; // Change to dark mode icon
    } else {
        document.body.classList.remove('dark-mode');
        imgElement.src = '../assets/light-mode_1.png'; // Change to light mode icon
    }
}

function darkModeToggle() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const imgElement = document.querySelector('#dark-mode-toggle img');

    if (isDarkMode) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('dark-mode', 'disabled');
        imgElement.src = '../assets/light-mode_1.png'; // Switch to light mode icon
    } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('dark-mode', 'enabled');
        imgElement.src = '../assets/night-mode-removebg-preview.webp'; // Switch to dark mode icon
    }
}

// Apply dark mode on page load based on localStorage value
applyDarkMode();

// Add event listener to the dark mode toggle button
document.getElementById('dark-mode-toggle').addEventListener('click', darkModeToggle);
