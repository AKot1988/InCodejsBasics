'use strict';

// --------------------------------------First challenge--------------------------------------
const Car = function (brand, speed) {
  this.brand = brand;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.brand} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.brand} is going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
bmw.accelerate();
bmw.brake();

const mercedes = new Car('Mercedes', 95);
mercedes.accelerate();

// --------------------------------------Second challenge--------------------------
class CarCl {
  constructor(brand, speed) {
    this.brand = brand;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.brand} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.brand} is going at ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

// --------------------------------------Third challenge--------------------------

// First option
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.brand} is going at ${this.speed} km/h, with a charge of ${this.charge}%`,
  );
};

tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();
tesla.accelerate();
console.log(tesla);

// second option
// const EV = class extends CarCl {
//   constructor(brand, speed, charge) {
//     super(brand, speed);
//     this.charge = charge;
//   }
// };
// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };
// const tesla = new EV('Tesla', 120, 23);
// tesla.chargeBattery(90);
// console.log(tesla);
