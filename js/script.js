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

	var timer = document.querySelector('#timer'),
		pause = document.querySelector('#pause');


	clock.time.minutes = 0;
	clock.time.seconds = 0;
	clock.time.miliseconds = 0;
	
	pause.id = 'start';
	window.clearInterval(state);
	pause.querySelector('i').classList.toggle('fa-play');
	pause.querySelector('i').classList.toggle('fa-pause');

	timer.querySelector('.seconds').innerHTML = '0';
	timer.querySelector('.miliseconds').innerHTML = '00';
	showHide(false); 



}

function showHide(status){
	var hiddenItems = document.querySelectorAll('nav ul li .js-show-hide'),
		index;


	for(index = 0; index < hiddenItems.length; index++){
		if(status == true){
			//alert('true');
			hiddenItems[index].classList.remove('visibility-hidden');
		}
		else if(status == false){
			//alert('false');
			hiddenItems[index].classList.add('visibility-hidden');
		} 
	}
}

function start(){

	var timer = document.querySelector('#timer p');
	if(this.id == 'start'){
		//jei chronometras nepaleistas, jį turime paleisti
		state = window.setInterval(doChrono, 10); //išsiaškinti, kodėl kas 10
		this.id = 'pause';
		timer.classList.remove('blinker');
		showHide(true);


	}
	else{
		window.clearInterval(state);
		this.id = 'start';
		timer.classList.add('blinker');
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