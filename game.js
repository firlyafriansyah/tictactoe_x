const board = new TicTacToeBoard()

let turn = "x";
let state = null;

document.addEventListener("DOMContentLoaded", () => {
    nextTurn()
    reset();
})

function nextTurn() {
    if (turn == "x") {
        human();
    } else {
        setTimeout(() => {
            AIturn()
        }, 50);
    }
}

function AIturn() {
    if (state == null) {
        const ai = new TicTacToeAI("o", board);
        const index = ai.getBestMove().move;
        const selectedColumn = document.querySelector(`.c${index}`)
        if (board.state[index] == "") {
            selectedColumn.style.backgroundColor = "blue"
            board.move(turn, index);
            turn = "x"
            checkWinner()
            nextTurn()
            return ""
        }
    }
}

function human() {
    const boardElement = document.querySelectorAll(".br")
    boardElement.forEach(br => {
        br.addEventListener("click", (e) => {
            const columnSelected = e.target.classList[1].split("")[1]
            const selectedColumn = document.querySelector(`.c${columnSelected}`)

            if (state == null) {
                if (board.state[columnSelected] == "") {
                    selectedColumn.style.backgroundColor = 'red'
                    board.move(turn, columnSelected)
                    turn = "o"
                    checkWinner()
                    nextTurn()
                }
            }
        })
    })
}

function checkWinner() {
    let winner = board.getWinner();
    if (winner != null) {
        winner == "tie" ? state = "tie" : state = winner

        const resultElement = document.querySelector('.result')
        const colorWin = state == "x" ? "<h2 style='color: #2ecc71'>Anda Menang</h2>" : "<h2 style='color: #e74c3c'>Anda Kalah</h2>"
        if (state == "tie") {
            resultElement.innerHTML = '<h2 style="color: #95a5a6">Draw</h2>'
        } else {
            resultElement.innerHTML = colorWin
        }
    } else {
    }
}

function reset() {
    const btn = document.querySelector(".btn")
    btn.addEventListener("click", () => {
        location.reload()
    })
}