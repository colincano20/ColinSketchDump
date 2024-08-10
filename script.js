// Example function to increase like count
function increaseLike() {
    var likes = document.querySelector('.likes-count');
    var currentLikes = parseInt(likes.innerText, 10);
    likes.innerText = currentLikes + 1;
}

// Add increaseLike to the like icon's click event
document.getElementById('likeIcon').addEventListener('click', increaseLike);
document.addEventListener('DOMContentLoaded', function() {
    const debts = [
        { name: 'Person A', amount: 100 },
        { name: 'Person B', amount: 200 },
        // Add more debts here
    ];

    const listContainer = document.getElementById('debt-list');

    debts.forEach(debt => {
        const listItem = document.createElement('li');
        listItem.textContent = `${debt.name} - $${debt.amount}`;
        listItem.addEventListener('click', function() {
            listItem.classList.toggle('settled');
            // Optional: Add animation or visual effect here
        });
        listContainer.appendChild(listItem);
    });
});
