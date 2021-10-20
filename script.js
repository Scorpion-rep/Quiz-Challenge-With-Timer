const quizQuestions = document.querySelector("#quiz-questions");
const timer = document.querySelector("#timer");
const startBtn = document.querySelector("#start-button");
const timeCountDown = document.querySelector("#time-count");
const titleItem = document.querySelector("#title-item");
const questionAnswers = document.querySelector("#quiz-choices");
const myScore = document.querySelector("#score");
const btnScore = document.querySelector("#btnScore");
const addScore = document.querySelector("#addscore")
const alert = document.querySelector("#alert");
const info = document.querySelector("#info");

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

// start the game => questions are displayed with multiple choices
startBtn.addEventListener("click", startQuiz);

// when the quiz starts => info section is hidden, timer and quiz displayed 
function startQuiz() {
    if(storedScores !==null) {
        allScores = storedScores;
    }

    info.classList.add("d-none")
    startBtn.classList.add("d-none")
    timeCountDown.classList.remove("d-none")
    quizQuestions.classList.remove("d-none")

    nextQuestions = questions[currentIndex]
    console.log(nextQuestions.title)

    displayQuestion(nextQuestions)

    gameTime()

}

// Timer starts to count down when the game start
function gameTime() {

    timeInterval = setInterval(function() {
        timer.innerText = count
        count--;

        if (count < 0 ) {
            return endgame()
        }
    }, 1000);

}

// function to show questions and multiple choices
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

// questions are presented one after another with correction when choice is clicked until game end 
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

// function to give notification if the answer is correct or wrong
function correction(response) {

    if(response) {
        alert.innerText = "Correct!"
        console.log ("Correct!")
    }else {
        alert.innerText = "Wrong!"
        count = count -10
        timer.innerHTML = count
        console.log("Wrong!")
    }

    setTimeout(function() {
        alert.innerText = ""
    }, 1000);

}

// when the game ends, timer stops => timer div is hidden and display the score submit page
function endgame() {

    clearInterval(timeInterval)
    myScore.innerText = count
    addScore.classList.remove("d-none")
    timeCountDown.classList.add("d-none")
    quizQuestions.classList.add("d-none")  
   
}

// when score button is clicked, score page take in username input and score
btnScore.addEventListener("click", function() {

    let name = document.querySelector("#user-input").value
    scorePage(name, count)
});

// store the scores in localStorage with user name input
function scorePage(a, b) {

    let userData = {
        userName: a,
        userScore: b
    };
    allScores.push(userData);

    localStorage.setItem("userData", JSON.stringify(allScores));
    location.href = "score.html";
}