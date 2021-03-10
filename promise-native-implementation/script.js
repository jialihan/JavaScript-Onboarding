// Implement Promise
// basic usageconst PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

class MyPromise {
    constructor(fn) {
        console.log("constructor...");
        // store state which can be PENDING, FULFILLED or REJECTED
        this.status = PENDING;
        // store value once FULFILLED or REJECTED
        this.result = null;
        this.resolveHandlers = [];
        this.rejectHandlers = [];

        this.onResolve = this.onResolve.bind(this);
        this.onReject = this.onReject.bind(this);

        fn(this.onResolve, this.onReject);
    }
    onResolve(value) {
        this.result = value;
        this.status = FULFILLED;
        let chainedValue = value;
        try {
            this.resolveHandlers.forEach(fn => {
                chainedValue = fn(chainedValue);
            });
        }
        catch (error) {
            this.resolveHandlers = [];
            this.onReject(error);
        }
    }
    onReject(value) {
        this.result = value;
        console.log("calling onReject...");
        this.status = REJECTED;
        let chainedValue = value;
        this.rejectHandlers.forEach(fn => {
            chainedValue = fn(chainedValue);
        });
        this.rejectHandlers = [];
    }
    then(handleResolved, handleRejected) {
        if (handleResolved) {
            if (this.status === FULFILLED) {
                console.log("then: already fulfilled")
                handleResolved(this.result);
            }
            else {
                this.resolveHandlers.push(handleResolved);
            }
        }
        if (handleRejected) {
            if (this.status === REJECTED) {
                console.log("then: already rejected")
                handleRejected(this.result);
            }
            else {
                this.rejectHandlers.push(handleRejected);
            }
        }

        return this; // self chaining
    }
    catch(handleError) {
        // It behaves the same as calling Promise.prototype.then(undefined, onRejected) 
        // (in fact, calling obj.catch(onRejected)
        // internally calls obj.then(undefined, onRejected)).
        this.then(undefined, handleError);
        return this; // self chaining
    }
}

// test
const p = new MyPromise((resolve, reject) => {
    setTimeout(function () {
        // resolve("Success!")
        reject("soemthing went wrong!");
    }, 2000)
});
p.then(resp => console.log(resp)).catch(e => console.log(e));

// some time later to monitor this promise
setTimeout(() => {
    p.then(resp => console.log(resp)).catch(e => console.log(e));
}, 3000);

// let myFirstPromise = new Promise((resolve, reject) => {
//     setTimeout(function () {
//         resolve("Success!")
//     }, 250)
// });


