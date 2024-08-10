document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pollForm');
    const resultsDiv = document.getElementById('pollResults');

    form.onsubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const song = formData.get('song');

        try {
            const response = await fetch('/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ song })
            });
            const data = await response.json();

            resultsDiv.innerHTML = '';
            for (let [song, info] of Object.entries(data)) {
                resultsDiv.innerHTML += `${song}: ${info.votes} votes (${info.percentage}%)<br>`;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
});
