const username = document.getElementById('username');
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");



const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;
console.log(highScores);

// localStorage.setItem("highScores", JSON.stringify([])); //localstrg moze da prima samo string, ne moze niz i zato moramo preko jason-a da niz modifikujemo u string
//console.log(JSON.parse(localStorage.getItem("highScores"))); //sada zato sto smo pretvorili u string moramo da ga vratimo u niz a to radimo preko parse
finalScore.innerText = mostRecentScore;


 username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
 });

saveHighScore = e => {
    console.log("clicked the save btn");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };

    highScores.push(score); //znaci u niz smestamo elemnte score i username
    highScores.sort( (a,b) => {
        return b.score - a.score; //ako je b.score vece od a.score stavi b pre a
    });
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign("/");
};