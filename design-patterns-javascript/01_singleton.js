// ES5 Singleton
// Solution 1: use static variable
function Singleton() {
  // check if existed an instance
  if (Singleton.instance) {
    return Singleton.instance;
  }

  // normal construct process
  this.name = "jel";
  this.age = 18;

  // cache
  Singleton.instance = this;
  // implicit return
  // return this; // NOT needed
}
Singleton.prototype.getName = function () {
  return this.name;
};
// // test
// var uni  = new Singleton();
// var uni2 = new Singleton();
// console.log(uni === uni2); // true
// console.log(uni.getName()); // jel
// console.log(uni);
// console.log(uni2);
// Singleton.instance = {x: 1, y: 1};
// uni  = new Singleton();
// uni2 = new Singleton();
// console.log(uni === uni2); // true
// console.log(uni);

// Solution 2: use a closure
function Singleton2() {
  // cached instance
  var instance = this;

  // normal construct process
  this.name = "jel";
  this.age = 18;

  // rewrite constructor
  Singleton2 = function () {
    return instance;
  };
}
Singleton2.prototype.getName = function () {
  return this.name;
};
// var uni  = new Singleton2();
// var uni2 = new Singleton2();
// console.log(uni === uni2); // true
// console.log(uni.getName()); // jel
// console.log(uni); // Singleton2 {name: "jel", age: 18}
// console.log(uni2); // Singleton2 {name: "jel", age: 18}
// console.log(Singleton2.instance); // undefined: can NOT ACCESS

// solution 3: use IIFE
var Singleton3 = (function () {
  // internal class
  function SingletonClass() {
    this.name = "jel";
    this.age = 18;
  }
  SingletonClass.prototype.getName = function () {
    return this.name;
  };
  var instance;
  return {
    // closure
    getInstance: function () {
      if (instance == null) {
        instance = new SingletonClass();
        // Hide the constructor so the returned object can't be new'd...
        instance.constructor = null;
      }
      return instance;
    }
  };
})();
// // test
// var uni  =  Singleton3.getInstance();
// var uni2 = Singleton3.getInstance();
// console.log(uni === uni2); // true
// console.log(uni.getName()); // jel
// console.log(uni);  // SingletonClass {name: "jel", age: 18, constructor: null}
// console.log(uni2);  // SingletonClass {name: "jel", age: 18, constructor: null}
// var uni3 = new Singleton3(); // ERROR: Uncaught TypeError: Singleton3 is not a constructor

// ES6 - Singleton Class
class Singleton4 {
  static instance = null;
  constructor() {
    if (Singleton4.instance) {
      return Singleton4.instance;
    }
    // normal constructor process
    this.name = "jel";
    this.age = 18;
    Singleton4.instance = this;
  }
  getName() {
    return this.name;
  }
}
var uni = new Singleton4();
var uni2 = new Singleton4();
console.log(uni === uni2); // true
console.log(uni.getName()); // jel
console.log(uni); // SingletonClass {name: "jel", age: 18}
console.log(uni2); // SingletonClass {name: "jel", age: 18}
