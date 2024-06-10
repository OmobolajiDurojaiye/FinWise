"use strict";

let incomeInputed = 0;
let total = 0;

// Theme
document.querySelector(".theme").addEventListener("click", function () {
  document.body.style.background = "whitesmoke";
  document.querySelectorAll("a").forEach(function (a) {
    a.style.color = "#fff";
  });
  document.querySelectorAll("p").forEach(function (p) {
    p.style.color = "#000";
  });
  document.querySelectorAll("h1").forEach(function (h1) {
    h1.style.color = "#000";
  });
  document.querySelectorAll("span").forEach(function (span) {
    span.style.color = "greenyellow";
  });
});

// Row creation
const tbody = document.querySelector(".budget-Tracker tbody");
for (let i = 1; i <= 1; i++) {
  const row = document.createElement("tr");
  row.innerHTML = `
        <td>${i}</td>
        <td><input type="number" class='groceries' name="groceries-${i}" /></td>
        <td><input type="number" class='transportation' name="transportation-${i}" /></td>
        <td><input type="number" class='entertainment' name="entertainment-${i}" /></td>
        <td><input type="number" class='savings' name="savings-${i}" /></td>
        <td><input type="number" class='utilities' name="utilities-${i}" /></td>
        <td><input type="number" class='housing' name="housing-${i}" /></td>
        <td><input type="number" class='others' name="others-${i}" /></td>
    `;
  tbody.appendChild(row);
}

// Inputting Income amount
document.querySelector(".totalIncome").addEventListener("click", function () {
  incomeInputed = Number(document.querySelector("#incomeInputed").value);
  if (incomeInputed) {
    document.querySelector(".income-amount").textContent = incomeInputed;
    document.querySelector(".totIncome").textContent = incomeInputed;
    document.querySelector("#incomeInputed").value = "";
    document.querySelector(".warn").textContent = "Great!";
    document.querySelector(".warn").style.color = "green";
  } else {
    document.querySelector(".warn").textContent = "*This field can't be empty";
    document.querySelector(".warn").style.color = "red";
  }
});

// Calculating the expense
document.querySelector(".calcExpense").addEventListener("click", function () {
  let groceries = Number(document.querySelector(".groceries").value);
  let transportation = Number(document.querySelector(".transportation").value);
  let entertainment = Number(document.querySelector(".entertainment").value);
  let savings = Number(document.querySelector(".savings").value);
  let utilities = Number(document.querySelector(".utilities").value);
  let housing = Number(document.querySelector(".housing").value);
  let others = Number(document.querySelector(".others").value);

  total =
    groceries +
    transportation +
    entertainment +
    savings +
    utilities +
    housing +
    others;
  document.querySelector(".expense").textContent = total;
  document.querySelector(".totExpense").textContent = total;

  updateAdvice();
});

// Word of advice
function updateAdvice() {
  const good = [
    "Great Job Today",
    "Kudos on your savvy spending! Your financial smarts are shining bright.",
    "Smart spender alert! Your financial finesse is on point!",
    "Bravo! Your money moves are on point. Keep up the great work!",
    "Thumbs up for your smart spending habits! Keep shining bright!",
  ];

  const bad = [
    "Time for a financial glow-up! Let's work together to make your money work smarter, not harder.",
    "Let's upgrade your money game! Time to turn spending into saving.",
    "Time to flip the script on spending habits. Let's pave the way to financial freedom together!",
    "Let's switch gears and steer towards smarter spending. Your financial future will thank you!",
  ];

  let adviceIndex =
    incomeInputed > total
      ? Math.floor(Math.random() * good.length)
      : Math.floor(Math.random() * bad.length);
  document.querySelector(".wordOfAdvice").textContent =
    incomeInputed > total ? good[adviceIndex] : bad[adviceIndex];
}
