var duration = 60 * 5; // 5 min by default
var buttonEL = document.getElementById('start');
var m1EL = document.getElementById('m1');
var m2EL = document.getElementById('m2');
var s1EL = document.getElementById('s1');
var s2EL = document.getElementById('s2');

buttonEL.addEventListener('click', startCountDown);
function startCountDown() {
    console.log('start button clicked');

    var start = Date.now(), diff, mm, ss, nums = [];
    var t = setInterval(
        function () {
            // bitwise operations only make sense on integers, 0.5 is truncated.
            diff = duration - (((Date.now() - start) / 1000) | 0);
            console.log("diff", diff);
            // compute current time
            mm = diff / 60 | 0;
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
}