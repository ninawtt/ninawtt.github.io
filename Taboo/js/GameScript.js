﻿var langEn = true;
var cards = EN_CARDS;
var indexOfCards, indexOfHistory;
var cardsHistory = [];
initial();

function initial() {
	indexOfCards = getRdnCardIndex();
	cardsHistory = [indexOfCards];
	indexOfHistory = 0;
}

function getRdnCardIndex() {
  var randomNumber = Math.floor(Math.random() * (cards.length));
  if (cardsHistory.length > 1) {
    while (cardsHistory[cardsHistory.length - 1] === randomNumber) {
      randomNumber = Math.floor(Math.random() * (cards.length));
    }
  }
  return randomNumber;
}

function changeToEn() {
	langEn = true; cards = EN_CARDS;
	displayCard();
}

function changeToCh() {
	langEn = false; cards = CH_CARDS;
	displayCard();
}

function firstCard() {
	displayCard();
}

function prevCard() {
	if (indexOfHistory == 0) {
		indexOfCards = cardsHistory[indexOfHistory];
	}
	else {
		indexOfCards = cardsHistory[indexOfHistory - 1];
		indexOfHistory--;
	}
	displayCard();
}

function nextCard() {
	if (indexOfHistory == (cardsHistory.length - 1)) {
		indexOfCards = getRdnCardIndex();
		cardsHistory.push(indexOfCards);
	}
	else {
		indexOfCards = cardsHistory[indexOfHistory + 1];
	}
	indexOfHistory++;
	displayCard();
}

function displayVocabs() {
	var vocabs = cards[indexOfCards].vocabs;
	var txt = "<ul>";
	if (langEn == true) {
		for (var i = 0; i < vocabs.length; i++){
			txt += "<li>" + vocabs[i] + "</li>" + "<br>"; 
		} 
	}
	else {
		for (var i = 0; i < vocabs.length; i++){
			var vocabArray = vocabs[i].split(",");
			txt += "<li>" + 
			"<div class = 'pinyinVocab'>" + vocabArray[0] + "</div>" +
			"<div class = 'chineseVocab'>" + vocabArray[1] + "</div>" +
			"<div class = 'englishVocab'>" + EN_CARDS[indexOfCards].vocabs[i] + "</div>" +
			"</li>" + "<br>"; 
		} 
	}
			    
	return txt;
}

function displayCard() {
	document.getElementById("topicsTxt").innerHTML = cards[indexOfCards].topic.toUpperCase();
	document.getElementById("vocabsTxt").innerHTML = displayVocabs().toUpperCase();
}

// Search Bar
function displayCardByFilter() {
	var input = document.getElementById("search").value.toUpperCase();
	var matchIndexList =[];

	// Search the index of specific input and save it into a matchIndexList array
	for (var i = 0; i < cards.length; i++) {
		if (cards[i].topic.toUpperCase().indexOf(input) >= 0 ) {
			matchIndexList.push(i);	
		}
	}
	// Display the first card in the matchIndexList if it has any
	if (matchIndexList.length > 0) {
		indexOfCards = matchIndexList[0];
		displayCard();
	}
	// If there are more than two cards fit, this method will display the exactly same topic as the input 
	for (var i = 0; i < matchIndexList.length; i++) {
		if (cards[matchIndexList[i]].topic.toUpperCase() === input.toUpperCase()) {
			indexOfCards = matchIndexList[i];
			displayCard();
		}
	}
}

		