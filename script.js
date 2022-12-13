const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const rejouer = document.querySelector("#rejouer");

const winConditionn = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6],


];

let choix = ["","","","","","","","",""];
let currentPlayer ="X";
let running = false;

initialisationJeux();

function initialisationJeux(){
    cells.forEach(cell => cell.addEventListener("click",cellClick));
    rejouer.addEventListener("click",restart);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClick(){
    const cellIndex = this.getAttribute("cellIndex");
    if (choix[cellIndex] !="" || !running){
        return;
    }
    updateCell(this,cellIndex);
    checkGagnant();
}

function updateCell(cell,index){
    choix[index] = currentPlayer;
    cell.textContent = currentPlayer;

}

function changeJoueur() {
    currentPlayer = (currentPlayer=="X")? "O":"X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkGagnant(){

    let roundUn = false;

    for(let i=0 ; i<winConditionn.length ; i++){
        const condition = winConditionn[i];
        const cellA = choix[condition[0]];
        const cellB = choix[condition[1]];
        const cellC = choix[condition[2]];

       if(cellA == "" || cellB == "" || cellC == "" ){
            continue;
       } 
       if(cellA == cellB && cellB == cellC){
        roundUn = true;
        break;
       }
    }
    if(roundUn){
        statusText.textContent = `${currentPlayer} wins!`
        running = false;
    }else if(!choix.includes("")){
        statusText.textContent = `draw !`;
        running = false;
    }else{
        changeJoueur();
    }
}

function restart(){
    currentPlayer = "X";
    choix = ["","","","","","","","",""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}