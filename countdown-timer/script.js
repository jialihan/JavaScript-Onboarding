var duration = 60 * 5; // 5 min by default
var buttonEL = document.getElementById("start");
var m1EL = document.getElementById("m1");
var m2EL = document.getElementById("m2");
var s1EL = document.getElementById("s1");
var s2EL = document.getElementById("s2");

buttonEL.addEventListener("click", startCountDown);
function startCountDown() {
  console.log("start button clicked");

  var start = Date.now(),
    diff,
    mm,
    ss,
    nums = [];
  var t = setInterval(function () {
    // bitwise operations only make sense on integers, 0.5 is truncated.
    diff = duration - (((Date.now() - start) / 1000) | 0);
    console.log("diff", diff);
    // compute current time
    mm = (diff / 60) | 0;
    ss = diff % 60 | 0;
    mm = mm < 10 ? "0" + mm : mm + "";
    ss = ss < 10 ? "0" + ss : ss + "";
    nums = [...mm, ...ss];
    console.log("nums:", nums);
    m1EL.textContent = nums[0];
    m2EL.textContent = nums[1];
    s1EL.textContent = nums[2];
    s2EL.textContent = nums[3];
    if (diff <= 0) {
      clearInterval(t);
      resetHMTL();
    }
  }, 1000);
}

var resetHTML = () => {
  m1EL.textContent = 0;
  m2EL.textContent = 0;
  s1EL.textContent = 0;
  s2EL.textContent = 0;
};

// Tutorial: https://www.w3schools.com/howto/howto_js_countdown.asp
// <!-- Display the countdown timer in an element -->
// <p id="demo"></p>

// <script>
// Set the date we're counting down to
// MDN doc: hwo to use new Date constructor
// eg: const date1 = new Date('December 17, 1995 03:24:00');
// eg: const date2 = new Date('1995-12-17T03:24:00');
var countDownDate = new Date("Jan 5, 2030 15:37:25").getTime();
// new Date('2030-01-05T15:37:25');
// new Date(2030, 1, 5, 15, 37, 25);

// Update the count down every 1 second
var x = setInterval(function () {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
// </script>
