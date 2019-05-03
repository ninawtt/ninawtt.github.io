
var indexOfCards = 0;
var langEn = true;
var cards = EN_CARDS;

function changeToEn() {
	langEn = true, cards = EN_CARDS;
	firstCard();
}

function changeToCh() {
	langEn = false, cards = CH_CARDS;
	firstCard();
}

function firstCard() {
	indexOfCards = 0;
	displayCard();
}

function prevCard() {
	if (indexOfCards != 0) {
		indexOfCards--;
		displayCard();
	}
	else {
		indexOfCards = cards.length - 1;
		displayCard();
	}	
}

function nextCard() {
	if (indexOfCards != (cards.length - 1)) {
		indexOfCards ++;
		displayCard();
	}	
	else {
		indexOfCards = 0;
		displayCard();
	}
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
		