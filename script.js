const startSection = document.getElementById("start");
const quizContainer = document.getElementById("quiz-container");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("start")

const submitSection = document.getElementById("submit");
const submitBtn = document.getElementById("submit");
const resultSection = document.getElementById("result");
const nextBtn = document.getElementById("answer-btn")

// Timer
let intervalID = null;
let timeRemaining = 20;

// innitial variables
let pos = 0;
let correct = 0;
let quiz, quiz_status, question,choice, choices, choiceA, choiceB, choiceC, choiceD;


function startTimer() {
    intervalID = setInterval(function () {
        console.log();
        timeRemaining = timeRemaining -1;

        if (timeRemaining < 0) {
            return endGame();
        }

        //update timer div
        timeEl.textContent = timeRemaining;
    }, 1000);
}

startBtn.addEventListener("click", function(event) {
    event.preventDefault()
    //timer starts
    startTimer()
    // remove landing section and display quiz section   
    quizContainer.classList.remove("hide");
    startSection.classList.add("hide");
})

function get(x) {
    return document.getElementById(x);
}

// function renders question for display on the page
function renderQuestion () {
    quiz = get("quiz");
    
    if(pos >= questions.length) {
        quiz.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
        get ("quiz_status").innerHTML = "Test completed";

        //reset the variable to allow users to restart the quiz
        pos = 0;
        correct = 0;
        // to stop rest of renderQuestion function running when the test is completed
        return false;
    }

    get("quiz_status").innerHTML = "Question "+(pos+1)+" of "+questions.length;

    question = questions[pos].question;
    choiceA = questions[pos].a;
    choiceB = questions[pos].b;
    choiceC = questions[pos].c;
    choiceD = questions[pos].d;

    //display the question
    quiz.innerHTML = "<h3>"+question+"</h3>";

    // display the question
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='A'>"+choiceA+"</label><br>";
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='B'>"+choiceB+"</label><br>";
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='C'>"+choiceC+"</label><br>";
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='D'>"+choiceD+"</label><br><br>";
    quiz.innerHTML += "<button id='check-answer' onclick='checkAnswer()'>SubmitAnswer</button>";
}

function checkAnswer() {
    // getElementByName as we have an array which will loop throu
    choices = document.getElementsByName("choices");
    
    for(var i=0; i<choices.length; i++) {
        if(choices[i].checked) {
            choice = choices[i].value;

        }
    }
    // check answer if matched with correct choice
    if(choice == questions[pos].answer) {
        // each time value increases if answer is correct
        correct++;

        
    } else {
        // Time deducted with incorrect answer
        timeRemaining = timeRemaining - 5
    }
    // change position of which character user is on
    pos++;
    // renderQuestion function runs again to go to next question
    renderQuestion();
    
    
    
}
window.addEventListener("load", renderQuestion);

nextBtn.addEventListener("click", function(endGame) {
    endGame.preventDefault()
    
    //2. show submit page
    submitSection.classList.remove("hide");
    // hide the quizContainer
    quizContainer.classList.add("hide");
})

function endGame() {

    if(timeRemaining == null) {
        document.getElementById("check-answer").disabled = true;
        
    } else {
        document.getElementById("check-answer").disabled = false;
    }
    
   clearInterval(intervalId);
   
}

// submitBtn.addEventListener("click", function() {



    // high score page show when submit button is clicked
//    resultSection.classList.remove("hide");
//    submitSection.classList.add("hide");
    
//})
