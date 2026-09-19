const answer = document.getElementById("answer");
const market = document.getElementById("market-change");
const revealButton = document.getElementById("reveal");
const result = document.getElementById("result");
const song = document.getElementById("love-song");

revealButton.addEventListener("click", async () => {

  // Start the music
  song.play();

  // Hide the button
  revealButton.style.display = "none";

  // Reveal the result
  result.classList.remove("hidden");

  answer.textContent = "...";
  market.textContent = "Checking the markets...";

  try {

    const response = await fetch("/api/market");
    const data = await response.json();

    const change = data.change;

    if (change >= 0) {
      answer.textContent = "YES.";
      market.textContent = `↑ +${change.toFixed(2)}%`;
    } else {
      answer.textContent = "NO.";
      market.textContent = `↓ ${change.toFixed(2)}%`;
    }

  } catch (error) {

    answer.textContent = "?";
    market.textContent = "Markets unavailable";

    console.error(error);

  }

});