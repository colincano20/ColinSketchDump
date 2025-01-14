function openRanking(evt, rankingName) {
    var i, tabcontent, tablinks;
    
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(rankingName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Click on the first tablink on page load
document.getElementsByClassName('tablinks')[0].click();

// Add to your existing script.js file

function playSong(songId) {
  // Pause any currently playing song
  document.querySelectorAll('audio').forEach(audio => {
    if (audio.id !== songId) {
      audio.pause();
      audio.currentTime = 0;
      audio.parentElement.classList.remove('playing');
    }
  });

  // Play the selected song
  const song = document.getElementById(songId);
  if (song.paused) {
    song.play();
    song.parentElement.classList.add('playing');
  } else {
    song.pause();
    song.parentElement.classList.remove('playing');
  }
}

// Event to remove 'playing' class when song ends
document.querySelectorAll('audio').forEach(audio => {
  audio.onended = () => {
    audio.parentElement.classList.remove('playing');
  };
});

// Poll
const options = document.querySelectorAll('.option');
    const voteResult = document.getElementById('voteResult');
    const selectedOptionText = document.getElementById('selectedOption');
    let totalVotes = 0;

    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(opt => opt.classList.remove('selected')); // Remove selected from all
            option.classList.add('selected'); // Add selected to clicked option
            
            totalVotes = 1; // Only show 1 total vote since it's local
            voteResult.textContent = `Total Votes: ${totalVotes}`;
            selectedOptionText.textContent = `You voted for: ${option.getAttribute('data-option')}`;
        });
    });
function toggleVersions(songId) {
  const versions = document.getElementById(`${songId}-versions`);

  // Toggle display between "block" and "none"
  if (versions.style.display === "block") {
      versions.style.display = "none";
  } else {
      versions.style.display = "block";
  }
}

function playSnippet(snippetId) {
  // Stop all other audio
  const allAudio = document.querySelectorAll("audio");
  allAudio.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
  });

  // Play selected snippet
  const snippet = document.getElementById(snippetId);
  snippet.play();
}

document.addEventListener('DOMContentLoaded', function() {
  // Initialize vote counts from localStorage or set to zero
  const options = ['BABY_IM_BACK', 'STICK_WITH_ME', 'PICK_SIDES', 'NIGHTS_LIKE_THIS_P2', 'HATRED'];
  let votes = JSON.parse(localStorage.getItem('votes')) || {};

  // Ensure all options have a vote count
  options.forEach(option => {
      if (!votes[option]) {
          votes[option] = 0;
      }
  });

  // Function to cast a vote
  window.castVote = function(option) {
      // Increment the vote count for the selected option
      votes[option]++;
      // Save the updated votes to localStorage
      localStorage.setItem('votes', JSON.stringify(votes));
      // Update the displayed results
      displayResults();
  };

  // Function to display the results
  function displayResults() {
      const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
      document.getElementById('voteResult').textContent = `Total Votes: ${totalVotes}`;
      const voteDetails = document.getElementById('voteDetails');
      voteDetails.innerHTML = ''; // Clear previous details
      for (const [option, count] of Object.entries(votes)) {
          const percentage = totalVotes ? ((count / totalVotes) * 100).toFixed(2) : 0;
          const optionText = option.replace(/_/g, ' '); // Replace underscores with spaces for display
          voteDetails.innerHTML += `<p>${optionText}: ${count} votes (${percentage}%)</p>`;
      }
  }

  // Display results on page load
  displayResults();
});
