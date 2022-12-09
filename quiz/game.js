const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text")); /* array from ->pretvaramo u niz sve elemente sa tom klasom */ 
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById("progressBarFull");


let currentQuestion = {};
let acceptiongAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("questions.json").then(res => {
    return res.json();
}).then(loadedQuestions => {
    questions = loadedQuestions;
    startGame();
}).catch(err => {
    console.log(err);
});


const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;  /* Koliko pitanja korisnik dobije pre nego sto zavrsi */

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; /* sa ove tri tackice dobijamo da se pitanja od gore kopiraju u novi niz availablequestions */
    getNewQuestion();
};

getNewQuestion = () => {

    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS ) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign("/quiz/end.html");
    }

    questionCounter++;
    progressText.innerText = `Pitanje ${questionCounter}/${MAX_QUESTIONS}`;

    //Sada zelimo da update-ujemo progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100 }%`;
    



    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptiongAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptiongAnswers) return;

        acceptiongAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        /* const classToApply = 'incorrect';
        if (selectedAnswear == currentQuestion.answear) {
            classToApply = 'correct';
        } */ 

        const classToApply = 
        selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        
        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
        
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        },1000);

    });

});

incrementScore = num => {
    score+=num;
    scoreText.innerText = score;
}

//startGame();

