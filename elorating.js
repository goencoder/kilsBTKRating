class EloRating {
    constructor() {}

    calculateMultiplayer(usersRating, userIdWinner) {
        if (Object.keys(usersRating).length === 0) {
            return usersRating;
        }

        const newUsersPoints = {};

        const K = 32;

        let Q = 0.0;
        for (const userId in usersRating) {
            Q += Math.pow(10.0, usersRating[userId] / 400);
        }

        for (const userId in usersRating) {
            const expected = Math.pow(10.0, usersRating[userId] / 400) / Q;

            const actualScore = userIdWinner === userId ? 1 : 0;

            const newRating = Math.round(usersRating[userId] + K * (actualScore - expected));

            newUsersPoints[userId] = newRating;
        }

        return newUsersPoints;
    }

    calculate2PlayersRating(player1Rating, player2Rating, outcome) {
        let actualScore;

        if (outcome === "+") {
            actualScore = 1.0;
        } else if (outcome === "=") {
            actualScore = 0.5;
        } else if (outcome === "-") {
            actualScore = 0;
        } else {
            return player1Rating;
        }

        const exponent = (player2Rating - player1Rating) / 400;
        const expectedOutcome = 1 / (1 + Math.pow(10, exponent));

        const K = 32;

        const newRating = Math.round(player1Rating + K * (actualScore - expectedOutcome));

        return newRating;
    }

    determineK(rating) {
        let K;
        if (rating < 2000) {
            K = 32;
        } else if (rating >= 2000 && rating < 2400) {
            K = 24;
        } else {
            K = 16;
        }
        return K;
    }
}
