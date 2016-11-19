/* Création du damier */
var tableHtml = document.getElementById('table'),
	trHtml = [],
	tdHtml = [],
	cellNumber = [],
	boardSize = 10,
	bombTotal = 10,
	boardSizeCell = boardSize*boardSize;

//On crée le damier
function createBoard () {
	for (var i = 0; i < boardSize; i++) {
		trHtml[i] = document.createElement('tr');
		tableHtml.appendChild(trHtml[i]);
		for(var j = 0; j < boardSize; j++) {
			tdHtml[j] = document.createElement('td');
			tdHtml[j].id = ((i*boardSize)+j);
			trHtml[i].appendChild(tdHtml[j]);
		}
	}
}


function play () {
	/* Création du bombPattern */
	var bombPattern = [],
		randomNumber = 0,
		cellOpen = [],
		security = true,
		totalFalse = boardSizeCell;
		
	for (var i = 0; i < boardSizeCell; i++) {
		bombPattern[i] = 0;
		cellOpen[i] = false;
	}

	for (var i = 0; i < bombTotal; i++) {
		do {
			randomNumber = Math.floor(Math.random()*(boardSizeCell));
		} while (bombPattern[randomNumber] == 10);
		bombPattern[randomNumber] = 10;
	}
	
	/* Complétion du bombPattern */

	for (var i = 0; i  < boardSizeCell; i++) {
		//Cas haut gauche
		if (i == 0) {
			if (bombPattern[i] == 10) {
				if (bombPattern[i+1] != 10) {
					bombPattern[i+1]++;
				}
				if (bombPattern[i+parseFloat(boardSize)] != 10) {
					bombPattern[i+parseFloat(boardSize)]++;
				}
				if (bombPattern[i+parseFloat(boardSize)+1] != 10) {
					bombPattern[i+parseFloat(boardSize)+1]++;
				}			
			}
		}
		//Cas haut droite
		else if (i == boardSize-1) {
			if (bombPattern[i] == 10) {
				if (bombPattern[i-1] != 10) {
					bombPattern[i-1]++;
				}
				if (bombPattern[i+parseFloat(boardSize)] != 10) {
					bombPattern[i+parseFloat(boardSize)]++;
				}
				if (bombPattern[i+parseFloat(boardSize)-1] != 10) {
					bombPattern[i+parseFloat(boardSize)-1]++;
				}			
			}		
		}
		//Cas bas gauche
		else if (i == (boardSizeCell)-boardSize) {
			if (bombPattern[i] == 10) {
				if (bombPattern[i+1] != 10) {
					bombPattern[i+1]++;
				}
				if (bombPattern[i-boardSize] != 10) {
					bombPattern[i-boardSize]++;
				}
				if (bombPattern[i-boardSize+1] != 10) {
					bombPattern[i-boardSize+1]++;
				}			
			}		
		}
		//Cas bas droite
		else if (i == (boardSizeCell)-1) {
			if (bombPattern[i] == 10) {
				if (bombPattern[i-1] != 10) {
					bombPattern[i-1]++;
				}
				if (bombPattern[i-boardSize] != 10) {
					bombPattern[i-boardSize]++;
				}
				if (bombPattern[i-boardSize-1] != 10) {
					bombPattern[i-boardSize-1]++;
				}			
			}
		}
		//Cas haut
		else if (i > 0 && i < boardSize-1) {
			if (bombPattern[i] == 10) {
				if (bombPattern[i-1] != 10) {
					bombPattern[i-1]++;
				}
				if (bombPattern[i+1] != 10) {
					bombPattern[i+1]++;
				}
				if (bombPattern[i+parseFloat(boardSize)-1] != 10) {
					bombPattern[i+parseFloat(boardSize)-1]++;
				}
				if (bombPattern[i+parseFloat(boardSize)+1] != 10) {
					bombPattern[i+parseFloat(boardSize)+1]++;
				}
				if (bombPattern[i+parseFloat(boardSize)] != 10) {
					bombPattern[i+parseFloat(boardSize)]++;
				}
			}
		}
		//Cas bas
		else if (i > (boardSizeCell)-boardSize && i < (boardSizeCell)-1) {
			if (bombPattern[i] == 10) {
				if (bombPattern[i-1] != 10) {
					bombPattern[i-1]++;
				}
				if (bombPattern[i+1] != 10) {
					bombPattern[i+1]++;
				}
				if (bombPattern[i-boardSize-1] != 10) {
					bombPattern[i-boardSize-1]++;
				}
				if (bombPattern[i-boardSize+1] != 10) {
					bombPattern[i-boardSize+1]++;
				}
				if (bombPattern[i-boardSize] != 10) {
					bombPattern[i-boardSize]++;
				}
			}
		}
		//Cas gauche
		else if (i != 0 && i != (boardSizeCell)-boardSize && i%boardSize == 0) {
			if (bombPattern[i] == 10) {
				if (bombPattern[i+1] != 10) {
					bombPattern[i+1]++;
				}
				if (bombPattern[i-boardSize] != 10) {
					bombPattern[i-boardSize]++;
				}
				if (bombPattern[i-boardSize+1] != 10) {
					bombPattern[i-boardSize+1]++;
				}
				if (bombPattern[i+parseFloat(boardSize)+1] != 10) {
					bombPattern[i+parseFloat(boardSize)+1]++;
				}
				if (bombPattern[i+parseFloat(boardSize)] != 10) {
					bombPattern[i+parseFloat(boardSize)]++;
				}
			}
		}
		//Cas droite
		else if (i != boardSize-1 && i != (boardSizeCell)-1 && i%boardSize == boardSize-1) {
			if (bombPattern[i] == 10) {
				if (bombPattern[i-1] != 10) {
					bombPattern[i-1]++;
				}
				if (bombPattern[i+parseFloat(boardSize)] != 10) {
					bombPattern[i+parseFloat(boardSize)]++;
				}
				if (bombPattern[i+parseFloat(boardSize)-1] != 10) {
					bombPattern[i+parseFloat(boardSize)-1]++;
				}
				if (bombPattern[i-boardSize-1] != 10) {
					bombPattern[i-boardSize-1]++;
				}
				if (bombPattern[i-boardSize] != 10) {
					bombPattern[i-boardSize]++;
				}
			}
		}
		//Cas général
		else {
			if (bombPattern[i] == 10) {
				if (bombPattern[i-1] != 10) {
					bombPattern[i-1]++;
				}
				if (bombPattern[i+1] != 10) {
					bombPattern[i+1]++;
				}
				if (bombPattern[i+parseFloat(boardSize)] != 10) {
					bombPattern[i+parseFloat(boardSize)]++;
				}
				if (bombPattern[i+parseFloat(boardSize)-1] != 10) {
					bombPattern[i+parseFloat(boardSize)-1]++;
				}
				if (bombPattern[i+parseFloat(boardSize)+1] != 10) {
					bombPattern[i+parseFloat(boardSize)+1]++;
				}
				if (bombPattern[i-boardSize-1] != 10) {
					bombPattern[i-boardSize-1]++;
				}
				if (bombPattern[i-boardSize] != 10) {
					bombPattern[i-boardSize]++;
				}
				if (bombPattern[i-boardSize+1] != 10) {
					bombPattern[i-boardSize+1]++;
				}
			}
		}
	}

	console.log(bombPattern);

	//On rend les cases clickables et on gére les défaites et les victoires
	for (var i = 0; i < boardSizeCell; i++) {
		cellNumber[i] = document.getElementById(i);
		cellNumber[i].addEventListener('click', function(){
			var cellId = this.id;
			revealCell = function (n) {
				if (cellOpen[n] == false) {
					if (bombPattern[n] < 10 && bombPattern[n] != 0) {
						cellNumber[n].style.backgroundColor = 'white';
						cellNumber[n].textContent = bombPattern[n];
						cellOpen[n] = true;
						totalFalse--;
					}
					else if (bombPattern[n] == 10) {
						cellNumber[n].style.backgroundColor = 'white';
						cellNumber[n].textContent = bombPattern[n];
						cellNumber[n].style.color = 'red';
						cellOpen[n] = true;
						if (security == true) {
							security = false;
							for (var i = 0; i < boardSizeCell; i++) {
								revealCell(i);
							}
							alert('You lose !!!');
						}
					} else if (bombPattern[n] == 0) {
						cellNumber[n].style.backgroundColor = 'white'; //On révèle la première case
						cellOpen[n] = true;
						totalFalse--;
						//On révèle les cases sur les cotés selon plusieurs cas
						if (n%boardSize == 0) { //Cas gauche
							revealCell(n+1);
							revealCell(n+parseFloat(boardSize));
							revealCell(n+parseFloat(boardSize)+1);
							revealCell(n-boardSize);
							revealCell(n-boardSize+1);
						} else if (n%boardSize == boardSize-1) { //Cas droite
							revealCell(n-1);
							revealCell(n+parseFloat(boardSize)-1);
							revealCell(n+parseFloat(boardSize));
							revealCell(n-boardSize-1);
							revealCell(n-boardSize);
						} else {	//Cas général
							revealCell(n+1);
							revealCell(n-1);
							revealCell(n+parseFloat(boardSize)-1);
							revealCell(n+parseFloat(boardSize));
							revealCell(n+parseFloat(boardSize)+1);
							revealCell(n-boardSize-1);
							revealCell(n-boardSize);
							revealCell(n-boardSize+1);
						}					
					}
				}
				if (totalFalse == bombTotal && security == true) {
					security = false;
					for (var i = 0; i < boardSizeCell; i++) {
						revealCell(i);
					}
					alert('You win !!!');
				}
			}
			revealCell(parseFloat(cellId));
		}, false);
	}
}

