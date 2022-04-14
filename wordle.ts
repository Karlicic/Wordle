const data : string[] = new Array("black", "white", "girls", "games", "fewer","crane","oiler","squad");
const randomNum = Math.floor(Math.random()*data.length);
const word = data[randomNum];
const tries = 5;

var guessedWord : string;
let numGuesses = 0;
var inputWordElement : HTMLElement = document.getElementById("inputWord");
let guessedWordsField : HTMLElement = document.getElementById("guessedWords");
var numCorrect = 0;

type ResultColors = "green" | "yellow" | "gray";

var validateWord = function (guessedWord: string){
    if(!guessedWord || guessedWord == "" || guessedWord.length <5 || data.indexOf(guessedWord) < 0){
        return false;
    }
    return true;
}

var removeError = function (inputWord: HTMLElement){
    if(inputWord.classList.contains("error"))
    {
        inputWord.classList.remove('error');
    }
}

var checkLetter = function(letter : string, position : number) : ResultColors {
    if(word.indexOf(letter) < 0){
        return "gray";
    }
    if(word.charAt(position) !== letter){
        return "yellow";
    }
    numCorrect ++;
    return "green"
}

inputWordElement.addEventListener("keydown", function(e){
    removeError(inputWordElement);
    if(e.key === "Enter"){
        guessedWord = (<HTMLInputElement>inputWordElement).value;
        if(!validateWord(guessedWord)){
            inputWordElement.classList.add('error');
        }
        else{
            numGuesses ++;
            var row = document.createElement("div");
            row.classList.add("row");
            let col = document.createElement("div");
            col.classList.add("col-3");
            row.appendChild(col);
            for(var i = 0; i< 5 ; i++){
                let col = document.createElement("div");
                col.classList.add("col-1");
                let colorClass= checkLetter(guessedWord[i], i);
                col.classList.add(colorClass);
                let textNode = document.createTextNode(guessedWord[i]);
                col.style.color = "white";
                col.appendChild(textNode);
                row.appendChild(col);
            }
            col = document.createElement("div");
            col.classList.add("col-3");
            row.appendChild(col);

            guessedWordsField.appendChild(row);

            setTimeout(function(){
                if(numCorrect == 5){
                    var answer = confirm(`You won! Do you want to play again?`);
                }
            else if(numGuesses > 4){
                    answer = confirm(`You lost... :( The correct word was ${word}. Do you want to play again?`)
                }

            if(numGuesses > 4 || numCorrect == 5){
                    if(answer){
                        location.reload();
                    }
                    else{
                        (<HTMLInputElement>inputWordElement).disabled = true;
                    }
                }
            numCorrect = 0;
            }, 500)
        }
    }
});