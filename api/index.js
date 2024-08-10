document.getElementById('pollForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const selectedSong = document.querySelector('input[name="song"]:checked');
    if (!selectedSong) {
        alert("Please select a song before voting!");
        return;
    }

    fetch('/.netlify/functions/index/vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ song: selectedSong.value }),
    })
    .then(response => response.json())
    .then(data => {
        let resultsDiv = document.getElementById('pollResults');
        resultsDiv.innerHTML = '';  // Clear previous results
        
        for (let song in data) {
            resultsDiv.innerHTML += `${song}: ${data[song].votes} votes (${data[song].percentage}%)<br>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("There was an error processing your vote. Please try again later.");
    });
});
