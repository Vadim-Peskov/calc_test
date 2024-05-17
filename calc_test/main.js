let calcBody   = document.querySelector('.calc__btns-wrap');
let displayNum = document.querySelector('.calc__num');
let result     = document.querySelector('.calc__btn--col4');
let operationSymbol = document.querySelector('.calc__operator');
let firstNum  = '';
let secondNum = '';
let operation = '';
let error = false;

let numsArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let operationArr = ['/', '*', '+', '-'];
let eKeysArr = ['Escape', 'Enter', 'Backspace', 'C', 'c'];

calcBody.addEventListener('click', (e) => calc(e));
document.addEventListener('keydown', (e) => calc(e));

function calc(e) {
	// Проверка событий клика
	if (e.type === 'click') {
		if (e.target !== e.currentTarget) {
			inputValue = e.target.textContent;
		}
		else return;
	}

	// Проверка событий ввода
	else if (e.type === 'keydown') {
		if (numsArr.includes(e.key)      ||
			operationArr.includes(e.key) ||
			eKeysArr.includes(e.key)     ||
			e.key === '.'                ||
			e.key === '=') inputValue = e.key;
		else return;
	}

	// Цифры
	if (numsArr.includes(inputValue)) inputNumbers();

	// Математические операторы
	if (operationArr.includes(inputValue)) {
		if (error === false) inputOperators();
	}

	// Нажатие на .
	if (inputValue === '.') pressOnDot();

	// Удаление последнего символа
	if (inputValue === '◄' ||
		inputValue === 'Backspace') deleteLastSymbol();

	// Очистка
	if (inputValue === 'C' ||
		inputValue === 'c' ||
		inputValue === 'Escape') clear();

	// Вывод результата
	if (inputValue === '=' ||
		inputValue === 'Enter') getResult();
}

// Функции -------------------------------------------------------------------

function inputNumbers() {
	if (error === true) error = false;

	if (operation === '') {
		checkNumbersLength(firstNum);
	}
	else {
		checkNumbersLength(secondNum);
	}

	function checkNumbersLength(num) {
		if (num.includes('.')) {
			let decimal = num.split('.');
			if (decimal[1].length < 9) inputNumber();
		}
		else {
			if (num.length < 9) inputNumber();
		}
	}

	function inputNumber() {
		if (firstNum !== '' && operation === '' && firstNum !== '0') {
			firstNum += inputValue;
			displayNum.innerText = firstNum;
		}
		if (firstNum === '') {
			firstNum += inputValue;
			displayNum.innerText = firstNum;
		}
		if (firstNum !== '' && operation !== '' && secondNum !== '0') {
			secondNum += inputValue;
			displayNum.innerText = secondNum;
		}
		if (firstNum === '0' && operation === '' && secondNum === '') {
			firstNum = inputValue;
			displayNum.innerText = firstNum;
		}
		if (firstNum !== '' && operation !== '' && secondNum === '0') {
			secondNum = inputValue;
			displayNum.innerText = secondNum;
		}
	}
}

function inputOperators() {
	if (error === false) {
		if (firstNum === '' && secondNum === '' && operation === '') {
			firstNum = '0';
			operation += inputValue;
			operationSymbol.innerText = inputValue;
		} 
		if (firstNum !== '' && secondNum === '' && operation === '') {
			operation += inputValue;
			operationSymbol.innerText = inputValue;
		} 
		if (firstNum !== '' && secondNum !== '' && operation !== '') {
			getResult();
			if (error === false) {
				operation = inputValue;
				operationSymbol.innerText = inputValue;
			}
		} 
	}
}

function pressOnDot() {
	if (error === true) error = false;

	if (!firstNum.includes('.') && firstNum !== '' && operation === '') {
		firstNum += inputValue;
		displayNum.innerText = firstNum;
	}
	if (firstNum !== '' && operation !== '' && secondNum !== '' && !secondNum.includes('.')) {
		secondNum += inputValue;
		displayNum.innerText = secondNum;
	}
	if (firstNum === '' && operation === '' && secondNum === '') {
		firstNum = '0.';
		displayNum.innerText = firstNum;
	}
	if (firstNum !== '' && operation !== '' && secondNum === '') {
		secondNum = '0.';
		displayNum.innerText = secondNum;
	}
}

function clear() {
	displayNum.innerText = '0'
	operationSymbol.innerText = '';
	firstNum = '';
	secondNum = '';
	operation = '';
	error = false;
}

function getResult() {
	if (firstNum !== '' && secondNum !== '' && operation !== '') {
		if (operation === '-') mathOperations('-');
		else if (operation === '+') mathOperations('+');
		else if (operation === '*') mathOperations('*');
		else if (operation === '/') {
			if (+secondNum === 0) {
				displayNum.innerText = 'Ошибка';
				error = true;
				firstNum = '';
				secondNum = '';
				operation = '';
				operationSymbol.innerText = '';
			}
			else mathOperations('/');
		}
	}

	function mathOperations(operator) {
		if (operator === '-') {
			displayNum.innerText = +(+firstNum - +secondNum).toFixed(9);
		}
		if (operator === '+') {
			displayNum.innerText = +(+firstNum + +secondNum).toFixed(9);
		}
		if (operator === '*') {
			displayNum.innerText = +(+firstNum * +secondNum).toFixed(9);
		}
		if (operator === '/') {
			displayNum.innerText = +(+firstNum / +secondNum).toFixed(9);
		}
		operationSymbol.innerText = '';
		firstNum = displayNum.innerText;
		secondNum = '';
		operation = '';
	}
}

function deleteLastSymbol() {
	if (error === true || displayNum.innerText.includes('e')) clear();

	if (secondNum !== '') {
		if (secondNum.length > 0) {
			let newNum = secondNum.split('');
			newNum.pop();
			secondNum = newNum.join('');
			displayNum.innerText = secondNum;
			if (secondNum.length === 0) displayNum.innerText = firstNum;
		}
	}
	else if (operation !== '') {
		operation = ''
		displayNum.innerText = firstNum;
		operationSymbol.innerText = '';
	}
	else if (firstNum !== '') {
		if (firstNum.length > 0) {
			let newNum = firstNum.split('');
			newNum.pop();
			firstNum = newNum.join('');
			displayNum.innerText = firstNum;
			if (firstNum.length === 0) displayNum.innerText = '0';
		}
	}
}