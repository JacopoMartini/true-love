const answer = document.getElementById("answer");
const market = document.getElementById("market-change");

answer.textContent = "...";
market.textContent = "Checking the markets...";

fetch("/api/market")
  .then(response => response.json())
  .then(data => {

    const change = data.change;

    if (change >= 0) {
      answer.textContent = "YES.";
      market.textContent = `↑ +${change.toFixed(2)}%`;
    } else {
      answer.textContent = "NO.";
      market.textContent = `↓ ${change.toFixed(2)}%`;
    }

  })
  .catch(error => {

    answer.textContent = "?";
    market.textContent = "Markets unavailable";

    console.error(error);

  });