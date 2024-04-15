localStorage.removeItem("AllBlockages")
// Selecting the elements
let modal1 = document.querySelector("#popup");
let logoutbutton = document.querySelector("#logout");
let addblockage = document.querySelector("#addblockag");
let profile = document.querySelector("#profile");
let UserBlockageTable = document.querySelector("#table");
let showBlockageDetailes = document.querySelector("#showBlockageDetailes");


// Get the one user that is logged in 
let userAcount = JSON.parse(sessionStorage.getItem("currentUser"));

// display user name on the profile

profile.addEventListener('mouseover', (e) => {
    profile.setAttribute("title", userAcount.fullname);
});

// check if the user is logged in or not
if (userAcount===null) {
    window.location.replace("../Futur Talents School sign in.html");
}

// Logout to sign in page 
logoutbutton.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.replace("../Futur Talents School sign in.html");
});

// Add blockege
addblockage.addEventListener('click', (e) => {
    window.location.replace("add/futur-talents-school adding blockages.html");
});



// Show the blockeg that the user has
let AllBlockages = JSON.parse(localStorage.getItem("difficulty"));
let UserBlockage = AllBlockages.filter(blockage => blockage.username === userAcount.fullname);



UserBlockage.forEach(e => {
    // Determine the class based on the value of isValid
    let style = {
        class: e.isValid==true ? "fa-solid fa-square-check fa-2xl" : "fa-solid fa-square-x fa-2xl",
        color: e.isValid==true ? "green" : "red"
    };

    // Render the row with appropriate icon class
    UserBlockageTable.innerHTML += `
        <tr data-id="${e.difficultyID}">
            <td>${e.difficultyID}</td>
            <td>${e.username}</td>
            <td>${e.date}</td>
            <td><i class="fa-solid fa-eye fa-2xl" data-id="${e.difficultyID}"></i></td>
            <td><i class="${style.class}" style="color: ${style.color}" data-id="${e.difficultyID}"></i></td>
            <td class="no-border"><i class="fa-solid fa-pen-to-square fa-xl" data-id="${e.difficultyID}"></i></td>
            <td class="no-border"><i class="fa-solid fa-trash-can fa-xl" style="color: #ff0000;" data-id="${e.difficultyID}"></i></td>
        </tr>`;
});



// most of this part was suggedted by Idder so if thear was a problem go ask him  
let eyes= document.querySelectorAll(".fa-eye");

// click on eye to show the blockage detailes
eyes.forEach(eye => {
    eye.addEventListener("click", (e) => {
        let id = parseInt(e.target.dataset.id); // Parse the id to an integer
        let index = UserBlockage.findIndex(blockage => blockage.difficultyID === id);
        console.log(index)
        let title = UserBlockage[index].title;
        let brief = UserBlockage[index].brief;
        let difficulty = UserBlockage[index].difficulty;
        let solution = UserBlockage[index].solution;
        let profcommant = UserBlockage[index].profcommant;
        // show the modal
        modal1.style.display = "block";

        // Populate modal content
        modal1.innerHTML = `
            <div id="modal-deff-content">
                <p>Blockage Title: ${title}</p>
                <br>
                <p>Blockage Brief: ${brief}</p>
                <br>
                <p>Blockage Difficulty: ${difficulty}</p>
                <br>
                <p>solution: ${solution}</p>
                <br>
                <p>peofcommant: ${profcommant}</p>
                <br>
                <button id="close-modal-deff">Close</button>
            </div>`;

            // Close the modal
            let closeModal = document.querySelector("#close-modal-deff");
            closeModal.addEventListener("click", () => {
                modal1.style.display = "none";
        });
    });
});

// delete blockage
// most of this methos is also was suggedted by Idder 

let deleteIcon = document.querySelectorAll(".fa-trash-can"); 

deleteIcon.forEach(icon => {
    icon.addEventListener("click", (e) => {
        let id = e.target.dataset.id; 
        
        AllBlockages= AllBlockages.filter(e => e.difficultyID != id&&e.username);
        localStorage.setItem("difficulty", JSON.stringify(AllBlockages));
        window.location.reload();

        }
        );
});

// edit blockage
// most of this methos is also was suggedted by Idder 

let editIcon = document.querySelectorAll(".fa-pen-to-square"); 

editIcon.forEach(i=>{
    i.addEventListener("click", (e) => {
        let id = e.target.dataset.id;

        sessionStorage.setItem("editB",id);
        window.location.replace("add/futur-talents-school edit blockeg.html");
    });

})