const storedScores = JSON.parse(localStorage.getItem("userData")) || [];
const highScoreArea = document.querySelector("#highScoresList");
const backBtn = document.querySelector("#backButton");
const clearBtn = document.querySelector("clearScores");


function displayScores() {
    if (storedScores !== null) {
        let scoreList = document.createElement("ol");
        scoreList.className = "scoreListClass";
        for (var i = 0; i < storedScores.length; i++) {
            var initials = storedScores[i].inits;
            var scores = storedScores[i].userScore
            var scoreEntry = document.createElement("li")
            scoreEntry.innerHTML = initials + " - " + scores;
            scoreList.appendChild(scoreEntry);
        }
        highScoreArea.appendChild(scoreList);
    }
};

displayScores();

backBtn.addEventListener("click", function () {
    location.href = "index.html";
});

clearBtn.addEventListener("click", function () {
     
    localStorage.removeItem(storedScores)
    window.localStorage.clear();    
     
    
});