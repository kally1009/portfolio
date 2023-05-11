

console.log("Welcome to 2048");
var boardData = {}
var score = 0;
function createBoard () {
    for (var row=0; row<4; row++){
        var rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        boardDiv.appendChild(rowDiv);
        for (var col=0; col<4; col++){
            var key = tileKey(row,col);
            var tileDiv = document.createElement("div");
            
            tileDiv.classList.add("tile");
            tileDiv.id = key;
            rowDiv.appendChild(tileDiv);
        }
    }
}

function currentScoreDiv () {
    currentScore = document.querySelector("h4");
    currentScore.innerHTML = score;
}

function updateBoard (){
    for (var row=0; row<4; row+=1){
        for (var col = 0; col <4; col+=1){
            var key = tileKey(row,col);
            var value = boardData[key];
            
            var tileDiv = document.querySelector("#"+ key);
            tileDiv.className = "tile";
            if(value){
                tileDiv.innerHTML = value;
                tileDiv.classList.add("tile-" + value);
            }else{
                tileDiv.innerHTML = "";
            }
        }
    }
    currentScoreDiv();
}

function tileKey(row, col) {
    return "row"+ row + "col" + col;
}

function getEmptyTiles() {
    var emptyTiles = [];
    for (var row=0; row<4; row+=1){
        for (var col = 0; col <4; col+=1){
            var key = tileKey(row,col);
            var value = boardData[key];
            
            if(!value){
                emptyTiles.push(key);
            }
        }
    
    }
return emptyTiles;
}


function generateRandomTile(){
    var emptyTiles = getEmptyTiles();

    var randomIndex = Math.floor(Math.random() * emptyTiles.length);
    var randomTileKey = emptyTiles[randomIndex];
   
    if (randomTileKey) {
        if (Math.random() < .2){ //20% chance
            boardData[randomTileKey] = 4;
        }else {
            boardData[randomTileKey] = 2;
        }
        
    }
}

function combineTiles(numbers) {
    var newNumbers = [];
    while (numbers.length > 0){
        if(numbers.length==1){
            newNumbers.push(numbers[0]);
            numbers.splice(0,1);
        }else if( numbers[0]==numbers[1]) {
            var sum = numbers[0]+numbers[1];
            score += sum;

            newNumbers.push(sum);
            numbers.splice(0,2);
        }else{
            newNumbers.push(numbers[0]);
            numbers.splice(0,1);
        }
    }
    while (newNumbers.length < 4){
        newNumbers.push(undefined);
    }
    return newNumbers;
}
function getNumbersInRow (row) {
    var numbers = [];
    for(var col = 0; col<4; col++){
        var key = tileKey(row,col);
        var value = boardData[key];
        if (value){
            numbers.push(value);
        }
    }
    return numbers;
}
function getNumbersInCol(col){
    var numbers = []
    for(var row = 0; row<4; row++){
        var key = tileKey(row,col);
        var value = boardData[key];
        if (value){
            numbers.push(value);
        }
    }
    return numbers;
}

function setNumbersInRow(row, newNumbers){
    for(var col = 0; col<4; col++){
        var key = tileKey(row,col);
        var value = newNumbers[col];
        boardData[key] = value;
    }
}

function setNumbersInCol(col, newNumbers){
    for( var row = 0; row<4; row++){
        var key = tileKey(row,col);
        var value = newNumbers[row];
        boardData[key] = value;
    }
}

function combineRowLeft(row){
    var numbers = getNumbersInRow(row);
    var newNumbers = combineTiles(numbers);
    setNumbersInRow(row,newNumbers);
}
function combineRowRight(row){
    var numbers = getNumbersInRow(row);
    numbers = numbers.reverse();
    var newNumbers = combineTiles(numbers);
    newNumbers = newNumbers.reverse();
    setNumbersInRow(row,newNumbers);
}

function combineColUp(col){
    var numbers = getNumbersInCol(col);
    var newNumbers = combineTiles(numbers);
    setNumbersInCol(col,newNumbers);
}

function combineColDown(col){
    var numbers = getNumbersInCol(col);
    numbers = numbers.reverse();
    var newNumbers = combineTiles(numbers);
    newNumbers = newNumbers.reverse();
    setNumbersInCol(col,newNumbers);

}

function didBoardChange(oldBoard){
    var change=false;
    for (var row=0; row<4; row+=1){
        for (var col = 0; col <4; col+=1){
            key = tileKey(row,col)
            if(oldBoard[key]!=boardData[key]){
                change=true;
            }else{

            }
            }

        }
    return change;
}
function combineDirection(direction){
    //make a deep copy
    var oldBoard = Object.assign({}, boardData);
    for (var i=0; i < 4; i++){
    if (direction == "left"){
        combineRowLeft(i);
        }
    else if (direction == "up"){
        combineColUp(i);
        }
    else if(direction =="right"){
        combineRowRight(i);
    }
    else if (direction =="down"){
        combineColDown(i);
    }
    }
    if (didBoardChange(oldBoard)){
        generateRandomTile();
        //check if the game is over
        updateBoard();
    }
    saveGame();
}

document.onkeydown = function (event) {
    console.log("Key down detected", event.which);
    if(event.which == 37){
        combineDirection("left");
        
    }
    else if(event.which == 38){
        combineDirection("up");
        
    }
    else if(event.which==39){
        combineDirection("right");
        
    }
    else if(event.which == 40){
        combineDirection("down");
    }
};
function saveGame (){
    localStorage.setItem("currentScore",score);
    localStorage.setItem("boardData", JSON.stringify(boardData));
    console.log("game saved");
}

function loadGame(){
    score = parseInt(localStorage.getItem("currentScore"), 10);
    boardData = JSON.parse(localStorage.getItem("boardData"));
    updateBoard();
    console.log("Loaded saved game");

}

function startNewGame (){
    boardData = {};
    score = 0;
    generateRandomTile();
    generateRandomTile();
    updateBoard();
}


var newGameBtn = document.querySelector(".newgame");

newGameBtn.onclick = function () {
    startNewGame();
}

var getScoresButton = document.querySelector("#getHighScores");
getScoresButton.onclick = function () {
    console.log("get high scores");

    fetch("https://highscoreapi.herokuapp.com/scores").then(function (response) {
        //this function runs in the future.

        response.json().then(function(data){
            console.log("data from the server:", data);
           

            var scoreList = document.querySelector("#displayHighScore")
            scoreList.innerHTML = "";
            data.forEach(function (thescore){
                //Insert new DOM element with value from score variable. 
                console.log("In the loop");
                var eachScore = document.createElement("li");
                eachScore.classList.add("highScores");
                eachScore.innerHTML = thescore.name + ": " + thescore.score;
                scoreList.appendChild(eachScore);
            });

        });
        
    });
    // this happens before the then function. Happens at the fetch. 
};

var submitScoreButton = document.querySelector("#submit-btn")
submitScoreButton.onclick = function () {
    console.log("submit score");

    var name = prompt("Enter your name: ");
    console.log(name, score);
    var data = {
        "name": name,
        "score": score
    };
    fetch("https://highscoreapi.herokuapp.com/scores",{
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type":"application/json"
        }
    }).then(function(){
        console.log("Successfully subitted score to server.");
    });
};
createBoard();
if (localStorage.getItem("currentScore")){
    loadGame();
}else{
    startNewGame();
}


