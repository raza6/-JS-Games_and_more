//On déclare les variables
var	gameLabel = [],
	checkboxDiv = [],
	diceValue = [],
	rollTheDiceButton = document.getElementById('rollTheDice'),
	keepCombinationButton = document.getElementById('keepCombination'),
	resetButton = document.getElementById('reset'),
	rollCounterSpan = document.getElementById('rollCounter'),
	turnCounterSpan = document.getElementById('turnCounter'),
	roundCounterSpan = document.getElementById('roundCounter'),
	total1Span = document.getElementById('total1'),
	total2Span = document.getElementById('total2'),
	currentCombinationUl = document.getElementById('currentCombination'),
	gameInfoDiv = document.getElementById('gameInfoDiv'),
	endTournamentDiv = document.getElementById('endTournament'),
	checkboxInput = document.getElementsByTagName('input'),
	scoringTd = document.getElementsByTagName('td'),
	gameLabelReset = ['Dé a','Dé b' ,'Dé c'],
	alea,
	point = 0,
	rollCounter = 0,
	playerRound = 0,
	total1Score = 0,
	total2Score = 0;

for(var i = 0; i < 3; i++) {
		gameLabel[i] = document.getElementById('dice' + (i+1));
		checkboxDiv[i] = document.getElementById('div' + (i+1));
	}
	
//On crée une fonction qui insère les checkbox à leur labels
function insertCheckbox () {
	var checkbox;
	for(var i = 0; i < 3; i++) {
		checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.name = 'dice' + (i+1);
		checkboxDiv[i].insertBefore(checkbox, gameLabel[i]);
	}
}

//On reconnait et affiche la combinaison

function combinationFinder () {
	var diceValueClone = diceValue.slice(0);
	diceValueClone.sort();
	if (diceValueClone[0] == 1 && diceValueClone[1] == 2 && diceValueClone[2] == 4) {
		displayCurrentCombination('421 - 10pts');
		point = 10;
	} else if (diceValueClone[0] == 1 && diceValueClone[1] == 1) {
		displayCurrentCombination(diceValueClone[2] + ' en l\'air - 7pts');
		point = 7;
	} else if (diceValueClone[0] == diceValueClone[1] && diceValueClone[1] == diceValueClone[2]) {
		displayCurrentCombination('Triplette de ' + diceValueClone[0] + ' - 6pts');
		point = 6;
	} else if (diceValueClone[0]+1 == diceValueClone[1] && diceValueClone[1]+1 == diceValueClone[2]) {
		displayCurrentCombination('Suite - 5pts');
		point = 5;
	} else if (diceValueClone[0] == 1 && diceValueClone[1] == 2 && diceValueClone[2] == 2) {
		displayCurrentCombination('221 - 1pt');
		point = 1;
	} else {
		displayCurrentCombination('Autres - 2pts');
		point = 2;
	}
}

function displayCurrentCombination (n) {
	var currentCombinationLi = document.createElement('li'), currentCombinationTxt = document.createTextNode(n);
	if (rollCounter == 1) {
		currentCombinationLi.id = 'currentCombinationLi';
		currentCombinationLi.appendChild(currentCombinationTxt);
		currentCombinationUl.appendChild(currentCombinationLi);
	} else {
		currentCombinationLi = document.getElementById('currentCombinationLi');
		currentCombinationLi.textContent = currentCombinationTxt.textContent;
	}
}

//On affiche les scores dans le tableau

function scoreManagement () {
	scoringTd[playerRound].textContent = point;
	if (playerRound%2 == 0) {
		total1Score += point;
		total1Span.textContent = total1Score;
	} else if (playerRound%2 == 1) {
		total2Score += point;
		total2Span.textContent = total2Score;
	}
}
		
//On prépare les nouveaux lancers
function reset () {
	rollCounter = 0;
	rollCounterSpan.textContent = rollCounter + '/3';
	keepCombinationButton.style.display = 'none';
	currentCombinationLi.parentNode.removeChild(currentCombinationLi);
	for(var i = 0; i < 3; i++) {
		checkboxInput[0].parentNode.removeChild(checkboxInput[0]);
		gameLabel[i].textContent = gameLabelReset[i];
	}
}

//On lance les dés
rollTheDiceButton.addEventListener('click', function () {
	if (playerRound < 6) {
		if (rollCounter < 3) {
			if (rollCounter == 0) {
				for(var i = 0; i < 3; i++) {
					alea = Math.floor(Math.random()*(6)+1);
					gameLabel[i].textContent = alea;
					diceValue[i] = alea;
				}
				rollCounter++;
				rollCounterSpan.textContent = rollCounter + '/3';
				keepCombinationButton.style.display = 'block'
				insertCheckbox ();
				combinationFinder();
			} else {
				rollCounter++;
				rollCounterSpan.textContent = rollCounter + '/3';
				for(var i = 0; i < 3; i++) {
					if (checkboxInput[i].checked == true) {
						alea = Math.floor(Math.random()*(6)+1);
						gameLabel[i].textContent = alea;
						diceValue[i] = alea;
					} else if (checkboxInput[0].checked == false && checkboxInput[1].checked == false && checkboxInput[2].checked == false) {
						alert('Vous n\'avez sélectionné aucun dé !');
						rollCounter--;
						rollCounterSpan.textContent = rollCounter + '/3';
						break;
					}
					if (i == 2) {
						combinationFinder();
					}
				}
			}
		} else {
			alert('Vous avez déjà lancé les dés trois fois !');
		}
	}
}, false);

	
//On gère l'alternance des joueurs
keepCombinationButton.addEventListener('click', function () {
	scoreManagement();
	reset();
	playerRound++;
	if (playerRound == 6) {
		gameInfoDiv.style.display = 'none';
		endTournamentDiv.style.display = 'block';
		if (total1Score > total2Score) {
			alert('Le joueur 1 a gagné ! Bravo !');
		} else if (total1Score < total2Score) {
			alert('Le joueur 2 a gagné ! Bravo !');
		} else {
			alert('Personne n\'a gagné...');
		}
	} else {
		if (playerRound%2 == 1) {
			turnCounterSpan.textContent = '2';
		} else {
			turnCounterSpan.textContent = '1';
			if (playerRound == 2) { 
				roundCounterSpan.textContent = '2/3';
			} else if (playerRound == 4) {
				roundCounterSpan.textContent = '3/3';
			}
		}
	}
}, false);


//On réinitialise tout
resetButton.addEventListener('click', function () {
	if (playerRound == 6) {
		fullReset();
	} else {
		if (confirm('Êtes vous sûr de vouloir recommencer le tournoi ?\n\nCette action est définitive et les scores seront réinitialisés !\n')) {
			fullReset();
		}
	}
}, false);

function fullReset () {
	rollCounterSpan.textContent = '0/3';
	turnCounterSpan.textContent = '1';
	roundCounterSpan.textContent = '1/3';
	total1Span.textContent = '0';
	total2Span.textContent = '0';
	for(var i = 0; i < 6; i++) {
		if (scoringTd[i].hasChildNodes() == true) {
			scoringTd[i].removeChild(scoringTd[i].firstChild);
		}
	}
	playerRound = 0;
	total1Score = 0;
	total2Score = 0;
	gameInfoDiv.style.display = 'block';
	endTournamentDiv.style.display = 'none';
}