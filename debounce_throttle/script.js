/******************************************************************
 * Debounce Example Code
 *******************************************************************/
var inputEL = document.getElementById("search");
var result1EL = document.getElementById("count1");
var result2EL = document.getElementById("count2");
var count1 = 0,
  count2 = 0;
var debouncedHandler = debounce(onInputChangeHandler, 500);
inputEL.addEventListener("input", function (e) {
  count1++;
  result1EL.textContent = count1;
  debouncedHandler();
});
function onInputChangeHandler() {
  count2++;
  result2EL.textContent = count2;
}
function debounce(fn, time) {
  var timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, time);
  };
}

/******************************************************************
 * Throttle Example Code
 *******************************************************************/

var containerEL = document.querySelector(".container");
var result3EL = document.getElementById("count3");
var result4EL = document.getElementById("count4");
var count3 = 0,
  count4 = 0;
var throttledScrollHandler = throttle2(onScrollHandler, 500);
containerEL.addEventListener("scroll", function (e) {
  count3++;
  result3EL.textContent = count3;
  throttledScrollHandler();
});
function onScrollHandler(e) {
  count4++;
  result4EL.textContent = count4;
}
function throttle(fn, time) {
  var isThrottle;
  return function () {
    if (!isThrottle) {
      fn();
      isThrottle = true;
      setTimeout(() => {
        isThrottle = false;
      }, time);
    }
  };
}
// trigger on leading & trailing edge time
// last call on timelimit also run
function throttle2(fn, limit) {
  var lastCall;
  var timer;
  return function () {
    if (!lastCall) {
      // first invoke
      fn();
      lastCall = new Date();
    } else {
      // in throttle
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (Date.now() - lastCall >= limit) {
          fn();
          lastCall = new Date();
        }
      }, limit - (Date.now() - lastCall));
    }
  };
}

// BFE 04: https://bigfrontend.dev/problem/implement-basic-throttle
function throttle_03(fn, time) {
  var isThrottle;
  var lastArgs;
  return function (...args) {
    if (!isThrottle) {
      fn(...args);
      isThrottle = true;
      setTimeout(() => {
        // check any trailing edge last call
        if (lastArgs) {
          fn(...lastArgs);
        }
        isThrottle = null; // reset to initial condition
        lastArgs = null; // reset to initial condition
      }, time);
    } else {
      lastArgs = [...args];
    }
  };
}
