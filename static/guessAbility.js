var randAgent = Math.floor(Math.random() * 23);
var randAbility = Math.floor(Math.random() * 4);

// console.log(randAgent);
// console.log(randAbility);

var abilityImage = document.getElementById("abilityImage")

$.get("https://valorant-api.com/v1/agents?isPlayableCharacter=true", function(data, status){
    console.log(data['data'])
    dataList = data["data"];
    createRandAbility();
    makeButtons();
    $("#agentNames").hide();

});


function createRandAbility(){
    var chosenAbility = dataList[randAgent]["abilities"][randAbility];
    console.log(chosenAbility);
    makeAbilityImage(chosenAbility);
}

function makeAbilityImage(chosenAbility){

    abilityImage.src = chosenAbility["displayIcon"];
        
}


function makeButtons(){
    let names = document.getElementById("agentNames");
    for(let i = 0; i < dataList.length; i++){
        let currName = (dataList[i]["displayName"]);
        // console.log(currName);
        let text = document.createTextNode(currName);
        let button = document.createElement('BUTTON');
        button.classList.add("agentButton");
        button.onclick = function(){
            document.getElementById("searchInput").value = currName;
            $("#agentNames").hide();
        }
        button.appendChild(text); //adds content to button
        names.appendChild(button); //appends button to div
    }
}

function showButtons(){
    $("#agentNames").show();
}

$(document).on("click", function(event){
    var $trigger = $('#dropdown');
    if($trigger !== event.target && !$trigger.has(event.target).length){
        // $("#agentNames").slideUp("fast");
        $("#agentNames").hide();
    }
});




function filterFunction() {
    var input, filter, ul, li, button, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    // div = document.getElementById("dropdown");
    // button = div.getElementsByTagName("button");
    div = document.getElementById("agentNames");
    button = div.getElementsByTagName("button");
    for (i = 0; i < button.length; i++) {
      txtValue = button[i].textContent || button[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        button[i].style.display = "";
      } else {
        button[i].style.display = "none";
      }
    }
  }
    
function validateAgent(){
    let userInput = document.getElementById("searchInput")
    console.log(userInput.value);
    // console.log(dataList);
    for(let i = 0; i < dataList.length; i++){ //TODO: case sens
        if(userInput.value == dataList[i]["displayName"]){
            isCorrectAgent(userInput.value);
        }
        
    }
}

function isCorrectAgent(userInput){
    let guessParent = document.getElementById("fullListOfGuesses");
    let newDiv = document.createElement("div");
    guessParent.appendChild(newDiv);

    let agentAnswer = dataList[randAgent]["displayName"];

    let text = document.createTextNode(userInput);
    let p = document.createElement('p');
    p.classList.add("guessText");

    let agentImg = document.createElement('img');
    agentImg.src = dataList[findUserIndex(userInput)]["displayIconSmall"];
    newDiv.appendChild(agentImg);
    p.appendChild(text); //adds content to button
    newDiv.appendChild(p); //appends button to div

    if(agentAnswer == userInput){
        newDiv.classList.add("correctGuess")
        console.log("yippie!");
    }
    else{
        newDiv.classList.add("wrongGuess")
        console.log("NOOO!");
    }
}

function findUserIndex(userInput){
    for(let i = 0; i < dataList.length; i++){
        if(userInput == dataList[i]["displayName"]){
            return i;
        }
    }
}