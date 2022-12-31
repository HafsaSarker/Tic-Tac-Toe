let currPlayer = 'X';
let running = false;
let won = false;
let draw = false;

//matrix set up
const row = 3;
const col = 3;
let matrix = new Array(row);
for(let i = 0; i < row; i++){
    matrix[i] = new Array(col);
}
//fill matrix
let count = 0;
for(let i = 0; i < row; i++){
    for(let j = 0; j < col; j++){
        matrix[i][j] = count;
        count++;
    }
}

function changePlayer(){
    if(currPlayer == 'X'){
        currPlayer = 'O';
    }    
    else if(currPlayer == 'O'){
        currPlayer = 'X';
    }
    displayTurn();
}

function checkWinner(matrix){

    //across match 
    if(matrix[0][0] == matrix[0][1] && matrix[0][0] == matrix[0][2]) return true;
    if(matrix[1][0] == matrix[1][1] && matrix[1][0] == matrix[1][2]) return true;
    if(matrix[2][0] == matrix[2][1] && matrix[2][0] == matrix[2][2]) return true;

    //cols match
    if(matrix[0][0] == matrix[1][0] && matrix[0][0] == matrix[2][0]) return true;
    if(matrix[0][1] == matrix[1][1] && matrix[0][1] == matrix[2][1]) return true;
    if(matrix[0][2] == matrix[1][2] && matrix[0][2] == matrix[2][2]) return true;

    //diagonal match
    if(matrix[0][0] == matrix[1][1] && matrix[0][0] == matrix[2][2]) return true;
    if(matrix[0][2] == matrix[1][1] && matrix[0][2] == matrix[2][0]) return true;

    return false;
}
function isDraw(matrix){
    let temp = 0;
    for(let i = 0; i < row; i++){
        for(let j = 0; j < col; j++){
            if(isNaN(matrix[i][j]))
               temp++;
        }
    }
    // console.log({temp});
    if(temp == 9) return true;
    return false;
}
function showMatrixUser(gridVal, matrix){
    //display on website
    let gridBtn = document.querySelectorAll('.grids');
    gridBtn.forEach(gridBtn => {
        if(gridBtn.value == gridVal){
            gridBtn.innerHTML = currPlayer;
        }
        else{
            return;
        }
    })
    
    //update matrix cell to curr player
    for(let i = 0; i < row; i++){
        for(let j = 0; j < col; j++){
            if(matrix[i][j] == gridVal){
                matrix[i][j] = currPlayer;
            }
        }
    }

    //check game status so far
    gameStats(matrix);
    
}
const onClickGrids = (gridVal, matrix) => {
    // console.log(gridVal);
    for(let i = 0; i < row; i++){
        for(let j = 0; j < col; j++){
            //update cell if only game is running
            //and cell is not taken
            if((matrix[i][j] == 'X' || matrix[i][j] == 'O') && !running){
                return;
            }
            else if(matrix[i][j] == gridVal ){
                // console.log('pos found');
                showMatrixUser(gridVal, matrix);
            }
        }
    }
}

function gameStats(matrix) {
    const playerID = document.querySelector('.title');
    //check for winner
    if(checkWinner(matrix)){
        // console.log('over');
        won = true;
        running = false;
        playerID.textContent = `Player ${currPlayer} won!`
    }
    //if draw
    else if(isDraw(matrix)){
        draw = true;
        running = false;
        playerID.innerHTML = "It's a draw! Play again?"
    }
    else{
        changePlayer();
    }
    // console.log(matrix);
}

function userStart(){
    // use querySelector to select all grid Buttons
    let gridBtn = document.querySelectorAll('.grids');
    gridBtn.forEach(gridBtn => {
        gridBtn.onclick = () => onClickGrids(gridBtn.value, matrix);
    })
}

function displayTurn() {
    const turnsPlayer = document.querySelector('.turns-div');
    const playerID = document.getElementById('currPlayer');
    if(currPlayer == 'X'){
        playerID.innerHTML = 'X';
        turnsPlayer.innerHTML = 
        `<div class="player1">
        <h1 class="pfp">&#128120;</h1>
        <h2 class="signxTurn">X</h2>
        </div>
        <div class="player2">
        <h1 class="pfp">&#x1F934;</h1>
        <h2 class="signo">O</h2>
        </div>`
    }
    else if(currPlayer == 'O'){
        playerID.innerHTML = 'O';
        turnsPlayer.innerHTML = 
        `<div class="player1">
        <h1 class="pfp">&#128120;</h1>
        <h2 class="signx">X</h2>
        </div>
        <div class="player2">
        <h1 class="pfp">&#x1F934;</h1>
        <h2 class="signoTurn">O</h2>
        </div>`
    }

}

function playGame() {
    const resetBtn = document.getElementById('reset');

    running = true;
    userStart();
    displayTurn();

    resetBtn.addEventListener("click", () => {
        location.reload();
    })

}

playGame()
