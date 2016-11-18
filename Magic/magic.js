var alea;

alea = Math.floor(Math.random()*(1000)+1);

console.log('Le chiffre magic est ' + alea);

for (var i = 0, user; i < 10; i++) {

user = prompt('Saisir un chiffre entre 1 et 1000');

	if (alea == user) {
		alert('Gagné !');
		break;
	} else if (user < 1000 && user > 0 && alea > user) {
		if (alea-user <= 10) {
			alert('Presque ! ' + 'Le chiffre magic est légérement supérieur à ' + user);
		} else {
			alert('Perdu ! ' + 'Le chiffre magic est supérieur à ' + user);
		}
	} else if (user < 1000 && user > 0 && alea < user) {
		if (user-alea <= 10) {
			alert('Presque ! ' + 'Le chiffre magic est légérement inférieur à ' + user);
		} else {
			alert('Perdu ! ' + 'Le chiffre magic est inférieur à ' + user);
		}
	} else {
		alert('What ?!')
	}
}

if (alea != user) {
	alert ('Perdu, vous n\'avez plus de tentative supplémentaire ! Le chiffre magic était ' + alea + '.')
}