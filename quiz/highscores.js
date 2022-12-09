const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


highScoresList.innerHTML = highScores //map uzima niz i dozvoljava da se konvertuje svaki clan u nesto novo u novom nizu
.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
})
.join("");

