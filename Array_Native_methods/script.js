/******************** Array.prototype.push ******************* */
Array.prototype.myPush = function (...args) {
    var params = [...args];
    this.splice.apply(this, [this.length, 0].concat(params));
    return this.length;
};

// // test:
// var arr = [];
// arr.myPush('a', 'b', 'c');


/******************** Array.prototype.shift ******************* */
// The shift() method removes the first element from an array 
// and returns that removed element.
Array.prototype.myShift = function () {
    return this.splice(0, 1)[0];
};

// test:
var arr = ['a', 'b', 'c'];
var result = arr.myShift();
console.log(result);

