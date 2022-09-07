"use strict";
class Car {
    constructor(MAXIMUM_FUEL_CAPACITY) {
        this._fuel = 0;
        this._miles = 0;
        this.FUEL_MILEAGE = 10;
        this._radio = new Radio();
        this._engine = new Engine();
        this.MAXIMUM_FUEL_CAPACITY = MAXIMUM_FUEL_CAPACITY;
    }
    get miles() {
        return this._miles;
    }
    //Take attention to these getter and setters
    get fuel() {
        return this._fuel;
    }
    get radio() {
        return this._radio;
    }
    get engine() {
        return this._engine;
    }
    //When a value can only go one way (you add fuel, consuming fuel is handled by the car itself)
    // it is better to provide a specific method for this instead of a generic setter.
    // with a setter there is always the chance of somebody lowering the fuel amount by accident.
    addFuel(fuel) {
        this._fuel = Math.min(fuel + this._fuel, this.MAXIMUM_FUEL_CAPACITY);
    }
    drive() {
        if (this._engine.engineStatus === false || this._fuel <= 0) {
            //what I am doing here is a good principle called "failing early"
            // If you have some conditions you need to check, that will exclude most of the code in your function check that first
            // This prevents your "happy path" of code to be deeply indented.
            return;
        }
        this._fuel -= 1;
        this._miles += this.FUEL_MILEAGE;
    }
}
/**
 * Radio class
 */
class Radio {
    constructor() {
        this._musicLevel = 0;
        this._oldMusicLevel = 50;
    }
    get musicLevel() {
        return this._musicLevel;
    }
    set musicLevel(value) {
        this._musicLevel = value;
        this._oldMusicLevel = value;
    }
    turnMusicOn() {
        this._musicLevel = this._oldMusicLevel;
    }
    turnMusicOff() {
        this._musicLevel = 0;
    }
}
/**
 * Engine Class
 */
class Engine {
    constructor() {
        this._engineStatus = false;
    }
    get engineStatus() {
        return this._engineStatus;
    }
    turnEngineOn() {
        this._engineStatus = true;
    }
    turnEngineOff() {
        this._engineStatus = false;
    }
}
const musicToggleElement = document.querySelector('#music-toggle');
const musicSliderElement = document.querySelector('#music-slider');
const engineToggleElement = document.querySelector('#engine-toggle');
const addFuelForm = document.querySelector('#add-fuel-form');
const addFuelInput = document.querySelector('#add-fuel-input');
const fuelLevelElement = document.querySelector('#fuel-level');
const milesElement = document.querySelector('#miles-value');
const audioElement = document.querySelector('#car-music');
let car = new Car(100);
musicToggleElement.addEventListener('click', () => {
    if (car.radio.musicLevel === 0) {
        car.radio.turnMusicOn();
        musicSliderElement.value = car.radio.musicLevel.toString();
        musicToggleElement.innerText = 'Turn music off';
        return;
    }
    musicToggleElement.innerText = 'Turn music on';
    car.radio.turnMusicOff();
});
//I use input instead of change, because then the value changes when I move the mouse, not only on release
musicSliderElement.addEventListener('input', (event) => {
    let target = (event.target);
    let musicLevel = car.radio.musicLevel;
    musicLevel = target.value;
    audioElement.volume = musicLevel / 100;
    //@todo when you are repeating the same text over and over again maybe we should have made some constants for it? Can you do improve on this?
    /*Create a variable for musiclevel*/
    musicToggleElement.innerText = musicLevel ? 'Turn music off' : 'Turn music on';
});
engineToggleElement.addEventListener('click', () => {
    if (car.engine.engineStatus) {
        car.engine.turnEngineOff();
        engineToggleElement.innerText = 'Turn engine on';
        return;
    }
    engineToggleElement.innerText = 'Turn engine off';
    car.engine.turnEngineOn();
});
addFuelForm.addEventListener('submit', (event) => {
    event.preventDefault();
    car.addFuel(Number(addFuelInput.value));
    fuelLevelElement.innerText = car.fuel.toString();
});
setInterval(() => {
    car.drive();
    //while it looks like both lines below are the same there is a subtle difference (you could put breakpoints here to see the difference):
    // this <cast> will only tell TypeScript that the value is a string, but the actual variable in JS is not changed in any way: it is in reality still a number
    milesElement.innerText = (car.miles);
    // This .toString() will actually convert the value in JavaScript from an integer to a string
    fuelLevelElement.innerText = car.fuel.toString();
    if (car.radio.musicLevel === 0) {
        audioElement.pause();
    }
    else {
        audioElement.play();
    }
}, 1000);
