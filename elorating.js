/**
 * Class to calculate Elo ratings for two players based on game outcomes.
 */
class EloRating {
    /**
     * Calculates the new ratings for two players based on their current ratings and the game outcome.
     * @param {number} player1Rating - Current rating of player 1.
     * @param {number} player2Rating - Current rating of player 2.
     * @param {string} outcome - The outcome of the game (+, =, - representing win, draw, loss).
     * @returns {number} - The new rating for player 1 after the game.
     */
    calculate2PlayersRating(player1Rating, player2Rating, outcome) {
        let actualScore;

        // Determine the actual score based on the outcome of the game
        switch (outcome) {
            case "+":
                actualScore = 1.0;  // Player 1 wins
                break;
            case "=":
                actualScore = 0.5;  // Draw
                break;
            case "-":
                actualScore = 0.0;  // Player 1 loses
                break;
            default:
                return player1Rating;  // Invalid outcome, no change in rating
        }

        // Calculate the expected outcome using Elo formula
        const exponent = (player2Rating - player1Rating) / 400;
        const expectedOutcome = 1 / (1 + Math.pow(10, exponent));

        // Constant K controls the rating change sensitivity
        const K = 32;

        // Calculate and round the new rating for player 1
        const newRating = Math.round(player1Rating + K * (actualScore - expectedOutcome));

        return newRating;
    }
}
