'use strict';
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
bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();

const mercedes = new Car('Mercedes', 95);
mercedes.accelerate();
