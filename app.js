/**
A função exibirTextoTela exibe o conteúdo de texto especificado dentro da tag HTML especificada na tela.
@param tagHTML - O parâmetro tagHTML é uma string que representa o seletor da tag HTML onde você
deseja exibir o texto. Pode ser uma tag como <p>, <h1>, <div>, etc.
@param textHTML - O parâmetro textHTML é o conteúdo de texto que você deseja exibir na
tela dentro do elemento HTML especificado pelo parâmetro tagHTML.
*/
function exibirTextoTela(tagHTML, textHTML) {
	let varCampo = document.querySelector(tagHTML);
	varCampo.innerHTML = textHTML;
	// responsiveVoice.speak(textHTML, "Brazilian Portuguese Female", {rate: 1.3});
}

/**
A função limparImputs limpa os campos de entrada em uma página da web, definindo seus valores como um
texto especificado.
@param tagHTML - O parâmetro tagHTML na função limparImputs é usado para especificar o tipo
de elementos de entrada HTML que você deseja direcionar para limpar seus valores. Isso poderia ser algo
como 'input', 'textarea' ou 'select'.
@param textHTML - O parâmetro textHTML na função limparImputs é o texto que você deseja
definir como o valor dos elementos de entrada selecionados pelo parâmetro tagHTML.
*/
function limparImputs(tagHTML, textHTML) {
	let inputReload = document.querySelectorAll(tagHTML);
	inputReload.forEach(function (e) {
		e.value = textHTML;
	});
}

/**
 * A função "sortear" gera uma quantidade especificada de números aleatórios dentro de um intervalo dado e
 * os exibe na tela em ordem crescente.
 */
function sortear() {
	let qtdNumeros = parseInt(document.getElementById('quantidade').value);
	let numMinimo = parseInt(document.getElementById('de').value);
	let numMaximo = parseInt(document.getElementById('ate').value);
	if (!isNaN(qtdNumeros) && !isNaN(numMinimo) && !isNaN(numMaximo)) {
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
		exibirTextoTela('#resultado .texto__paragrafo', `Números Sorteados: <br>${listaNumSorteado.sort((a, b) => a - b).join(' - ')}`);
		console.log(listaNumSorteado);

		document.getElementById('btn-sortear').setAttribute('disabled', true);
		document.querySelector('#btn-reiniciar').disabled = false;
	} else {
		alert('Prencehr todos os campos antes de Sortear');
	}
}

/**
 * A função "reiniciar" redefine certos elementos na página da web e exibe uma mensagem indicando
 * que nenhum número foi sorteado ainda.
 */
function reiniciar() {
	document.getElementById('btn-sortear').removeAttribute('disabled');
	document.getElementById('btn-reiniciar').setAttribute('disabled', true);
	limparImputs('.container__input', '');
	// let inputReload = document.querySelectorAll('.container__input');
	// inputReload.forEach(function (input) {
	// input.value = '';
	// });
	exibirTextoTela('#resultado .texto__paragrafo', 'Números sorteados:  nenhum até agora');
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

// Segurança para não travar o navegador, limitar a 80% do valor de aposta
/**
 * A função calcula 80% da diferença entre os valores máximo e mínimo inseridos.
 * @returns A função `calcNumLimite` retorna o resultado do cálculo `(numMaximo.value -
 * numMinimo.value + 1) * 0.8` após aplicar a função `Math.floor` a ele.
 */
function calcNumLimite() {
	return Math.floor((numMaximo.value - numMinimo.value + 1) * 0.8);
}

/**
 * A função `calcLimitarNumQtd` calcula e limita a quantidade de um número com base em determinadas
 * condições.
 */
function calcLimitarNumQtd() {
	limiteNumQtd = calcNumLimite();
	if (numQtd.value > limiteNumQtd && numMaximo.value > 10) {
		numQtd.value = limiteNumQtd;
	} else if (numQtd.value > 10 && numMaximo.value < 11) {
		numQtd.value = 9;
	}
}

let numQtd = document.querySelector('#quantidade');
let numMaximo = document.querySelector('#ate');
let numMinimo = document.querySelector('#de');
let limiteNumQtd = calcNumLimite();

numQtd.addEventListener('input', calcLimitarNumQtd);
numMaximo.addEventListener('input', calcLimitarNumQtd);
numMinimo.addEventListener('input', calcLimitarNumQtd);
