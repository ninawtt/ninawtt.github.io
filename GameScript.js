var cards = [
	{topic:"classroom", vocabs: ["desk", "student", "teacher","school", "learn"]},
	{topic:"christmas", vocabs: ["december", "santa", "tree", "presents", "celebrate"]},
	{topic:"lighting", vocabs: ["wet", "rain", "thunder", "bolt", "umbrella"]},
	{topic:"water bottle", vocabs: ["drink", "thirsty", "hot", "sports", "fill"]},
	{topic:"head", vocabs: ["face", "toe", "part", "body", "torso"]}
];
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
	if (index != (cards.length - 1)) {
		index ++;
		displayCard();
	}	
}

function displayVocabs() {
	var vocabs = cards[index].vocabs;
	var txt = "<ul>";
	for (var i = 0; i < vocabs.length; i++){
		txt += "<li>" + vocabs[i] + "</li>" + "<br>"; 
	} 		    
	return txt;
}

function displayCard() {
	document.getElementById("topicsTxt").innerHTML = cards[index].topic.toUpperCase();
	document.getElementById("vocabsTxt").innerHTML = displayVocabs().toUpperCase();
}
		