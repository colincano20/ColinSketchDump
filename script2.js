document.getElementById('pollForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get the selected song
    const selectedOption = document.querySelector('input[name="song"]:checked');

    if (!selectedOption) {
        alert("Please select an option before voting!");
        return;
    }

    // Get the value of the selected option
    const selectedValue = selectedOption.value;

    // Fetch the current vote counts from localStorage or initialize them
    let voteCounts = JSON.parse(localStorage.getItem('voteCounts')) || {
        babyBack: 0,
        stickWithMe: 0,
        pickSides: 0,
        nightsLikeThis: 0,
        hatred: 0
    };

    // Increment the vote count for the selected option
    voteCounts[selectedValue] += 1;

    // Save the updated vote counts back to localStorage
    localStorage.setItem('voteCounts', JSON.stringify(voteCounts));

    // Display the updated results
    displayResults(voteCounts);
});

function displayResults(voteCounts) {
    let resultsDiv = document.getElementById('pollResults');
    resultsDiv.innerHTML = `
        <p>BABY I'M BACK: ${voteCounts.babyBack}</p>
        <p>STICK WITH ME: ${voteCounts.stickWithMe}</p>
        <p>PICK SIDES: ${voteCounts.pickSides}</p>
        <p>NIGHTS LIKE THIS P2: ${voteCounts.nightsLikeThis}</p>
        <p>HATRED: ${voteCounts.hatred}</p>
    `;
}

// Display results on page load if there are any
document.addEventListener('DOMContentLoaded', function() {
    let storedCounts = JSON.parse(localStorage.getItem('voteCounts'));
    if (storedCounts) {
        displayResults(storedCounts);
    }
});
