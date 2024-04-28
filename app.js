function sortear() {
	let qtdNumeros = parseInt(document.getElementById('quantidade').value);
	let numMinimo = parseInt(document.getElementById('de').value);
	let numMaximo = parseInt(document.getElementById('ate').value);
	let listaNumSorteado = [];

	console.log(`quantidae ${qtdNumeros} - de ${numMinimo} ate ${numMaximo}`);

	for (let i = 0; i < qtdNumeros; i++) {
		numSorteado = gerarNumAleatorio(numMaximo, numMinimo);

		if (listaNumSorteado.includes(numSorteado)) {
			i--;
		} else {
			listaNumSorteado.push(numSorteado);
		}
	}

	function gerarNumAleatorio(min, max) {
		return Math.floor(Math.random() * (max - min) + min + 1);
	}

	document.querySelector('#resultado .texto__paragrafo').innerHTML = `Seus numeros sorteados foram: ${listaNumSorteado.sort((a, b) => a - b).join(' - ')}`;
	console.log(listaNumSorteado);
}

// ----------------------------

// Bloqueia teclado para todos os inputs
document.addEventListener('DOMContentLoaded', function () {
	let inputs = document.querySelectorAll('.container__input');

	inputs.forEach(function (input) {
		input.addEventListener('keydown', function (event) {
			if (
				// Permite números de 0 a 9
				(event.key >= '0' && event.key <= '9') ||
				// Permite Backspace e Delete
				event.key === 'Backspace' ||
				event.key === 'Delete' ||
				event.key === 'Tab' ||
				event.key === 'ArrowUp' ||
				event.key === 'ArrowLeft' ||
				event.key === 'ArrowRight' ||
				event.key === 'ArrowDown'
			) {
				// Permite a ação padrão
			} else {
				// Bloqueia a ação padrão para as demais teclas
				event.preventDefault();
			}
		});
	});
});

// limitador para 100 númerossorteados
document.addEventListener('DOMContentLoaded', function () {
	// let input2 = document.querySelector('#quantidade');
	let input3 = document.querySelector('#quantidade');
	let numMaximo = document.querySelector('#ate');

	// input2.addEventListener('keyup', function (event) {
	// 	// Se o valor digitado for maior que 1 caractere, substitui por "10"
	// 	if (input2.value.length > 2 && input2.value.length < numMaximo.value.length) {
	// 		input2.value = '100';
	// 	} else {
	// 		input2.value = Math.pow(10, numMaximo.value.length - 2);
	// 	}
	// });
// adiona limite na quantidade de segurança para não travar o código
	input3.addEventListener('keyup', function (event) {
		if
			(input3.value < 101) {
			input3.value = Math.floor(numMaximo.value * 0.8);
		}else{
			// (input3.value.length > numMaximo.value.length) {
			input3.value = Math.pow(10, numMaximo.value.length - 1);
			document.querySelector('#quantidade').setAttribute('max', input3.value);
		}
	});
});
