//constanten
const woord = pickWord();
const alphabet = Array.from("abcdefghijklmnopqrstuvwxyz");
const feedback = document.getElementById("outputtext")
let bijnaAf = 0;

//woord naar Array, zichtbaar in html
const woord2 = Array.from(woord);
const wordGuess = [];
for (const letter in woord2) {
  wordGuess.push("_");
}
showRandomWord(wordGuess);

//Letter invoeren, speelronde
document.getElementById("submit").addEventListener("click", speelRonde);

function speelRonde(){
    const letter = document.getElementById("inputfield").value.toLowerCase();
    const validLetter = lettercheck(letter);
    if (validLetter == true){
        letterIncludes(letter);
    }
    checkForWin(wordGuess);
    checkForLoose();
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
    showRandomWord(wordGuess);
  }
    
  else {
      bijnaAf = bijnaAf + 1; 
      let aantalBeurten = 6-bijnaAf;
    document.getElementById('beurten').innerHTML = `je hebt nog ${aantalBeurten} beurten over`;
    
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
               document.getElementById('galgje').setAttribute("class","gamewin");
               anotherGame();
    }
}

//controleer of je verloren hebt
function checkForLoose(){
  if (bijnaAf===6){
    feedback.innerHTML='Helaas, je hebt verloren';
    document.getElementById('galgje').setAttribute("class","gamelos");
    anotherGame();
    return
  }
}


//function to show all indexes where the letter is found
function getAllIndexes(arr, val) {
  var indexes = [],
    i;
  for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
  return indexes;
}

function pickWord(){
const randomWoordenLijst =["samenscholing","waterviool",'vreugde','schikking','inrichten','afstandsbediening','heldhaftig','werksfeer','sopraan','achteloos','camperen',
'snoek','politie','identificatienummer','radicalisering','huwelijksnacht','historicus', 'dromedarissen']
const index = Math.round(Math.random()*20);
const newWord = randomWoordenLijst[index]
return newWord;
}

function anotherGame(){
  document.getElementById('button').setAttribute("class","visible")
}

document.getElementById("button").addEventListener("click", opnieuw);

function opnieuw(){
  location.reload();
}