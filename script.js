document.addEventListener('DOMContentLoaded', function () {
    const csvInput = document.getElementById('csvInput');
    const rankingsTable = document.getElementById('rankings').getElementsByTagName('tbody')[0];
    const notification = document.getElementById('notification');

    csvInput.addEventListener('input', function () {
        const csvData = csvInput.value;
        const matches = parseCSV(csvData, true);
        const playerRatings = calculateEloRatings(matches);
        const sortedRankings = generateSortedRankings(playerRatings);

        const outputCSV = displayRankings(sortedRankings); // Display rankings and get CSV format string
        copyToClipboard(outputCSV); // Copy CSV format string to clipboard

        showNotification();
    });

    function showNotification() {
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000); // Hide notification after 3 seconds
    }




    function formatPlayerName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }


    function parseCSV(csvData, hasHeaders) {
        const lines = csvData.split('\n');
        const matches = [];

        let firstLineSkipped = !hasHeaders;

        lines.forEach(line => {
            const values = line.split('\t');

            // Skip empty lines and lines with insufficient columns
            if (values.length >= 6 && values.some(value => value.trim() !== '')) {
                if (!firstLineSkipped) {
                    firstLineSkipped = true;
                    return;
                }

                const player1 = formatPlayerName(values[0].trim());
                const player2 = formatPlayerName(values[2].trim());
                const winner = formatPlayerName(values[7].trim());

                matches.push({ player1, player2, winner });
            }
        });

        return matches;
    }


    function calculateEloRatings(matches) {
        const eloRating = new EloRating();
        const usersRating = {};

        matches.forEach(match => {
            const player1 = formatPlayerName(match.player1);
            const player2 = formatPlayerName(match.player2);
            const winner = formatPlayerName(match.winner);

            if (!usersRating[player1]) {
                usersRating[player1] = 1000;
            }
            if (!usersRating[player2]) {
                usersRating[player2] = 1000;
            }

            // Log ratings before and after the match

            usersRating[player1] = eloRating.calculate2PlayersRating(usersRating[player1], usersRating[player2], (winner === player1) ? '+' : '-');
            usersRating[player2] = eloRating.calculate2PlayersRating(usersRating[player2], usersRating[player1], (winner === player2) ? '+' : '-');

        });

        return usersRating;
    }

    function generateSortedRankings(playerRatings) {
        const rankings = [];

        for (const player in playerRatings) {
            rankings.push({ player, rating: playerRatings[player] });
        }

        rankings.sort((a, b) => b.rating - a.rating);

        return rankings;
    }

    function displayRankings(rankings) {
        const outputCSV = generateCSV(rankings);
        const tableHTML = generateTableHTML(rankings);

        rankingsTable.innerHTML = tableHTML;
        return outputCSV;
    }

    function generateCSV(rankings) {
        let outputCSV = '';

        rankings.forEach((entry, index) => {
            outputCSV += `${index + 1}.\t${entry.player}\t${entry.rating}\n`;
        });

        return outputCSV;
    }


// Function to generate the HTML table content
    function generateTableHTML(rankings) {
        let outputHTML = '';
        rankings.forEach((entry, index) => {
            outputHTML += `
            <tr>
                <td>${index + 1}.</td>
                <td>${entry.player}</td>
                <td>${entry.rating}</td>
            </tr>
        `;
        });
        return outputHTML;
    }
// Function to copy text to clipboard
    function copyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }





});
