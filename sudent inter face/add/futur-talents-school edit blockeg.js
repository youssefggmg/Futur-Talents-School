// selecte the elements from the DOM
let logoutbutton = document.querySelector("#logout");
let title = document.querySelector("#title");
let brief = document.querySelector("#Brief");
let difficultéRencontrée = document.querySelector("#difficultéRencontrée");
let btn = document.querySelector("#btn");
let studentHomepage = document.querySelector("#studentHomepage");


// log out to the login page

logoutbutton.addEventListener ("click", (e) =>{
    e.preventDefault();

    sessionStorage.clear(); 

    window.location.replace("../../Futur Talents School sign in.html");
});
// HOME PAGE
studentHomepage.addEventListener('click',(e)=>{
    window.location.replace("../futur-talents-school student main.html");
});

// get the curent blockage ID from the session storage
let Blockageid = JSON.parse(sessionStorage.getItem("editB"));
//get all the blokage fromthe database
let AllBlockages=JSON.parse(localStorage.getItem("difficulty"));
//get the current blockage from the database
let currentBlockage = AllBlockages.find(b => b.difficultyID === Blockageid);
// get the current blockage index
let currentBlockageIndex = AllBlockages.findIndex(b => b.difficultyID === Blockageid);


// display the blockage
title.value = currentBlockage.title;
brief.value = currentBlockage.brief;
difficultéRencontrée.value= currentBlockage.difficulty;
// update the blockage
btn.addEventListener('click', (e) => {
    e.preventDefault();

    currentBlockage.title = title.value;
    currentBlockage.brief = brief.value;
    currentBlockage.difficulty = difficultéRencontrée.value;
    AllBlockages[currentBlockageIndex] = currentBlockage;
    // update the local storage
    localStorage.setItem("difficulty", JSON.stringify(AllBlockages));
    // redirect to the student main page
    window.location.replace("../futur-talents-school student main.html");

})
