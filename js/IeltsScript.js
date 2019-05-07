var cards;
var indexOfCards, cardsHistory, indexOfHistory;
initial();

function initial() {
    cards = IELTS_PARTI;
    indexOfCards = getRdnCardIndex();
	cardsHistory = [indexOfCards];
	indexOfHistory = 0;
}

function getRdnCardIndex() {
	return Math.floor(Math.random() * (cards.length - 1));
}

function changeToPartI() {
    initial();
    cards = IELTS_PARTI;
	displayCard();
}

function changeToPartII() {
    initial();
    cards = IELTS_PARTII;
	displayCard();
}

function changeToPartIII() {
    initial();
    cards = IELTS_PARTIII;
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

function displayQuestions() {
	var vocabs = cards[indexOfCards].questions;
    var txt = "<ul>";
    if (cards == IELTS_PARTII) {
        txt += "You should say:";
        for (var i = 0; i < vocabs.length; i++){
            txt += "<li>" + vocabs[i] + "</li>"; 
        } 	
    }
	else {
        for (var i = 0; i < vocabs.length; i++){
		    txt += "<li>" + vocabs[i] + "</li>"; 
        } 	
    }	    
	return txt;
}

function displayCard() {
	document.getElementById("topicsTxt").innerHTML = cards[indexOfCards].topic;
	document.getElementById("questionsTxt").innerHTML = displayQuestions();
}
		