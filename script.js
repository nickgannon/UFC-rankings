// Define ranked fighters and their rankings
const rankedFighters = [
    { name: "Alexandre Pantoja", rank: "Flyweight Champion", photo: "AlexandrePantoja.png" },
    { name: "Brandon Royval", rank: "#1 Flyweight Contender", photo: "BrandonRoyval.png" },
    { name: "Brandon Moreno", rank: "#2 Flyweight Contender", photo: "BrandonMoreno.png" },
    { name: "Amir Albazi", rank: "#3 Flyweight Contender", photo: "AmirAlbazi.png" },
    { name: "Kai Kara-France", rank: "#4 Flyweight Contender", photo: "KaiKaraFrance.png" },
    { name: "Matheus Nicolau", rank: "#5 Flyweight Contender", photo: "MatheusNicolau.png" },
    { name: "Manel Kape", rank: "#6 Flyweight Contender", photo: "ManelKape.png" },
    { name: "Muhammad Mokaev", rank: "#7 Flyweight Contender", photo: "MuhammadMokaev.png" },
    { name: "Alex Perez", rank: "#8 Flyweight Contender", photo: "AlexPerez.png" },
    { name: "Tim Elliott", rank: "#9 Flyweight Contender", photo: "TimElliott.png" },
    { name: "Steve Erceg", rank: "#10 Flyweight Contender", photo: "SteveErceg.png" },
    { name: "Matt Schnell", rank: "#11 Flyweight Contender", photo: "MattSchnell.png" },
    { name: "Tagir Ulanbekov", rank: "#12 Flyweight Contender", photo: "TagirUlanbekov.png" },
    { name: "Tatsuro Taira", rank: "#13 Flyweight Contender", photo: "TatsuroTaira.png" },
    { name: "David Dvorak", rank: "#14 Flyweight Contender", photo: "DavidDvorak.png" },
    { name: "Sumudaerji", rank: "#15 Flyweight Contender", photo: "Sumudaerji.png" },
    // Add more fighters and their rankings here
];

// Array to store correct guesses
let correctGuesses = [];

// Function to check if a fighter has already been guessed
function isAlreadyGuessed(fighterName) {
    return correctGuesses.some(fighter => fighter.name.toLowerCase() === fighterName.toLowerCase());
}

// Function to check the user's guess
function checkGuess() {
    const userInput = document.getElementById("searchInput").value.trim();
    handleGuess(userInput);
}

// Function to handle user's guess
function handleGuess(userInput) {
    // Clear the search bar
    document.getElementById("searchInput").value = "";

    // Clear the previous result
    document.getElementById("result").innerHTML = "";

    // Check if the user's input matches any ranked fighter
    let isCorrect = false;
    for (let i = 0; i < rankedFighters.length; i++) {
        const fighterFullName = rankedFighters[i].name.toLowerCase();
        const fighterLastName = rankedFighters[i].name.split(" ").pop().toLowerCase();
        const userInputLower = userInput.toLowerCase();
        if ((fighterFullName === userInputLower || fighterLastName === userInputLower) && !isAlreadyGuessed(rankedFighters[i].name)) {
            correctGuesses.push(rankedFighters[i]);
            isCorrect = true;
            break; // Stop checking once a correct guess is found
        }
    }

    // Sort correct guesses by rank (champion to #15 contender)
    correctGuesses.sort((a, b) => {
        const ranks = ["Champion", "#1", "#2", "#3", "#4", "#5", "#6", "#7", "#8", "#9", "#10", "#11", "#12", "#13", "#14", "#15"];
        return ranks.indexOf(a.rank.split(" ")[0]) - ranks.indexOf(b.rank.split(" ")[0]);
    });

    // Display correct guesses
    let resultHTML = "<ul>";
    correctGuesses.forEach(fighter => {
        resultHTML += `<li>${fighter.name} - ${fighter.rank}`;
        resultHTML += `<img src="/Assets/${fighter.photo}" alt="${fighter.name} Photo" class="fighter-photo">`;
        resultHTML += `</li>`;
    });
    resultHTML += "</ul>";
    
    if (isCorrect) {
        document.getElementById("result").innerHTML = resultHTML;
        
        // Check if user guessed every ranked fighter
        if (correctGuesses.length === rankedFighters.length) {
            // Display congratulations message
            alert("Congratulations! You guessed every ranked fighter!");
        }
    } else {
        document.getElementById("result").innerHTML = resultHTML + "<p class='error-message'>No fighters found or already guessed. Please try again.</p>";
    }
}


// Add event listener for Enter key press
document.getElementById("searchInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        handleGuess(this.value.trim());
    }
});
