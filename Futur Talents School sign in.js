// Selecting the elements
let form = document.getElementById("signupForm");
let error = document.getElementById("error");
let emailInput = document.getElementById("gmail");
let passwordInput = document.getElementById("password");
let submit= document.getElementById("submit");

// admin acount
let adminEmail=`iamtheadmine@gmail.com`;
let adminpassword= `iamtheadmine`;

// geting the user acounts
let CurrentLocalStorageUser = JSON.parse(localStorage.getItem("users")) || [];


submit.addEventListener("click",(e)=> {
    e.preventDefault();

    let email = emailInput.value; //geting the value of the inpus 
    let pass = passwordInput.value;

    let userFound = false; // Flag to track if a matching user is found
    // Check if the user is the admin
    if (email === adminEmail && pass === adminpassword) {
        window.location.replace("./admine enter face/futur-talents-school admine main.html");
    }

    // Loop through the array of users to find a match
    else{
        CurrentLocalStorageUser.forEach(user => {
            if (user.email === email && user.password === pass) {
                userFound = true;
                return; // Exit the loop early since we found a match
            }
        });
        // Set error message based on whether a matching user was found
        if (!userFound) {
            error.innerHTML = "Invalid email or password";
        } else {
            error.innerHTML = "Account logged in successfully";
    
            // Saving the current user account into the local 
            let UserAcount= CurrentLocalStorageUser.find(u=>{ return u.email === email})
            
            sessionStorage.setItem('currentUser',JSON.stringify(UserAcount));
    
            window.location.href="./sudent inter face/futur-talents-school student main.html";
        }
    }
    
});

// if the user is already logged in 

if (sessionStorage.getItem("currentUser")!== null) {
    window.location.href="./sudent inter face/futur-talents-school student main.html";
}
