//constanten
const woord = "assss";
const alphabet = Array.from("abcdefghijklmnopqrstuvwxyz");
const feedback = document.getElementById("outputtext")

//woord naar Array, zichtbaar in html
const woord2 = Array.from(woord);
const wordGuess = [];
for (const letter in woord2) {
  wordGuess.push("_");
}
showRandomWord(wordGuess);

//Letter invoeren, checken op validiteit
document.getElementById("submit").addEventListener("click", speelRonde);

function speelRonde(){
    const letter = document.getElementById("inputfield").value.toLowerCase();
    const validLetter = lettercheck(letter);
    if (validLetter == true){
        letterIncludes(letter);
    }
}




//als de letter in alphabet zit: true->verwijder letter uit alphabet. false-> geef foutmelding
function lettercheck(letter) {
  let textoutput = "";
  let vLetter 
    if (alphabet.includes(letter) ) {
    alphabet.splice(alphabet.indexOf(letter), 1);
    console.log(alphabet);
    vLetter = true
  } 
  else {
    textoutput =
      "Je invoer is niet valide, of de letter is al eerder geprobeerd";
      vLetter =  false
  }
 feedback.innerHTML = textoutput;
 return vLetter;
}


//check if woord includes given letter. true-> fill letter at all indexes. if false -> add penaltypoint (model) + visible class (view)
function letterIncludes(letter) {
  if (woord2.includes(letter)) {
    letterInWord = getAllIndexes(woord2, letter);
    for (const ltr of letterInWord) {
      wordGuess.splice(ltr, 1, letter);
    }
    console.log(letterInWord);
    console.log(wordGuess);
    showRandomWord(wordGuess);
    checkForWin(wordGuess);
  }
}

//display guessword in html
function showRandomWord(displaywoord) {
  const spann = (document.getElementById("random woord").innerHTML = displaywoord);
}

//after adding a letter, check if you have the entire word
function checkForWin(word){
    if (word.includes('_') == false){
        let textOutputWin = "Gefeliciteerd, je hebt het woord geraden!";
        console.log(textOutputWin);
               feedback.innerHTML = textOutputWin;
               console.log(feedback.innerHTML);
    }
}



//function to show all indexes where the letter is found
function getAllIndexes(arr, val) {
  var indexes = [],
    i;
  for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
  return indexes;
}
