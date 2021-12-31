class Player {
    #name = '';
    #dice;
    #score;

    constructor(name) {
        this.#name = name;
        this.#dice = 0;
        this.#score = 0;
    }

    getName() {
        return this.#name;
    }
    setName(name) {
        this.#name = name;
    }

    getScore() {
        return this.#score;
    }
    setScore(score) {
        this.#score = score;
    }

    getDice() {
        return this.#dice;
    }
    setDice(dice) {
        this.#dice = dice;
    }
}

class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    }

    getPlayer1() {
        return this.player1;
    }
    getplayer2() {
        return this.player2;
    }

    setDices() {
        this.player1.setDice(Math.floor(Math.random() * 6) + 1);
        this.player2.setDice(Math.floor(Math.random() * 6) + 1);
    }

    getWinner() {
        if (this.player1.getDice() > this.player2.getDice()) {
            this.player1.setScore(player1.getScore() + 1);
            document.getElementById('p1Name').classList.add('text-success');
            document.getElementById('p2Name').classList.add('text-danger');
        } else if (this.player1.getDice() < this.player2.getDice()) {
            this.player2.setScore(player2.getScore() + 1);
            document.getElementById('p2Name').classList.add('text-success');
            document.getElementById('p1Name').classList.add('text-danger');
        } else {
            document.getElementById('p1Name').classList.add('text-warning');
            document.getElementById('p2Name').classList.add('text-warning');
        }
    }
}

let player1 = new Player('');
let player2 = new Player('');

const board = document.getElementById('board');

const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('keyup', (e) => {
        if (e.target.name === 'p1') {
            player1.setName(e.target.value);
            drawBoard();
            valdiatePlayers();
        } else {
            player2.setName(e.target.value);
            drawBoard();
            valdiatePlayers();
        }
    });
});

const drawBoard = () => {
    board.innerHTML = `
    <div class="row text-center">
        <div class="col">
            <h3>
                <span id="p1Name">${player1.getName()}</span><br>
                <span id="p1Score">Score: ${player1.getScore()}</span>
            </h3>
        </div>
        <div class="col">
            <h3>
                <span id="p2Name">${player2.getName()}</span><br>
                <span id="p2Score">Score: ${player2.getScore()}</span>
            </h3>
        </div>
    </div>

    <div class="mt-5" id="board-game">
    </div>
    `;
};

const drawDices = () => {
    document.getElementById('board-game').innerHTML = `
    <div class="row text-center">
        <div class="col" id="diceP1">
            <img src="../img/dice${player1.getDice()}.png" alt="">
        </div>
        <div class="col" id="diceP2">
            <img src="../img/dice${player2.getDice()}.png" alt="">
        </div>
    </div>
    `;

    document.getElementById('btn-play').textContent = 'Jugar de nuevo';
}


const valdiatePlayers = () => {
    if (player1.getName() != '' && player2.getName() != '') {
        board.innerHTML += `
        <div class="row mt-5 mb-3 text-center">
            <button id="btn-play" class="btn btn-primary mx-auto w-25">Jugar</button>
        </div>
        `;
    }

    if (document.getElementById('btn-play') != null) {
        document.getElementById('btn-play').addEventListener('click', () => {
            document.getElementById('btn-play').textContent = 'Jugando...';
            if (document.getElementById('diceP1') != null) {
                document.getElementById('diceP1').classList.add('diceShake');
                document.getElementById('diceP2').classList.add('diceShake');
            }
            playDices();
        });
    }
};

const playDices = () => {
    let game = new Game(player1, player2);
    setTimeout(() => {
        resetNames();
        game.setDices();
        drawDices();
        game.getWinner();
        refreshScore();
    }, 500);
};

const refreshScore = () => {
    document.getElementById('p1Score').innerHTML = `Score: ${player1.getScore()}`;
    document.getElementById('p2Score').innerHTML = `Score: ${player2.getScore()}`;
};

const resetNames = () => {
    document.getElementById('p1Name').classList.remove('text-success');
    document.getElementById('p2Name').classList.remove('text-success');
    document.getElementById('p1Name').classList.remove('text-danger');
    document.getElementById('p2Name').classList.remove('text-danger');
    document.getElementById('p1Name').classList.remove('text-warning');
    document.getElementById('p2Name').classList.remove('text-warning');


};