// class method binding
class A {
    constructor() {
        this.name = 'a';
        this.foo = () => { //arrow functions can always only be defined through class instance properties. 
            console.log('foo from A')
        }
    }
}

class B extends A {
    constructor() {
        super();
        this.name = 'b'; // property overrides
    }
    foo() {
        console.log('foo from B')
        super.foo();
    }
}

const a = new A();
a.foo();

const b = new B();
console.log(b);
b.foo(); // -> 'foo from A'
/**
 * property name & method name are the same
 * When you call instance.foo(), 
 * 1 ) the interpreter looks at the instance to see if it has a property called 'foo'. 
 *  1.1 ) If there is, it checks if it's a function and throws an error if it isn't. 
 * 
 * 2 ) If the instance doesn't have such a property, 
 *    it checks the instance's prototype and does the same thing
 * 
 * 3 ) until an ancestor has a 'foo' property or until it reaches the top of the inheritance tree. 
 */
B.name; // 'b'


/**
 * Correct way to put a method for others to inherit:
 * you need to define that method as a normal class method 
 * using shorthand notation.
 */
class C {
    constructor() {
        // here no binding is ok: foo() 
        this.name = "C";
    }
    foo() {
        console.log('foo from ', this.name);
    }
}

class D extends C {
    foo() {
        super.foo();
        console.log('foo from D')
    }
}
new D().foo();
// correct output:
// foo from C
// foo from D

/**
 * If method will be use as callback, 
 * you have to bind this in `constructor()`
 */
class E {
    constructor(fn) {
        // No binding here
        //this.foo = this.foo.bind(this) 
        this.name = "E";
        fn(this.foo); // because here `foo` use as callbacks
    }
    foo(val) {
        // cannot access: this.name as callback
        console.log('foo from ', this.name, ' with value:', val);
    }
}
try {
    new E(fn => {
        fn("error!");
    });
} catch (e) {
    console.log(e);
}
// Eror output:
// script.js:80 Uncaught TypeError: Cannot read property 'name' of undefined
//     at foo (script.js:80)
//     at script.js:84
//     at new E (script.js:77)
//     at script.js:83

// Solution:
class F {
    constructor(fn) {
        this.foo = this.foo.bind(this) // you have to bind this method with `this`
        this.name = "F";
        fn(this.foo); // because here `foo` use as callbacks
    }
    foo(val) {
        console.log('foo from ', this.name, ' with value:', val);
    }
}
new F(fn => {
    fn("success!");
});
// expected output:
// foo from  F  with value: success!

