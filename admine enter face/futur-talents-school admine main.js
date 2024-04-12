// select elements from the DOM
let logoutbutton=document.querySelector("#logout");
let table = document.querySelector("table");
let blockagePopUP = document.querySelector("#popUpBlocakge")
let messagePopUP = document.querySelector("#messagePopUP")


// geting all the blovkege from the localstoreg
let AllBlockages = JSON.parse(localStorage.getItem("difficulty"));

// log out button

logoutbutton.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.replace("../Futur Talents School sign in.html");
});

AllBlockages.forEach(e => {
    let style = {
        class: e.isValid==true ? "fa-solid fa-square-check fa-2xl" : "fa-solid fa-square-x fa-2xl",
        color: e.isValid==true ? "green" : "red"
    };
    console.log(e.isValid)

    table.innerHTML+=`<tr>
                <td>${e.difficultyID}</td>
                <td>${e.username}</td>
                <td>05/03/2022</td>
                <td><i class="fa-solid fa-messages fa-2xl" data-id="${e.difficultyID}"></i></td>
                <td><i class="${style.class}" style="color: ${style.color}" data-id="${e.difficultyID}"></i></td>
                <td class="noborder"><i class="fa-solid fa-eye fa-2xl"data-id="${e.difficultyID}"></i></td>
            </tr>`
});



// eye button

let eye=document.querySelectorAll(".fa-eye");

eye.forEach(e => {
    e.addEventListener("click", (e) => {
        let id = e.target.dataset.id; // Parse the id to an integer
        let index = AllBlockages.findIndex(e=>e.difficultyID == id);
        console.log(index)
        let title = AllBlockages[index].title;
        let brief = AllBlockages[index].brief;
        let difficulty = AllBlockages[index].difficulty;
        // show the modal
        blockagePopUP.style.display = "block";

        // Populate modal content
        blockagePopUP.innerHTML = `
            <div id="modal-deff-content">
                <p>Blockage Title: ${title}</p>
                <br>
                <p>Blockage Brief: ${brief}</p>
                <br>
                <p>Blockage Difficulty: ${difficulty}</p>
                <br>
                <button id="close-modal-deff">Close</button>
            </div>`;

            // Close the modal
            let closeModal = document.querySelector("#close-modal-deff");
            closeModal.addEventListener("click", () => {
                blockagePopUP.style.display = "none";
    }
    )
})
});

// message button
let message=document.querySelectorAll(".fa-messages");

message.forEach(e=>{
    e.addEventListener("click",e=>{
        let id = e.target.dataset.id; // Parse the id to an integer
        let index = AllBlockages.findIndex(e=>e.difficultyID == id);//index of the blockage
        // show the modal
        messagePopUP.style.display = "block";
        // Populate modal content
        messagePopUP.innerHTML = `
            <div id="modal-deff-content">
                <form action="">
                    <div>
                        <input type="radio" name="solution" id="solution1" value="Encadré dans leurs recherches de solutions" checked><label for="solution1">Encadré dans leurs recherches de solutions</label>
                    </div>
                    <br>
                    <textarea name="" id="profcommant" cols="50" rows="10"  placeholder="go look for the by your self"></textarea>
                    <br>
                    <div>
                        <input type="radio" name="solution" id="solution2" value="Aidé par leurs pairs"> <label for="solution2">Aidé par leurs pairs</label>
                    </div>
                    <br>
                    <div>
                        <input type="radio" name="solution" id="solution3" value="Intervention directe de formateur"> <label for="solution3">Intervention directe de formateur</label>
                    </div>
                    <br>
                    <div class="buttons"><button id="close-modal-mess">Close</button><button id="confirm-modal-mess">Add</button></div>
                </form>
                </div>`;
        // Close the modal
        let closeModalMess = document.querySelector("#close-modal-mess");
        closeModalMess.addEventListener("click", (e) => {
            e.preventDefault()
            messagePopUP.style.display = "none";
        })
        // Confirm the modal
        let confirmModalMess = document.querySelector("#confirm-modal-mess");
        confirmModalMess.addEventListener ("click", (e) => {
            e.preventDefault();
            let solution = document.querySelector("input[name='solution']:checked").value;
            let profcommant = document.querySelector("#profcommant").value.trim();
            // Update the AllBlockages array in the code
            AllBlockages[index].isValid = true;
            AllBlockages[index].solution = solution;
            AllBlockages[index].profcommant = profcommant;
            console.log(AllBlockages[index])

            // pushing it to the local storege
            localStorage.setItem("difficulty", JSON.stringify(AllBlockages));
            // close the modal
            messagePopUP.style.display = "none";
            window.location.reload();
        })
    })
})

