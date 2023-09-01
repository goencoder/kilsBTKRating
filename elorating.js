class EloRating {
    constructor() {}

    calculate2PlayersRating(player1Rating, player2Rating, outcome) {
        let actualScore;

        switch (outcome) {
            case "+":
                actualScore = 1.0;
                break;
            case "=":
                actualScore = 0.5;
                break;
            case "-":
                actualScore = 0.0;
                break;
            default:
                return player1Rating;
        }

        const exponent = (player2Rating - player1Rating) / 400;
        const expectedOutcome = 1 / (1 + Math.pow(10, exponent));

        const K = 32;

        const newRating = Math.round(player1Rating + K * (actualScore - expectedOutcome));

        return newRating;
    }
}