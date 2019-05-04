var langEn = true;
var cards = EN_CARDS;
var indexOfCards, cardsHistory, indexOfHistory;
initial();

function initial() {
	indexOfCards = getRdnCardIndex();
	cardsHistory = [indexOfCards];
	indexOfHistory = 0;
}

function getRdnCardIndex() {
	return Math.floor(Math.random() * (cards.length - 1));
}

function changeToEn() {
	langEn = true, cards = EN_CARDS;
	displayCard();
}

function changeToCh() {
	langEn = false, cards = CH_CARDS;
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
	for (var i = 0; i < vocabs.length; i++){
		txt += "<li>" + vocabs[i] + "</li>" + "<br>"; 
	} 		    
	return txt;
}

function displayCard() {
	document.getElementById("topicsTxt").innerHTML = cards[indexOfCards].topic.toUpperCase();
	document.getElementById("vocabsTxt").innerHTML = displayVocabs().toUpperCase();
}
		