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
	roundExchange(1);
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
	if (d == 1 && security == true) {
		pRound.textContent = 'Tour du joueur X';
	} else if (d == 2) {
		pRound.textContent = 'Fin !';
	} else if (d == 3) {
		pRound.textContent = 'Tour de l\'ordinateur ';
	} else if (d == 4) {
		pRound.textContent = 'Tour de l\'ordinateur .';
	} else if (d == 5) {
		pRound.textContent = 'Tour de l\'ordinateur ..';
	} else if (d == 6) {
		pRound.textContent = 'Tour de l\'ordinateur ...';
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
			mainTest();
			if (security == true) {
				roundExchange(3);
				setTimeout(roundExchange, 200, 4);
				setTimeout(roundExchange, 400, 5);
				setTimeout(roundExchange, 600, 6);
				setTimeout(iaRound, 800);
			}	
		}
	}
};

//Tour de l'IA :

function iaRound () {
	var clickableCaseForIA = [], alea;
	if (security == true) {
		for (var i = 0; i < 9; i++) {
			if (clickableCase[i].hasChildNodes() == false) {
				clickableCaseForIA.push(clickableCase[i]);
			}
		}
		alea = Math.floor(Math.random()*(clickableCaseForIA.length)+1);
		var txtSign = document.createTextNode('O');
		clickableCaseForIA[alea-1].appendChild(txtSign);
		currentSign = true;
		roundCounter++;
		mainTest();
		roundExchange(1);
	}
}

//Tests et fin de partie :

function mainTest () {
	test(0,1,2); test(3,4,5); test(6,7,8); test(0,3,6); test(1,4,7); test(2,5,8); test(0,4,8); test(2,4,6); 
	if (roundCounter == 9 && security == true) {
		security = false;
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
			alert('Bravo ! Vous avez gagné.');
		} else if (at.data == bt.data && ct.data == bt.data && at.data == 'O') {
			security = false;
			roundExchange(2);
			alert('L\'ordinateur a gagné !');
		}
	}
}