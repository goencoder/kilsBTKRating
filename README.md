# kilsBTKRating (Elo Rating Calculator)

This repository contains a simple Elo Rating Calculator implemented in JavaScript. It provides functionality to calculate Elo ratings for two players and supports the outcomes "+", "=", and "-". Additionally, it includes a web app that allows you to paste CSV data containing match results and displays the calculated rankings based on Elo ratings.

## Features

- Calculate Elo ratings for two players based on match outcomes.
- Parse CSV data to calculate Elo ratings for multiple players.
- Display rankings in a table format.
- Copy rankings in CSV format to the clipboard.
- Web app interface to input match data and view rankings.

## Installation

No specific installation is required for the provided JavaScript code snippets. You can include the code directly in your project or use it as reference.

## Usage

1. Include the `EloRating` class in your JavaScript code.
2. Utilize the `calculate2PlayersRating` method to calculate Elo ratings for two players based on match outcomes.
3. Implement the web app by following the HTML and JavaScript provided in the repository.
4. Paste CSV match data into the web app, and it will calculate and display rankings.

## Examples

Here's an example of using the `calculate2PlayersRating` method:

```javascript
const elo = new EloRating();
const player1Rating = 1400;
const player2Rating = 1400;
const outcome = "+";
const newRating = elo.calculate2PlayersRating(player1Rating, player2Rating, outcome);
console.log(`New rating: ${newRating}`);
