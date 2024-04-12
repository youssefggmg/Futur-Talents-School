// Select elements from the DOM
let form = document.getElementById("signupForm");
let submit = document.getElementById("submit");
let error = document.getElementById("error");
let nameInput = document.getElementById("fullname");
let emailInput = document.getElementById("gmail");
let passwordInput = document.getElementById("password");
let CurrentLocalStorageUser = JSON.parse(localStorage.getItem("users")) || []; // Initialize as empty array if null
let idCounter = CurrentLocalStorageUser.length + 1; // Initialize the ID counter

// Function to check if email exists in local storage
function emailExists(email) {
    return CurrentLocalStorageUser.some(user => user.email === email);
}

submit.addEventListener("click",(e) => {
    e.preventDefault();
    // clearing previous errors 
    error.innerText = "";

    let name = nameInput.value.trim(); // Removing any leading or trailing spaces from the input field value
    let email = emailInput.value.trim(); // Removing any leading or trailing spaces from the input field value
    let password = passwordInput.value.trim(); // Removing any leading or trailing spaces from the input field value

    // checking for empty fields & valid inputs

    if (name === "" || name.length < 4) {
        error.innerText = "Please enter a valid name (at least 4 characters).";
        return;
    }

    if (emailExists(email)) {
        error.innerText = "This email is already registered. Please use a different email.";
        return;
    }

    if (password.length < 6) {
        error.innerText = "Please enter a valid password (at least 6 characters).";
        return;
    }

    // Store user data in local storage
    const user = {
        id: idCounter,
        fullname: name,
        email: email,
        password: password,
    };
    CurrentLocalStorageUser.push(user);
    localStorage.setItem('users', JSON.stringify(CurrentLocalStorageUser));

    // Redirect to login page after sign up
    window.location.replace("Futur Talents School sign in.html");
});
