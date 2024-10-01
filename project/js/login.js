const form = document.getElementById("myForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();
});

var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var email = document.getElementById("email");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirmPassword");


var nameRegex = /^[A-Za-z]{3,30}$/;
var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var passwordRegex =
  /^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,32}$/;


function validatInputs() {
  if (
    nameRegex.test(firstName.value) &&
    nameRegex.test(lastName.value) &&
    emailRegex.test(email.value)) {
    return true;
  } else return false;
}

function checkName(element) {
  let error = document.getElementById("fName-error");
  let error2 = document.getElementById("lName-error");

  var NameValue = element.value;

  error.innerHTML = " ";
  error2.innerHTML = " ";

  if (!nameRegex.test(NameValue)) {
    switch (element.id) {
      case "firstName": {
        error.innerHTML =
          "Name should be at least 3 characters and should not has a special characters or numbers";
        break;
      }

      case "lastName": {
        error2.innerHTML =
          "Name should be at least 6 characters and should not has a special characters or numbers";
        break;
      }
    }
  }
}

function passConfirmation() {
  let passError = document.getElementById("pass-conf-error");
  passError.innerHTML = "";
  if (password.value !== confirmPassword.value) {
    passError.innerHTML = "Passwords are not matched";
  }
}

var emailError = document.getElementById("email-error");
var passError = document.getElementById("pass-error");
var numError = document.getElementById("num-error");

function check(element) {
  var elementValue = element.value;

  emailError.innerHTML = " ";
  passError.innerHTML = " ";


  switch (element.id) {
    case "email": {
      if (!emailRegex.test(elementValue)) {
        emailError.innerHTML = "Please enter a valid email";
      }
      break;
    }

    case "password": {
      if (!passwordRegex.test(elementValue)) {
        passError.innerHTML =
          "Please enter a valid Password, starts with a capital letter, contains at least two numbers and has one special character.";
      }
      break;
    }
  }
}

var lEmail = document.getElementById("loginEmail");
var lPass = document.getElementById("loginPassword");

function storeData() {
  var existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  if (!Array.isArray(existingUsers)) {
    existingUsers = [];
  }

  let emailExists = false;

  for (let user of existingUsers) {
    if (email.value === user.Email) {
      emailExists = true;
      numError.innerHTML = "User already exists";
      break;
    }
  }

  if (!emailExists) {
    if (validatInputs()) {
      const newUser = {
        FirstName: firstName.value,
        LastName: lastName.value,
        Password: password.value,
        Email: email.value,
      };

      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      window.location.href = "login.html";
    } else {
      console.log("Validation error");
    }
  }
}
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Retrieve stored users from localStorage
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  
  // Check if the users array is valid
  if (!Array.isArray(existingUsers) || existingUsers.length === 0) {
    document.getElementById("login-error").textContent = "No users found. Please register first.";
    return;
  }

  // Flag to check if user is found
  let userFound = false;

  // Iterate through the users to check for a match
  for (let user of existingUsers) {
    if (user.Email === email && user.Password === password) {
      userFound = true;
      // Set the logged-in state in localStorage
      localStorage.setItem("isLoggedIn", "true");
      
      // Redirect to dashboard after successful login
      window.location.href = "admin.html";
      break;
    }
  }

  // If no match found, show an error message
  if (!userFound) {
    document.getElementById("login-error").textContent = "Invalid login credentials";
  }
}

function logout() {
  // Remove login status
  localStorage.removeItem("isLoggedIn");

  // Redirect to the login page
  window.location.href = "login.html";
}
