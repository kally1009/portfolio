console.log("Welcome to Tic-Tac-Toe");

var allTiles = document.querySelectorAll(".box")

var turn = true; 
//}
//for tiles in allTiles:
var turnIndicator = document.querySelector("h2");

var resetbtn = document.querySelector("#reset");
resetbtn.onclick = function (){
    newGame ();
}

allTiles.forEach(function (tile) {
    console.log("in the loop", tile)
    
    tile.onclick = function () {
        if(tile.innerHTML == ""){
            if(turn){
                tile.classList.add("x");
                tile.innerHTML = "X";
                //if(checkForWinner("x")){
                    //figure out a way to use the DOM for messaging instead of the alert. 
                    //end the game. Use extra variable. 
                //}

                turnIndicator.innerHTML = "Player O's turn";
                turn = false;
        }   else {
                tile.classList.add("o");
                tile.innerHTML = "O";
                turn = true;
                turnIndicator.innerHTML = "Player X's turn";
        }}
        else {
            console.log("Cheating is not allowed.")
        }
        console.log("click!");
        
    
    }
});

function newGame() {
    allTiles.forEach(function (tile) {
        console.log("Resetting Game")
        tile.innerHTML="";
        turn = true;
        turnIndicator.innerHTML = "Player X's turn";
        tile.classList.remove("x", "o");

})};


function checkForWinner (player){
    var groups = ["row1","row2","row3", "col1", "col2", "col3", "diag1", "diag2"];
    var winner = false;
    groups.forEach(function (group){
    var selector ="."+ group + "." +player;
    if (document.querySelectorAll(selector).length == 3){
        winner = true;
        console.log("winner on", group); 
    }
});
    return winner;
}

