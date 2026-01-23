'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach((movement, index) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const innerHTML = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
          <div class="movements__value">${movement}</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', innerHTML);
  });
};

displayMovements(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;
const movementsUSD = movements.map(mov => mov * eurToUsd);

const movementDescritions = movements.map((movement, index) => {
  return movement > 0
    ? `Movement ${index + 1}: You deposited ${Math.abs(movement)}`
    : `Movement ${index + 1}: You withdrew ${Math.abs(movement)}`;
});

// add new prop to each acc 'userName'
function generateInitals(accountsArr) {
  accountsArr.forEach(acc => {
    acc.userName = acc.owner
      .split(' ')
      .map(el => el.slice(0, 1))
      .join('')
      .toLowerCase();
  });
}

generateInitals(accounts);

// filter arr by negative\positive values
function filterNumbers(arrayNumbers, valueType = '+') {
  return arrayNumbers.filter(number =>
    valueType === '+' ? number > 0 : number < 0,
  );
}

// compute balance function
function computePrintBalance(arr) {
  const balance = arr.reduce((acc, number) => {
    acc += number;
    return acc;
  }, 0);
  labelBalance.textContent = `${balance} EUR`;
}

function maxMovVal(numbersArray) {
  return numbersArray.reduce((acc, elem) => {
    return acc < elem ? (acc = elem) : acc;
  }, numbersArray[0]);
}

function calcDisplaySummary(userData) {
  const incomes = userData.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => (acc += mov), 0);
  labelSumIn.textContent = incomes;

  const out = userData.movements
    .filter(mov => mov < 0)
    .reduce((acc, elem) => (acc += elem), 0);
  labelSumOut.textContent = Math.abs(out);

  const interest = userData.movements
    .filter(move => move > 0)
    .map(deposit => (deposit * userData.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}`;
}

const firstWithDrawal = movements.find(mov => mov < 0);

function findAccount(accounts, name) {
  const accountData = accounts.find(account => `account.${name}`);
  return accountData;
}

function updateUI(acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  computePrintBalance(acc.movements);

  // Display summary
  calcDisplaySummary(acc);
}

let currentAccount;
containerApp.style.opacity = 0;

let sortedState = false;
btnSort.addEventListener('click', ev => {
  ev.preventDefault();
  displayMovements(currentAccount.movements, sortedState);
  sortedState = !sortedState;
});

// implement log in / welcome message / display main numbers
btnLogin.addEventListener('click', ev => {
  ev.preventDefault();
  currentAccount = accounts.find(
    account => account.userName === inputLoginUsername.value,
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 100;
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    // console.log('sucsess');
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    computePrintBalance(currentAccount.movements);
    displayMovements(currentAccount.movements);
    calcDisplaySummary(currentAccount);
  }
});

// implement transfer logic

btnTransfer.addEventListener('click', ev => {
  ev.preventDefault();
  currentAccount ? currentAccount : alert('you should log in firstly');
  const recieverAccount = accounts.find(
    account => account.userName === inputTransferTo.value,
  );
  const amount = Number(inputTransferAmount.value);
  const currentUserBalance = currentAccount.movements.reduce(
    (acc, mov) => (acc += mov),
    0,
  );
  amount > currentUserBalance
    ? alert('Your current balance is low enought')
    : null;
  console.log(currentUserBalance);
  recieverAccount?.movements &&
  amount > 0 &&
  amount < currentUserBalance &&
  currentAccount !== recieverAccount
    ? (recieverAccount.movements.push(amount),
      currentAccount.movements.push(amount * -1),
      updateUI(currentAccount))
    : null;
});

btnLoan.addEventListener('click', ev => {
  ev.preventDefault();
  const amount = +inputLoanAmount.value;

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    console.log('aproved');
    setTimeout(() => {
      currentAccount.movements.push(amount);
      updateUI(currentAccount);
    }, 3000);
  }
  inputLoanAmount.value = '';
});

// implement close account logic
btnClose.addEventListener('click', ev => {
  ev.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName,
    );
    accounts.splice(index, 1);
    inputCloseUsername.value = inputClosePin.value = '';
    containerApp.style.opacity = 0;
  }
});
// inputCloseUsername;
// inputClosePin;

/////////////////////////////////////////////////
