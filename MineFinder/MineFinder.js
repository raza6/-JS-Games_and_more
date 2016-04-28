/* Création du damier */
var tableHtml = document.getElementById('table'),
	trHtml = [],
	tdHtml = [],
	cellNumber = [];

//On crée le damier
for (var i = 0; i < 10; i++) {
	trHtml[i] = document.createElement('tr');
	tableHtml.appendChild(trHtml[i]);
	for(var j = 0; j < 10; j++) {
		tdHtml[j] = document.createElement('td');
		tdHtml[j].id = ((i*10)+j);
		trHtml[i].appendChild(tdHtml[j]);
	}
}

//On rend les cases clickables
for (var i = 0; i < 100; i++) {
	cellNumber[i] = document.getElementById(i);
	cellNumber[i].addEventListener('click', function(){
		console.log(this.id);
		this.style.backgroundColor = 'white';
		this.textContent = bombPattern[this.id];
	}, false);
}

/* Création du bombPattern */
var bombPattern = [],
	randomNumber = 0;
	
bombPattern.fill(0); //Fix it
console.log(bombPattern);

for (var i = 0; i < 10; i++) {
	do {
		randomNumber = Math.floor(Math.random()*(100));
	} while (bombPattern[randomNumber] == 10);
	bombPattern[randomNumber] = 10;
}

console.log(bombPattern);

/* Complétion du bombPattern */

