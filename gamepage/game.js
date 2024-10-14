const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const scoreDisplay = document.getElementById('score');

const questions = [
    {
        question: 'What Is My Cats Name?',
        answers: [
            { text: 'Berlin', correct: false },
            { text: 'Shadow', correct: false },
            { text: 'Otto', correct: true },
            { text: 'Felix', correct: false }
        ],
    },
	{
        question: 'When Is My Birthday',
        answers: [
            { text: 'November 2nd', correct: true },
            { text: 'December 8th', correct: false },
            { text: 'December 2nd', correct: false },
            { text: 'March 25th', correct: false }
        ],
    },
	{
        question: 'Who Is My Favorite Singer/Rapper?',
        answers: [
            { text: 'Juice WRLD', correct: false },
            { text: 'The Kid LAROI', correct: true },
            { text: 'Drake', correct: false },
            { text: 'The Weeknd', correct: false }
        ],
    },
	{
        question: 'What Is My Favorite Pizza Topping?',
        answers: [
            { text: 'Pepperoni', correct: false },
            { text: 'Pineapple', correct: true },
            { text: 'Canadian Bacon', correct: false },
            { text: 'Sausage', correct: false }
        ],
    },
	{
        question: 'What Is My Major?',
        answers: [
            { text: 'Computer Science & Engineering', correct: false },
            { text: 'Gender Studies', correct: false },
            { text: 'Computer Science', correct: true },
            { text: 'Cybersecurity Engineering', correct: false }
        ],
    },
    {
        question: 'What Friend Group Am I A Member In?',
        answers: [
            { text: 'CMSO', correct: false },
            { text: 'Westside Maphia', correct: true },
            { text: 'Westside Mafia', correct: false },
            { text: 'Og10men', correct: false }
        ],
    },
    // Additional questions can be added here
];

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide'); // Hide the next button initially
    scoreDisplay.innerText = 'Score: ' + score; // Reset score
    showQuestion(questions[currentQuestionIndex]); // Show the first question
}

function showQuestion(question) {
    questionContainer.querySelector('#question').innerText = question.question; // Display the question
    answerButtons.innerHTML = ''; // Clear previous answers
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text; // Set button text
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer)); // Add click event for each answer
        answerButtons.appendChild(button); // Append button to answer buttons
    });
}

function selectAnswer(answer) {
    const correct = answer.correct; // Check if the selected answer is correct
    if (correct) {
        score++; // Increment score for a correct answer
        scoreDisplay.innerText = 'Score: ' + score; // Update score display
    }

    // Disable all answer buttons after an answer is selected
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true; // Disable all buttons
        if (button.innerText === answer.text) {
            button.classList.add(correct ? 'correct' : 'wrong'); // Highlight selected button
        }
    });

    nextButton.classList.remove('hide'); // Show the next button after an answer
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++; // Increment question index
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]); // Show the next question
        nextButton.classList.add('hide'); // Hide the next button again
    } else {
        alert('Quiz finished! Your score is: ' + score); // Alert the score
        startGame(); // Restart the game
    }
});

// Start the game when the page loads
startGame();
