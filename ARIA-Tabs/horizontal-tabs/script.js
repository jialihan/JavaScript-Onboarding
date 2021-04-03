var tabs = document.querySelectorAll("[role='tab']");
var tablist = document.querySelector('[role="tablist"]');
var keys = {
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight'
}
/********************* Event Listeners ******************************/
for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', onClickHandler);
    tabs[i].addEventListener('keydown', onArrowKeyDownHandler);
}
/********************* Event Handlers ******************************/
function onClickHandler(e) {
    var tabs2 = document.querySelectorAll("[role='tab']");
    for (var i = 0; i < tabs2.length; i++) {
        tabs2[i].setAttribute('aria-selected', 'false');
    }
    e.target.setAttribute('aria-selected', 'true');
    showTabPanel();
}
function onArrowKeyDownHandler(event) {
    var isVertical = tablist.getAttribute('aria-orientation') === 'vertical';
    var proceed = false;
    var key = event.key;
    if (isVertical) {
        if (key === keys.up || key === keys.down) {
            event.preventDefault();
            proceed = true;
        };
    }
    else {
        console.log("left or right key")
        if (key === keys.left || key === keys.right) {
            proceed = true;
        }
    }
    if (proceed) {
        handleArrowKeyDown(event);
    }
}

/********************* UI help functions ******************************/
function handleArrowKeyDown(event) {
    var cur = document.querySelector('[aria-selected="true"]');
    cur.blur();
    cur.setAttribute('aria-selected', 'false');
    var key = event.key;
    if (key === keys.left || key === keys.up) {
        if (cur.previousElementSibling) {
            cur.previousElementSibling.setAttribute('aria-selected', 'true');
            cur.previousElementSibling.focus();
        } else {
            handleFirstTab();
        }
    } else if (key === keys.right || key === keys.down) {
        if (cur.nextElementSibling) {
            cur.nextElementSibling.setAttribute('aria-selected', 'true');
            cur.nextElementSibling.focus();
        } else {
            handleLastTab();
        }
    }
    showTabPanel();

}
function handleFirstTab() {
    var first = document.querySelector('[role="tablist"] [role="tab"]:first-child');
    first.focus();
    first.setAttribute('aria-selected', 'true');
}
function handleLastTab() {
    var first = document.querySelector('[role="tablist"] [role="tab"]:last-child');
    first.focus();
    first.setAttribute('aria-selected', 'true');
}
function showTabPanel() {
    var cur = document.querySelector('[aria-selected="true"]');
    var nextTabPanel = cur.getAttribute('aria-controls');
    var tabpanels = document.querySelectorAll("[role='tabpanel']");
    for (var i = 0; i < tabpanels.length; i++) {
        tabpanels[i].style.display = 'none'; // hide all panels
    }
    document.getElementById(nextTabPanel).style.display = 'block';
}