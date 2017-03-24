'use strict';

/*************************************
	Variables init
**************************************/

var clock = {
		'time': {
			minutes:0,
			seconds:0,
			miliseconds:0
		},
		'lapCounter': 0,
		'lap': {
			minutes:0,
			seconds:0,
			miliseconds:0
		}
	},
	laps = new Array(),
	state;

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

function addLine(){
	var list = document.querySelector('#lap-list ul'),
		newList = document.createElement('li');

		newList.innerHTML = "<p class='slide-in'></p>";
		newList.querySelector('p').innerHTML = '<span class="lap-number">#3</span><span class="first-lap">0 01.99</span><span class="second-lap">0 08.36</span>';

		list.prepend(newList);
}

function startLap(){

	//alert('starting lap');
	//this mean we started the lap!
	//if(lapCounter != 0){

	//}

		addLine();

	var lap = new Object(),
		start = new Object(),
		end = new Object(),
		chronoState;

		//clock.lap.minutes = 0;
		//clock.lap.seconds = 0;
		//clock.lap.miliseconds = 0;

		window.clearInterval(chronoState);
		chronoState = window.setInterval(doLapChrono, 10); //išsiaškinti, kodėl kas 10

		end.minutes = clock.time.minutes;
		end.seconds = clock.time.seconds;
		end.miliseconds = clock.time.miliseconds;

	lap.start = clock.lap;
	lap.end = end;

	laps.push(lap);

	console.log(laps);

	console.log('start:' + lap.start.minutes + ' ' + lap.start.seconds + ' ' + lap.start.miliseconds);
	console.log('end:' + lap.end.minutes + ' ' + lap.end.seconds + ' ' + lap.end.miliseconds);

	clock.lapCounter++;
}

function doLapChrono(){

	var time = clock.lap,
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

	clock.lap.minutes = time.minutes;
	clock.lap.seconds = time.seconds;
	clock.lap.miliseconds = time.miliseconds;
}

function shareLapSwitch(){

	var button = document.querySelector('.js-lap-share');

	if(button.id == 'lap'){
		button.id = 'share';
		button.innerHTML = 'Share';
		button.removeEventListener('click', startLap);
	}
	else{
		button.id = 'lap';
		button.innerHTML = 'Lap';
		button.addEventListener('click', startLap);

	}

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

	shareLapSwitch();

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

	clock.time.miliseconds = time.miliseconds;
	clock.time.seconds = time.seconds;
	clock.time.minutes = time.minutes;

	/* styling the miliseconds */
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