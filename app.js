const game = document.querySelector(".game");
let squareN = [];
let jogadas = 0;
let player = 1;
console.log("Jogadas " + jogadas + " de 9");
console.log("Vez do jogador " + player + " ->");
const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");

let color1play = color1.value;
let color2play = color2.value;

function init() {
    for (let i = 0; i < 9; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        game.appendChild(square);
    }
    play();
}
init();

function play() {
    const squareC = document.querySelectorAll(".square");
    for (let j = 0; j < squareC.length; j++) {
        squareC[j].onclick = function () {
            if (squareN[j] > 0) {
                alert("Jogada Invalida!!!");
            } else {
                jogadas++;
                if (player == 1) {
                    squareN[j] = 1;
                    this.style.backgroundColor = color1.value;
                } else if (player == 2) {
                    squareN[j] = 2;
                    this.style.backgroundColor = color2.value;
                }
                console.log("Jogador: " + squareN[j] + " posição: " + (j + 1));
                check();
            }


        };
    }
}

function check() {
    const row1 = squareN[0] > 0 && squareN[0] == squareN[1] && squareN[0] == squareN[2];
    const row2 = squareN[3] > 0 && squareN[3] == squareN[4] && squareN[3] == squareN[5];
    const row3 = squareN[6] > 0 && squareN[6] == squareN[7] && squareN[6] == squareN[8];
    const col1 = squareN[0] > 0 && squareN[0] == squareN[3] && squareN[0] == squareN[6];
    const col2 = squareN[1] > 0 && squareN[1] == squareN[4] && squareN[1] == squareN[7];
    const col3 = squareN[2] > 0 && squareN[2] == squareN[5] && squareN[2] == squareN[8];
    const dia1 = squareN[0] > 0 && squareN[0] == squareN[4] && squareN[0] == squareN[8];
    const dia2 = squareN[2] > 0 && squareN[2] == squareN[4] && squareN[2] == squareN[6];
    if (row1 || row2 || row3 || col1 || col2 || col3 || dia1 || dia2) {
        alert("Jogador " + player + " ganhou!!!")
        reset();
    } else {
        if (player == 1) {
            player = 2;
        } else if (player == 2) {
            player = 1;
        }
    }
    if (jogadas >= 9) {
        alert("Acabaram as jogadas possiveis!!");
        reset();
    }
    console.log("Jogadas " + jogadas + " de 9");
    console.log("Vez do jogador " + player + " ->");
}

function reset() {
    game.innerHTML = "";
    squareN = [];
    player = 1;
    jogadas = 0;
    init();
}

const exit = document.querySelector("#exit");
exit.addEventListener("click", function(){
    if (confirm('Quer mesmo sair?')) {
        location.href='/';
    } else {
        return false;
    }
});