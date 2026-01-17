// // we have an next example(based on closure):

// const greet = function (greetingMessage) {
//   return function (name) {
//     console.log(`${greetingMessage} ${name}`);
//   };
// };

// const greetHallo = greet('Hello');

// greetHallo('Anton');
// greet('Pryvit')('Kysia');
// ////////////////////////////////////////////////////////////////////////////////////////////

// // via arrow function
// const pereVirkaDokymentiv = (vitannia) => (vmistPytannya) =>
//   console.log(`${vitannia}  ${vmistPytannya}`);
// pereVirkaDokymentiv('Anton, dobrogo vechora,')('perevirka dokymentiv');

// //////////////////////////bind//////////////////////////
// const someObjWithMethod = {
//   dealerName: 'AClima llc',
//   soldItems: [],
//   addButton: undefined,
//   addItem: function (stuff, quantity) {
//     console.log(this);
//     this.soldItems.push([stuff, quantity]);
//     console.log(this.soldItems);
//     console.log(this);
//     const inputElem = document.querySelector('.itemName');
//     const addButton = document.querySelector('.submit');
//     addButton.textContent = this.dealerName;

//     addButton.addEventListener('click', () => {
//       this.soldItems.push([inputElem.value, quantity]);
//       console.log(this.dealerName, this.soldItems);
//     });
//   },
// };

// // someObjWithMethod.addItem('zakatochna mashynka', 15);
// const nextObjectAsysLLC = {
//   dealerName: 'ASYSLLC',
//   soldItems: [],
// };
// const addItems = someObjWithMethod.addItem;
// const addItemsASYSLLC = addItems.bind(nextObjectAsysLLC);
// addItemsASYSLLC(14, 'Kosilka');

// // ---------------------------------------CHALEENGE#1------------------------------------------------
// // const answersString =
// //   'What is your favorite programming language?\n0: JavaScript\n1: Pyton\n3: Rust\n4: C++\n(Write option number)';
// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section 😄
//   generatePromptString: function () {
//     let optionString = this.question;
//     for (const [index, option] of this.options.entries()) {
//       updatedStr = `${index + 1}: ${option.slice(3)}`;
//       optionString += `\n${updatedStr}`;
//     }
//     return optionString;
//   },
//   answers: new Array(4).fill(0),
//   registerNewAnswer: function () {
//     const getInput = prompt(this.generatePromptString());
//     (Number.isInteger(getInput) && getInput < 0) || getInput > 3
//       ? (alert('Please type number equal of your answer'),
//         this.registerNewAnswer())
//       : (this.answers[+`${getInput - 1}`]++, this.displayResults());
//   },

//   displayResults: function () {
//     console.log(this.answers);
//   },
// };

// const poolButton = document.querySelector('.poll');

// poolButton.addEventListener('click', () => poll.registerNewAnswer());

// // ------------------------------------------------bonus data-------------------------------------------------------
// const bonusTestData1 = [5, 2, 3];
// let testObject1 = {};
// testObject1.answers = bonusTestData1;
// testObject1.displayResults = poll.displayResults.bind(testObject1);
// testObject1.displayResults();

// const bonusTestData2 = [1, 5, 3, 9, 6, 1];
// let testObject2 = {};
// testObject2.answers = bonusTestData2;
// testObject2.displayResults = poll.displayResults.bind(testObject2);
// testObject2.displayResults();
// // testObject2.

// -----------------------------------------clouser-----------------------------
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  console.log(header.style.color);
  // const clickHandler = () => {
  //   this.headerColor = 'blue';
  // };
  // eventLiestener is an async function which are waiting on cklick event in
  // callBack que. Present function has been executed and disapear from the call stack
  // but listener is waiting and have in own scope all variables\stuff, which was created in
  // parent function. I have to assign `header.style.color = 'red';`
  // to some name (fix this value for some name)

  const body = document.querySelector('body');
  body.addEventListener('click', () => (header.style.color = 'blue'));
})();
