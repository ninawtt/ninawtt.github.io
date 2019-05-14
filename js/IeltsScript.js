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
	displayCard(indexOfCards);
}

function changeToPartII() {
    initial();
    cards = IELTS_PARTII;
	displayCard(indexOfCards);
}

function changeToPartIII() {
    initial();
    cards = IELTS_PARTIII;
	displayCard(indexOfCards);
}

function firstCard() {
	displayCard(indexOfCards);
}

function prevCard() {
	if (indexOfHistory == 0) {
		indexOfCards = cardsHistory[indexOfHistory];
	}
	else {
		indexOfCards = cardsHistory[indexOfHistory - 1];
		indexOfHistory--;
	}
	displayCard(indexOfCards);
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
	displayCard(indexOfCards);
}

function displayQuestions(index) {
	var vocabs = cards[index].questions;
    var txt = "<ol>";
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

function displayCard(index) {
	document.getElementById("topicsTxt").innerHTML = cards[index].topic + "&nbsp;" + "<" +
		cards[index].questions.length + ">";
	document.getElementById("questionsTxt").innerHTML = displayQuestions(index);
}

function displayCardByFilter() {
	var input = document.getElementById("search").value.toUpperCase();
	var matchIndexList =[];
	for (var i = 0; i < cards.length; i++) {
		if (cards[i].topic.toUpperCase().indexOf(input) >= 0 ) {
			matchIndexList.push(i);	
		}
	}
	if (matchIndexList.length > 0) {
		displayCard(matchIndexList[0]);
	}
	for (var i = 0; i < matchIndexList.length; i++) {
		if (cards[matchIndexList[i]].topic.toUpperCase() === input.toUpperCase()) {
			displayCard(matchIndexList[i]);
		}
	}
}
		