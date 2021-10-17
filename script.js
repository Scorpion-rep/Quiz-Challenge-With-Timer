const quizQuestions = document.getElementById("quiz-questions");
const timer = document.getElementById("timer");
const btnStart = document.getElementById("btn-start");
const timeCounter = document.getElementById("timecounter");
const titleItem = document.getElementById("title-item");
const questionAnswers = document.getElementById("question-answers");
const myScore = document.getElementById("score");
const btnScore = document.getElementById("btnScore");
const addScore = document.getElementById("addscore")
const alert = document.getElementById("alert");
const info = document.getElementById("info");

let currentIndex = 0;
let score = 0;
let count = 50;
let allScores = [];
let storedScores = JSON.parse(localStorage.getItem("userData"));
let intervalId = null;

let questions = [
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:---",
        choices: ["JavaScript","terminal/bash","alerts", "console.log"],
        answer : "console.log"     
    },
    {
        title: "String values must be enclosed within --- when being assigned to variables ",
        choices: ["commas","curly brackets","quotes","parentheses"],
        answer : "quotes"  
    },
    {
        title: "Arrays in JavaScript can be used to store:---",
        choices: ["numbers and strings","others Arrays","booleances", "all of the above"],
        answer : "all of the above"    
    },
    {
        title: "The condition in an if/else statement is enclosed within:---",
        choices: ["quotes","Curly brackets","parentheses", "square brackets"],
        answer : "parentheses"  
    },
    {
        title: "Commonly used data type Do Not include:---",
        choices: ["strings","booleance","alerts", "numbers"],
        answer : "alerts"    
    }
]

// start the game
btnStart.addEventListener("click", startQuiz);

function startQuiz() {
    if(storedScores !==null) {
        allScores = storedScores;
    }

    info.classList.add("d-none")
    btnStart.classList.add("d-none")
    timeCounter.classList.remove("d-none")
    quizQuestions.classList.remove("d-none")

    nextQuestions = questions[currentIndex]
    console.log(nextQuestions.title)

    displayQuestion(nextQuestions)

    gameTime()

}

btnScore.addEventListener("click", function() {

    let name = document.getElementById("inputScore").value
    scorePage(name, count)
});

// Time set
function gameTime() {

    timeInterval = setInterval(function() {
        timer.innerText = count
        count--;

        if (count < 0 ) {
            return endgame()
        }
    }, 1000);

}

function scorePage(a, b) {

    let userData = {
        inits: a,
        userScore: b
    };
    allScores.push(userData);

    localStorage.setItem("userData", JSON.stringify(allScores));
    location.href = "score.html";
}

function displayQuestion(question) {
    titleItem.innerText = question.title
    question.choices.forEach(element => {
        const button = document.createElement("button")
        button.className = "btn-primary btn-block text-left"
        button.innerText = element

        questionAnswers.appendChild(button)
        button.addEventListener("click", displaynextQuestion)
    });
}


function displaynextQuestion(e) {

    currentIndex++
    if(currentIndex < questions.length) {
        correction(e.target.innerText == nextQuestions.answer)
        questionAnswers.innerHTML=""

        if(currentIndex < questions.length) {
            nextQuestions = questions[currentIndex]
            displayQuestion(nextQuestions)

        }else {
            currentIndex = 0
            displayQuestion(nextQuestions)
        }

    }else {
        console.log("endgame")
        endgame()
    }
}


function correction(response) {

    if(response) {
        alert.innerText = "Correct!"
        console.log ("Correct!")
    }else {
        alert.innerText = "Wrong!"
        count = count -15
        timer.innerHTML = count
        console.log("Wrong!")
    }

    setTimeout(function() {
        alert.innerText = ""
    }, 1000);

}



function endgame() {

    clearInterval(timeInterval)
    myScore.innerText = count
    addScore.classList.remove("d-none")
    timeCounter.classList.add("d-none")
    quizQuestions.classList.add("d-none")
   // addScore.classList.remove("d-none")
   
}