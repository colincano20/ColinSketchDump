document.addEventListener('DOMContentLoaded', () => {
  const checklist = document.getElementById('checklist');
  const checkSound = document.getElementById('checkSound');
  const congratsMessage = document.getElementById('congratsMessage');
  const messageText = 'congrats you finished the job #lgh';
  let messageIndex = 0;

  function revealLetter() {
    if (messageIndex < messageText.length) {
      congratsMessage.textContent += messageText[messageIndex];
      messageIndex++;
      setTimeout(revealLetter, 100); // Delays next letter
    }
  }

  function checkAllChecked() {
    const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
    const allChecked = [...checkboxes].every(checkbox => checkbox.checked);

    // Hide individual list items as they are checked
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        checkbox.parentElement.style.display = 'none';
      }
    });

    // Check if all items are hidden and if so, display the message
    const allItemsHidden = [...checklist.children].every(item => item.style.display === 'none');

    if (allItemsHidden) {
      congratsMessage.style.visibility = 'visible';
      revealLetter();
    }
  }

  checklist.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox') {
      checkSound.play();
      checkAllChecked(); // Check if all are checked after any change
    }
  });
});
