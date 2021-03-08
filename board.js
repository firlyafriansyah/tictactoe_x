class TicTacToeBoard {
    state = [
        "", "", "",
        "", "", "",
        "", "", ""
    ]
    size = 3

    constructor(state = null) {
        if (state !== null) this.state = state
    }

    move(player, index) {
        if ((player !== "x") && (player !== "o")) player = ""
        this.state[index] = player
    }

    getPossibleMove() {
        let count = 0;
        this.state.forEach(a => { if (a === "") count++ })
        return count;
    }

    winCombo = [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    getWinner() {
        let win, tmpPlayer;

        for (let i = 0; i < this.winCombo.length; i++) {
            win = true
            tmpPlayer = null

            for (let j = 0; j < this.winCombo[i].length; j++) {
                let item = this.winCombo[i][j]
                if ((tmpPlayer != null && tmpPlayer != this.state[item]) || this.state[item] == "") {
                    win = false
                    break;
                }
                tmpPlayer = this.state[item]
            }
            if (win) return tmpPlayer;
        }

        return (this.getPossibleMove() == 0) ? 'tie' : null
    }
}