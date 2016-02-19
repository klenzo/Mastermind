$(function(){
	var line = 1, hole = 1, bgColorHole = $('.hole').css('background-color');

	var bgIndices = $('.indices').css('background-color');

	var indice = 0;

	var comb = randComb();
	//console.log( comb );

	var mycomb = [];
	mycomb[0] = 0;
	mycomb[1] = 0;
	mycomb[2] = 0;
	mycomb[3] = 0;


	$('#close').click(function(){
		$('.dialog').fadeOut();
	});


	$('.colorButton').click(function(){

		var color = $(this).css('background-color'); // Couleur du bouton cliqué
		$('.lignes[line='+ line +'] .hole[holeCode='+ hole +']').css('background-color', color); // Changement de couleur des holes
		// mycomb = mycomb + '' + $(this).attr('colorCode');

		mycomb[hole-1] = parseInt($(this).attr('colorCode'));

		if( $.inArray( mycomb[hole-1], comb ) != -1 && indice != 2 ){

			if( mycomb[hole-1] === comb[hole-1] ){
				indice = 2;
			}else{
				indice = 1;
			}

			//console.log(mycomb[hole-1]);
			//console.log('Indice : ' + indice);
		}


		if( hole === 4 ){
			if( mycomb[0] === comb[0] && mycomb[1] === comb[1] && mycomb[2] === comb[2] && mycomb[3] === comb[3] ){
				restartGame();

				//alert('Gagner !');
				score = parseInt($('#score').text()) + 1;
				$('#score').text( score );

				boxDialog('Gagner !', 'Bravo tu as gagner !', 'win');

				$('#score').animate({
					'width': '100px'
				}, 1000);
				$('#score').animate({
					'width': '50px'
				}, 2000);

			}else{

				if(indice == 1){
					$('.lignes[line='+ line +'] .indices').css('background-color', $('.bubbleRed').css('background-color'));
				}else if (indice >= 2) {
					$('.lignes[line='+ line +'] .indices').css('background-color', $('.bubbleGreen').css('background-color'));
				}else{
					$('.lignes[line='+ line +'] .indices').css('background-color', $('.bubbleWhite').css('background-color'));
				}

				line++;
			// Perdu !
				if( line === 11 ){
					//alert('Perdu');

					//var result = comb[0] + ', ' + comb[1] + ', ' + comb[2] + ', ' + comb[3];

					boxDialog('Perdu !', "Dommage tu as perdu :( <br> C'etait : " + comb, 'lost');

				}
			}

			mycomb = [];
			hole = 1;
			indice = 0;
		}else{
			hole++;
		}

	});


	$('#restart').click(function(){
		restartGame();
	});


// Function
	function randComb(){
		var combAll = shuffle([1,2,3,4,5,7,8]), comb = [];

		comb[0] = combAll[0];
		comb[1] = combAll[1];
		comb[2] = combAll[2];
		comb[3] = combAll[3];
		
		return comb;
	}

	function restartGame(){
		line = 1, hole = 1, indice = 0;
		$('.hole').css('background-color', bgColorHole);
		$('.indices').css('background-color', bgIndices);
		comb = randComb();

		//console.log( comb );
	}


	function shuffle(o) {
		var j, x, i;
		for (i = o.length; i; i -= 1) {
			j = Math.floor(Math.random() * i);
			x = o[i-1];
			o[i-1] = o[j];
			o[j] = x;
		}

		return o;
	}


	function boxDialog(title, message, type){
		$('.dialog').slideDown();

		$('.dialog #title').html(title);
		$('.dialog #message').html(message);
		$('.dialog').addClass(type);
	}

});