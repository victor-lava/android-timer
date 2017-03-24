'use strict';

/*************************************
	Variables init
**************************************/
var state;
var clock = {
	'time': {
		minutes:0,
		seconds:0,
		miliseconds:0
	}
}

//loaderiui imesti https://projects.lukehaas.me/css-loaders/
//http://codepen.io/giana/pen/yYBpVY/

/*************************************
		Main method
**************************************/

//nuresetinam chronometrą
function reset(){

	clock.time.minutes = 0;
	clock.time.seconds = 0;
	clock.time.miliseconds = 0;
	
	document.querySelector('#timer .miliseconds').innerHTML = time.miliseconds;
	document.querySelector('#timer .seconds').innerHTML = time.seconds;

}

function start(){

	if(this.id == 'start'){
		//jei chronometras nepaleistas, jį turime paleisti
		state = window.setInterval(doChrono, 10); //išsiaškinti, kodėl kas 10
		this.id = 'pause';
	}
	else{
		window.clearInterval(state);
		this.id = 'start';
		//jei chronometras paleistas, jį turime sustabdyti
	}

	this.querySelector('i').classList.toggle('fa-play');
	this.querySelector('i').classList.toggle('fa-pause');

}

function doChrono(){

	//pagrindinė mūsų funkcija, kuri atsakinga už rodyklių 
	//sukimą ir skaičiavimus
	var time = clock.time,
		miliseconds = null;

	time.miliseconds++;

	//jei milisekundės yra daugiau už 999, pridedame vieną sekundę
	if(time.miliseconds > 99){
		time.miliseconds = 0;
		time.seconds++;
	}

	if(time.seconds > 59){
		time.seconds = 0;
		time.minutes++;
	}

	if(time.miliseconds < 9){
		miliseconds = '0' + time.miliseconds;
	}
	else{
		miliseconds = time.miliseconds;
	}

	document.querySelector('#timer .miliseconds').innerHTML = miliseconds;
	document.querySelector('#timer .seconds').innerHTML = time.seconds;
	
	//console.log(time.seconds);
	//console.log(generateDegrees(time.miliseconds, 100));
}

function generateDegrees(time, maxTime){

	var degrees = time*360/maxTime;
	return degrees;

}


/*************************************
			Boot
**************************************/

document.addEventListener('DOMContentLoaded', function(){



	document.querySelector('#reset').addEventListener('click', reset);
	document.querySelector('#start').addEventListener('click', start);

});