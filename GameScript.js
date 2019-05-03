
var index = 0;

function firstCard() {
	displayCard();
}

function prevCard() {
	if (index != 0) {
		index--;
		displayCard();
	}	
}

function nextCard() {
	if (index != (CARDS.length - 1)) {
		index ++;
		displayCard();
	}	
}

function displayVocabs() {
	var vocabs = CARDS[index].vocabs;
	var txt = "<ul>";
	for (var i = 0; i < vocabs.length; i++){
		txt += "<li>" + vocabs[i] + "</li>" + "<br>"; 
	} 		    
	return txt;
}

function displayCard() {
	document.getElementById("topicsTxt").innerHTML = CARDS[index].topic.toUpperCase();
	document.getElementById("vocabsTxt").innerHTML = displayVocabs().toUpperCase();
}
		