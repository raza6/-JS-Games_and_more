/*initialisation*/
var clicar = [], xo = true, tourx = document.createTextNode('Tour du joueur X'), p = document.getElementsByTagName('p'), but = document.getElementsByTagName('button');

//Définir les ID
for (var i = 0; i < 9; i++) {
	clicar[i] = document.getElementById('c' + (i+1));
}

//Initialisation du joueur X, du texte, du plateau, du j
but[0].addEventListener('click', function(){
	p[0].replaceChild(tourx, p[0].firstChild);
	xo = true;
	j = 0;
	txt = 'Tour du joueur O';
		for (var i = 0; i < 9; i++) {
			if (clicar[i].hasChildNodes() == true) {
				clicar[i].removeChild(clicar[i].firstChild);
			}
		}
	}, false);

/*Début du jeu*/
var txt = 'Tour du joueur O', j = 0;

//Placement + alternance du X, du texte, démarrage du test, incrémentation du j
var pouet = function (n) {
	if (clicar[n].hasChildNodes() == false) {
		if (xo == true) {
			var x = document.createTextNode('X');
			clicar[n].appendChild(x);
			xo = false;
			j++;
			testa();
			var tourx = document.createTextNode(txt), p = document.getElementsByTagName('p');
			p[0].replaceChild(tourx, p[0].firstChild);
			txt = 'Tour du joueur X';
		} else {
			var x = document.createTextNode('O');
			clicar[n].appendChild(x);
			xo = true;
			j++;
			testa();
			var tourx = document.createTextNode(txt), p = document.getElementsByTagName('p');
			p[0].replaceChild(tourx, p[0].firstChild);
			txt = 'Tour du joueur O';
		}
	}
};

//Déclenchement des clics
function clicp () {
	clicar[0].addEventListener('click', function(){pouet(0);}, false);
	clicar[1].addEventListener('click', function(){pouet(1);}, false);
	clicar[2].addEventListener('click', function(){pouet(2);}, false);
	clicar[3].addEventListener('click', function(){pouet(3);}, false);
	clicar[4].addEventListener('click', function(){pouet(4);}, false);
	clicar[5].addEventListener('click', function(){pouet(5);}, false);
	clicar[6].addEventListener('click', function(){pouet(6);}, false);
	clicar[7].addEventListener('click', function(){pouet(7);}, false);
	clicar[8].addEventListener('click', function(){pouet(8);}, false);
}
clicp();

/*Vérification*/

//Mise en place des tests et annonce fin partie si nul (alert et texte)
function testa () {
	if (j != 9) {
		test(0,1,2); test(3,4,5); test(6,7,8); test(0,3,6); test(1,4,7); test(2,5,8); test(0,4,8); test(2,4,6); 
	} else {
		txt = 'Fin';
		alert('Personne n\'a gagné =(');
	}
}

//Construction du test, annonce fin partie si 3 symboles (alert et texte)
function test (a, b, c) {
	if (clicar[a].hasChildNodes() == true && clicar[b].hasChildNodes() == true && clicar[c].hasChildNodes() == true) {
		var at = clicar[a].firstChild, bt = clicar[b].firstChild, ct = clicar[c].firstChild;
		if (at.data == bt.data && ct.data == bt.data && at.data == 'X') {
			txt = 'Fin';
			alert('Bravo ! Le joueur X a gagné.');
		} else if (at.data == bt.data && ct.data == bt.data && at.data == 'O') {
			txt = 'Fin';
			alert('Bravo ! Le joueur O a gagné.');
		}
	}
}
