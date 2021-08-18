const game = document.querySelector(".game");
let squareN = [];
let jogadas = 0;
let player = 1;
console.log("Jogadas " + jogadas + " de 9");
console.log("Vez do jogador " + player + " ->");
const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");

function init() {
    for (let i = 0; i < 9; i++) {
        const div = document.createElement("div");
        div.classList.add("square");
        game.appendChild(div);
    }
    viewportSize();
    colorSelect();
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
                    this.classList.add("player1");
                    this.textContent = "X";
                } else if (player == 2) {
                    squareN[j] = 2;
                    this.classList.add("player2");
                    this.textContent = "O";
                }
                console.log("Jogador: " + squareN[j] + " posição: " + (j + 1));
                check();
            }
            colorChange();

        };
    }
}

function colorSelect() {
    const colorInput = document.querySelectorAll(".colorSelect input");
    for (let j = 0; j < colorInput.length; j++) {
        colorInput[j].addEventListener("change", colorChange);
    }
}

function colorChange() {
    const player1color = document.getElementsByClassName("player1");
    for (let k = 0; k < player1color.length; k++) {
        player1color[k].style.backgroundColor = color1.value;
    }
    const player2color = document.getElementsByClassName("player2");
    for (let l = 0; l < player2color.length; l++) {
        player2color[l].style.backgroundColor = color2.value;
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

const newGame = document.querySelector(".header button");
newGame.addEventListener("click", reset);

const exit = document.querySelector("#exit");
exit.addEventListener("click", function () {
    if (confirm('Quer mesmo sair?')) {
        location.href = '/';
    } else {
        return false;
    }
});

function viewportSize() {
    let viewPortWidth;
    let viewPortHeight;
    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth != 'undefined') {
        viewPortWidth = window.innerWidth,
            viewPortHeight = window.innerHeight
    }
    // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    else if (typeof document.documentElement != 'undefined'
        && typeof document.documentElement.clientWidth !=
        'undefined' && document.documentElement.clientWidth != 0) {
        viewPortWidth = document.documentElement.clientWidth,
            viewPortHeight = document.documentElement.clientHeight
    }
    // older versions of IE
    else {
        viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
            viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
    }
    if (viewPortWidth > (viewPortHeight - 130)) {
        game.style.width = "calc(100vh - 130px)";
        game.style.height = "calc(100vh - 130px)";
        mediaQ();
    } else {
        game.style.width = "100vw";
        game.style.height = "100vw";
        mediaQ();
    }
}

function mediaQ() {
    const square = document.getElementsByClassName("square");
    if (window.matchMedia("(max-width: 600px)").matches) {
        for (let i = 0; i < square.length; i++) {
            square[i].style.fontSize = "30vw";
        }
    } else if (window.matchMedia("(max-height: 730px)").matches) {
        for (let i = 0; i < square.length; i++) {
            square[i].style.fontSize = "calc((100vh - 170px) / 3)";
        }
    }
    else {
        for (let i = 0; i < square.length; i++) {
            square[i].style.fontSize = "180px";
        }
    }

}

window.onresize = viewportSize;