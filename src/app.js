import "bootstrap";
import "./style.css";

window.onload = function() {
  createCard(pickACard());
  document.querySelector("#button").addEventListener("click", () => {
    createCard(pickACard());
  });

  document.querySelector("#setTimeButton").addEventListener("click", () => {
    const userTime = parseInt(document.querySelector("#timeInput").value);
    if (!isNaN(userTime) && userTime > 0) {
      setReloadTime(userTime);
    } else {
      alert("Please enter a valid positive number.");
    }
  });
};

const Card = {
  suits: ["♦", "♥", "♠", "♣"],
  cardValues: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
};

let reloadTime = 1000; // Default reload time
let countdownInterval; // Declare the countdown interval variable globally

function pickACard() {
  let a = Math.floor(Math.random() * Card.suits.length);
  let b = Math.floor(Math.random() * Card.cardValues.length);

  let selectedCard = {
    suit: Card.suits[a],
    value: Card.cardValues[b]
  };
  return selectedCard;
}

function createCard(cardObject) {
  console.log("Creating card:", cardObject);
  let suitString = cardObject.suit;
  let valueString = cardObject.value;

  document.querySelector(".suit").innerHTML = suitString;
  document.querySelector(".rotated").innerHTML = suitString;

  if (cardObject.suit === "♠" || cardObject.suit === "♣") {
    document.querySelector(".suit").classList.add("black");
    document.querySelector(".rotated").classList.add("black");
  } else {
    document.querySelector(".suit").classList.remove("black");
    document.querySelector(".rotated").classList.remove("black");
  }

  document.querySelector(".value").innerHTML = valueString;

  clearCountdown();
  startCountdown(reloadTime);
}

let contador = 10;
function startCountdown(seconds) {
  document.getElementById("contador").innerText = `Time to reload: ${contador}`;

  countdownInterval = setInterval(() => {
    contador--;
    document.getElementById(
      "contador"
    ).innerText = `Time to reload: ${contador}`;

    if (contador <= 0) {
      clearInterval(countdownInterval);
      window.location.reload();
    }
  }, 1000);
}

function clearCountdown() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
}

function setReloadTime(newTime) {
  contador = newTime;

  document.getElementById(
    "contador"
  ).innerText = `Reload time set to: ${contador / 1000} seconds`;
}
