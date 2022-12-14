"use strict";
class Dog {
    constructor(value) {
        this._name = value;
        this._type = 'dog';
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    makeSound() {
        return 'woef woef';
    }
}
class Cat {
    constructor(value) {
        this._name = value;
        this._type = 'cat';
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    makeSound() {
        return 'Miauw miauw';
    }
}
class Parrot {
    constructor(value) {
        this._name = value;
        this._type = 'parrot';
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    makeSound() {
        return 'I am a pirate';
    }
}
class Penguin {
    constructor(value) {
        this._name = value;
        this._type = 'penguin';
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    makeSound() {
        return 'krrwaarwkk';
    }
}
class Bear {
    constructor(value) {
        this._name = value;
        this._type = 'Bear';
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    makeSound() {
        return 'raawrrr';
    }
}
class Zoo {
    constructor() {
        this._animals = new Array();
    }
    addAnimal(animal) {
        this._animals.push(animal);
    }
    get animals() {
        return this._animals;
    }
}
let zooObject = new Zoo;
zooObject.addAnimal(new Cat('Smokey'));
zooObject.addAnimal(new Dog('Finn'));
zooObject.addAnimal(new Parrot('Henry'));
zooObject.addAnimal(new Penguin('Skipper'));
console.log(zooObject);
const el = document.querySelector('#target');
zooObject.animals.forEach((animal) => {
    el.innerHTML += (animal.name + ": " + animal.makeSound() + "<br>");
});
