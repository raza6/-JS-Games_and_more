//Définition des variables :

var clickableCase = [], 
	currentSign = true, 
	security = true,
	pRound = document.getElementById('pRound'), 
	buttonReload = document.getElementById('reloadButton'),
    roundCounter = 0;

for (var i = 0; i < 9; i++) {
	clickableCase [i] = document.getElementById('c' + (i+1));
}

//Re-initialisation des paramètres :

buttonReload.addEventListener('click', function(){
	currentSign = true;
	security = true;
    roundCounter = 0;
	roundExchange();
		for (var i = 0; i < 9; i++) {
			if (clickableCase[i].hasChildNodes() == true) {
				clickableCase[i].removeChild(clickableCase[i].firstChild);
			}
		}
	}, false);

//Clic, clic :

function clickRelease () {
	clickableCase[0].addEventListener('click', function(){mainGame(0);}, false);
	clickableCase[1].addEventListener('click', function(){mainGame(1);}, false);
	clickableCase[2].addEventListener('click', function(){mainGame(2);}, false);
	clickableCase[3].addEventListener('click', function(){mainGame(3);}, false);
	clickableCase[4].addEventListener('click', function(){mainGame(4);}, false);
	clickableCase[5].addEventListener('click', function(){mainGame(5);}, false);
	clickableCase[6].addEventListener('click', function(){mainGame(6);}, false);
	clickableCase[7].addEventListener('click', function(){mainGame(7);}, false);
	clickableCase[8].addEventListener('click', function(){mainGame(8);}, false);
}
clickRelease();

//Gestion des messages :

function roundExchange (d) {
	if (d == 0) {
		pRound.textContent = 'Tour du joueur O';
	} else if (d == 1) {
		pRound.textContent = 'Tour du joueur X';
	} else if (d == 2) {
		pRound.textContent = 'Fin !';
	}
}


//Interaction avec le joueur et lancement des tests :

var mainGame = function (n) {
	if (clickableCase[n].hasChildNodes() == false) {
		if (currentSign == true) {
			var txtSign = document.createTextNode('X');
			clickableCase[n].appendChild(txtSign);
			currentSign = false;
			roundCounter++;
			roundExchange(0);
			mainTest();
		} else {
			var txtSign = document.createTextNode('O');
			clickableCase[n].appendChild(txtSign);
			currentSign = true;
			roundCounter++;
			roundExchange(1);
			mainTest();
		}
	}
};

//Tests et fin de partie :

function mainTest () {
	test(0,1,2); test(3,4,5); test(6,7,8); test(0,3,6); test(1,4,7); test(2,5,8); test(0,4,8); test(2,4,6); 
	if (roundCounter == 9 && security == true) {
		roundExchange(2);
		alert('Personne n\'a gagné =(');
	}
}

function test (a, b, c) {
	if (clickableCase[a].hasChildNodes() == true && clickableCase[b].hasChildNodes() == true && clickableCase[c].hasChildNodes() == true) {
		var at = clickableCase[a].firstChild, 
            bt = clickableCase[b].firstChild, 
            ct = clickableCase[c].firstChild;
		if (at.data == bt.data && ct.data == bt.data && at.data == 'X') {
			security = false;
			roundExchange(2);
			alert('Bravo ! Le joueur X a gagné.');
		} else if (at.data == bt.data && ct.data == bt.data && at.data == 'O') {
			security = false;
			roundExchange(2);
			alert('Bravo ! Le joueur O a gagné.');
		}
	}
}