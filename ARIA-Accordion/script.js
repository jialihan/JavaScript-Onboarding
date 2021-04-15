// https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html

/**************************** Elements ****************************/
var accordionEL = document.querySelector('.Accordion');
var headersEL = Array.from(document.querySelectorAll('.Accordion-trigger'));
var panelsEL = Array.from(accordionEL.querySelectorAll('.Accordion-panel'));

/************************* Configuration  ****************************/
// Allow for multiple accordion sections to be expanded at the same time
var allowMultiple = accordionEL.hasAttribute('data-allow-multiple');

/******************** Hide/Show Panel Click Event ********************/
accordionEL.addEventListener('click', function (event) {
    var targetEL = event.target;
    if (targetEL.classList.contains('Accordion-trigger')) {
        console.log("accordion header is clicked!");
        // Check if the current toggle is expanded.
        var isExpanded = targetEL.getAttribute('aria-expanded') === 'true';
        var activeEL = accordionEL.querySelector('[aria-expanded="true"]');

        // NOT allowMultiple, close the open accordion
        if (!allowMultiple && activeEL && activeEL !== targetEL) {
            // Set the expanded state on the triggering element
            activeEL.setAttribute('aria-expanded', 'false');
            // Hide the accordion sections, using aria-controls to specify the desired section
            document.getElementById(activeEL.getAttribute('aria-controls')).setAttribute('hidden', '');
        }

        // Always toggle the expand status
        if (!isExpanded) {
            // Set the expanded state on the triggering element
            targetEL.setAttribute('aria-expanded', 'true');
            // Hide the accordion sections, using aria-controls to specify the desired section
            document.getElementById(targetEL.getAttribute('aria-controls')).removeAttribute('hidden');
        }
        else {
            // Set the expanded state on the triggering element
            targetEL.setAttribute('aria-expanded', 'false');
            // Hide the accordion sections, using aria-controls to specify the desired section
            document.getElementById(targetEL.getAttribute('aria-controls')).setAttribute('hidden', '');
        }
        event.preventDefault();
    }
});
/******************* END - Hide/Show Panel Click Event *****************/

/******************** Accessibility Arrow UP/DOWN ********************/
accordionEL.addEventListener('keydown', function (event) {
    var targetEL = event.target;
    var key = event.key;

    if (targetEL.classList.contains('Accordion-trigger')) {
        if (key === "ArrowDown" || key === "ArrowUp") {
            var dir = key === "ArrowDown" ? 1 : -1;
            var index = headersEL.indexOf(targetEL);
            console.log("cur index: " + index);
            var len = headersEL.length;
            console.log("arrow down key pressed!")
            var nextIdx = (index + dir + len) % len;
            console.log("next index: " + nextIdx);
            console.log("next EL:" + headersEL[nextIdx]);
            headersEL[nextIdx].focus();
            event.preventDefault();
        }
    }
});
/***************  END - Accessibility Arrow UP/DOWN ******************/


/***************  Test BUTTON Click Event when Focused ********************/
var testBtnEL = document.getElementById("test-btn");
var nativeBtnEL = document.getElementById("test-btn2");
var resultEL = document.querySelector('.result');
testBtnEL.addEventListener('click', function (e) {
    resultEL.textContent = "Div button is clicked!";
});
testBtnEL.addEventListener('focus', function (e) {
    resultEL.textContent = "Div button is focused !";
});
nativeBtnEL.addEventListener('click', function (e) {
    resultEL.textContent = "Native button is clicked!";
});
nativeBtnEL.addEventListener('focus', function (e) {
    resultEL.textContent = "Native button is focused !";
});
/*************** END - Test BUTTON Click Event when Focused ****************/