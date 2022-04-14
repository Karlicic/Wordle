var data = new Array("black", "white", "girls", "games", "fewer", "crane", "oiler", "squad");
var randomNum = Math.floor(Math.random() * data.length);
var word = data[randomNum];
var tries = 5;
var guessedWord;
var numGuesses = 0;
var inputWordElement = document.getElementById("inputWord");
var guessedWordsField = document.getElementById("guessedWords");
var numCorrect = 0;
var validateWord = function (guessedWord) {
    if (!guessedWord || guessedWord == "" || guessedWord.length < 5 || data.indexOf(guessedWord) < 0) {
        return false;
    }
    return true;
};
var removeError = function (inputWord) {
    if (inputWord.classList.contains("error")) {
        inputWord.classList.remove('error');
    }
};
var checkLetter = function (letter, position) {
    if (word.indexOf(letter) < 0) {
        return "gray";
    }
    if (word.charAt(position) !== letter) {
        return "yellow";
    }
    numCorrect++;
    return "green";
};
inputWordElement.addEventListener("keydown", function (e) {
    removeError(inputWordElement);
    if (e.key === "Enter") {
        guessedWord = inputWordElement.value;
        if (!validateWord(guessedWord)) {
            inputWordElement.classList.add('error');
        }
        else {
            numGuesses++;
            var row = document.createElement("div");
            row.classList.add("row");
            var col = document.createElement("div");
            col.classList.add("col-3");
            row.appendChild(col);
            for (var i = 0; i < 5; i++) {
                var col_1 = document.createElement("div");
                col_1.classList.add("col-1");
                var colorClass = checkLetter(guessedWord[i], i);
                col_1.classList.add(colorClass);
                var textNode = document.createTextNode(guessedWord[i]);
                col_1.style.color = "white";
                col_1.appendChild(textNode);
                row.appendChild(col_1);
            }
            col = document.createElement("div");
            col.classList.add("col-3");
            row.appendChild(col);
            guessedWordsField.appendChild(row);
            setTimeout(function () {
                if (numCorrect == 5) {
                    var answer = confirm("You won! Do you want to play again?");
                }
                else if (numGuesses > 4) {
                    answer = confirm("You lost... :( The correct word was ".concat(word, ". Do you want to play again?"));
                }
                if (numGuesses > 4 || numCorrect == 5) {
                    if (answer) {
                        location.reload();
                    }
                    else {
                        inputWordElement.disabled = true;
                    }
                }
                numCorrect = 0;
            }, 500);
        }
    }
});