createBoard();
play ();

/*Relancer le jeu*/

var reload = document.getElementById('reload');

reload.addEventListener('click', function () {
	for (var i = 0; i < boardSizeCell; i++) {
		cellNumber[i].textContent = '';
		cellNumber[i].style.backgroundColor = 'LightSteelBlue';
		cellNumber[i].style.color = 'black';
	}
	play  ();
}, false)

/*Choisir la difficulté*/

var refresh = document.getElementById('refresh'),
	setDifficulty = document.getElementById('setDifficulty'),
	boardSizeFix = document.getElementById('boardSize'),
	bombTotalFix = document.getElementById('bombTotal'),
	panelDifficulty = document.getElementById('panelDifficulty'),
	isPanelOpen = false,
	isItOkToCreateBoard = true;

refresh.addEventListener('click', function () {
	if (isNaN(parseFloat(boardSizeFix.value)) == false && isNaN(parseFloat(bombTotalFix.value)) == false ) {
		bombTotal = bombTotalFix.value;
		boardSize = boardSizeFix.value;
		boardSizeCell = boardSize*boardSize;
		if (parseFloat(boardSize) > 100) {
			alert('Le nombre de case est trop élevé');
			isItOkToCreateBoard = false;
		} else if (parseFloat(bombTotal) >= parseFloat(boardSizeCell)) {
			alert('Le nombre de bombe est trop élevé');
			isItOkToCreateBoard = false;
		} else {
			isItOkToCreateBoard = true;
			while (tableHtml.firstChild) {
				tableHtml.removeChild(tableHtml.firstChild);
			}	
		}
		if(isItOkToCreateBoard) {
			createBoard();
			play();	
		}
	} else {
		alert('Vous n\'avez pas rempli tout les paramètres');
	}
}, false)

setDifficulty.addEventListener('click', function () {
	if (isPanelOpen == true) {
		panelDifficulty.style.display = 'none';
		isPanelOpen = false;
	} else if (isPanelOpen == false) {
		panelDifficulty.style.display = 'block';
		isPanelOpen = true;
	}
}, false)