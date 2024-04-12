

// geting the ID from the locale storege
// select elements
let Fromateur = document.querySelector('#fromateur');
let logoutbutton = document.querySelector("#logout");
let Boutcamp = document.querySelector("#Boutcamp");
let studentHomepage = document.querySelector("#home");
let Title = document.querySelector("#title");
let Brief = document.querySelector("#Brief");
let difficulté = document.querySelector("#difficulté");
let add = document.querySelector("#add");
let error = document.querySelector("#error");

if (localStorage.getItem ("i") === null) {
    localStorage.setItem ("i",0)
}

// declear locale storege for user defficultes
let difficulty = JSON.parse(localStorage.getItem("difficulty")) || [];
// to get the curent user of the add
let currentUser=JSON.parse(sessionStorage.getItem('currentUser'));
// geting the ID from the locale storege
let  id= localStorage.getItem("i")
// current date 
let currentDate = new Date().toJSON().slice(0, 10);
// logout to sign in page 


logoutbutton.addEventListener ("click", (e) =>{
    e.preventDefault();

    sessionStorage.clear(); 

    window.location.replace("../../Futur Talents School sign in.html");
});

// home page 

studentHomepage.addEventListener('click',(e)=>{
    window.location.replace("../futur-talents-school student main.html");
});

// add blockeg
add.addEventListener ('click' , (e)=> {
    e.preventDefault ();
    error.innerHTML="";//clear error message if there is one
    // geting the values of the inputs
    let Difficulty= difficulté.value.trim();
    let title = Title.value.trim();
    let brief = Brief.value.trim();
    let boutcamp = Boutcamp.value.trim();
    let fromateur = Fromateur.value.trim();

    // put the values in an object
    
    
    // check if fields are empty
    
    if (title<6) {
        error.innerHTML="enter a title at least 6 characters long" ;
        return;
    }if (Difficulty<9 || Difficulty > 200) {
        console.log("Difficulty is outside the valid range: " + difficulty.length);
        error.innerHTML="The difficulty level must be between 9 and 200.";
        return;
        }
    else{
        localStorage.setItem ("i",++id)
        let newDifficulty={
            difficultyID:id,
            username:currentUser.fullname,
            difficulty: Difficulty,
            date:currentDate ,
            title : title,
            brief : brief,
            boutcamp : boutcamp,
            fromateur :fromateur,
            isValid :false,
            solution:"on one yet",
            profcommant:"non"
        };
        difficulty.push(newDifficulty);
        
        // save data to local storage
        localStorage.setItem("difficulty",JSON.stringify(difficulty));
        window.location.replace("../futur-talents-school student main.html")
    
    }
});
