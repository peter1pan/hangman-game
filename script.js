const word_element = document.getElementById("word");
const popup = document.getElementById("popup-container");
const successMessage = document.querySelector(".success-message");
const wrongLetters_el = document.getElementById("wrong-letters");
const items = document.querySelectorAll(".item");
const alreadyLetter = document.getElementById("message");
const playAgain = document
  .querySelector(".play-again")
  .addEventListener("click", tryAgain);

const correctLetters = [];
const wrongLetters = [];
const selectedWord = getRandomWord();

function getRandomWord() {
  const word = ["nodejs", "java", "reactjs"];
  return word[Math.floor(Math.random() * word.length)]; // worda yazılan kelimelerin lenghti kadar random üretme / ondalıklı sayı gelmemesi içinde math floor kullanıldı.
}

function displayWord() {
  word_element.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letters) => `
    <div class="letters">
    ${correctLetters.includes(letters) ? letters : ""}
    </div>
    `
      )
      .join("")}
    `;

  const comeWrod = word_element.innerText.replace(/\n/g, "");

  if (comeWrod === selectedWord) {
    popup.style.display = "flex";
    successMessage.innerText = "Congratulations";
  }
}

function updateWrongLetters() {
  wrongLetters_el.innerHTML = `
  ${wrongLetters.length > 0 ? "<h3>Wrong Letters</h3>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}<span>`)}
  
  `;

  items.forEach((item, index) => {
    const errorCount = wrongLetters.length;

    if (index < errorCount) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  if (wrongLetters.length === items.length + 1) {
    successMessage.innerText = "You lose.";
    popup.style.display = "flex";
  }
}
function displayMessage() {
  alreadyLetter.classList.add("show");
  setTimeout(function () {
    alreadyLetter.classList.remove("show");
  }, 2000);
}

window.addEventListener("keydown", function (event) {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    const letter = event.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        displayMessage();
        alreadyLetter.classList.add("show");
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetters();
      }
    }
  }
});

function tryAgain() {
  location.reload();
}

displayWord();
