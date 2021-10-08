let quizSection = document.getElementById("quiz-container");
let startSection = document.getElementById("start");


let intervalId = null;
let timeRemaining = 20;

// set timer for question page
function startTimer(){
    intervalId = setInterval(function () {
        console.log();
        timeRemaining = timeRemaining -1;

        if(timeRemaining < 0) {
            return endGame();
        }
        // update the timer div
        timerEl.textContent = timeRemaining;
    }, 1000);
}


//when start button is clicked, shows landing page
// starts
startGameButton.addEventListener("click", function(event){
    event.defaultPrevented();
// 1. Timer will start
    startTimer()
    // 2. question page shows up
    quizSection.classList.remove("hide");
    // Hide the landing page when question section shows up
    startSection.classList.add("hide");
})

//open the ending Section and close quiz section
function nameSubmit() {
  //1. stop the timer
  clearInterval(intervalId);
    // show ending sect
    endingSection.classList.remove("hide");
    // hide quiz sect
    quizSection.classList.add("hide");
}

const highscoreSection = document.getElementById("highscore-section")
const endingSection = document.getElementById("ending-section")

// High score section shows after the game finished
function endGame() {
    
    //2. show the high score page
    highscoreSection.classList.remove("hide");
    
    endingSection.classList.add("hide");
}

//redirect to landing page


//when we click on choice button

//need to check if button clicked is the correct choice

//is correct:
//show a message or pop up box that the choice is correct
//move on to the next question

//if wrong:
//move to next question
//deduct time from timer
//show a message that the choice is incorrect

// When we end the game
// 1. if user on the last question
// after user click on the choice
// 2. timer runs out

//Ending Page-High score page
//when form is submitted
//we want to save the highscore
