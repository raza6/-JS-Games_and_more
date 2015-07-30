var alea;

alea = Math.floor(Math.random()*(1000)+1);

/* console.log('Le chiffre magic est ' + alea); */ 

for (var i = 0, user; i < 10; i++) {

user = prompt('Saisir un chiffre entre 1 et 1000');

	if (alea == user) {
		alert('Gagné !');
		break;
	} else if (user < 1000 && user > 0 && alea > user) {
		alert('Perdu ! ' + 'Chiffre magic > ' + user);
	} else if (user < 1000 && user > 0 && alea < user) {
		alert('Perdu ! ' + 'Chiffre magic < ' + user);
	} else {
		alert('What ?!')
	}
}

if (alea != user) {
	alert ('Perdu, vous n\'avez plus de tentative supplémentaire ! Le chiffre magik était ' + alea + '.')
}
