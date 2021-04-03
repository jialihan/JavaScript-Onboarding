// Requirement:
// 1. support user input element (debounce)
// 2. search or enter key can submit the search request
// 3. when nothing input but inputEL is focused, show local search history in dropdown
// 4. add onchange handler, send "getSuggesting data" from server
// 5. render suggestion data in dropdown
// 6. when input is blured, dropdown hidden
// - 6.1 consider unmount or hidden on different cases
// - when submitted, can unmount
// - outside click, input before submit, keep mounted with current data

var searchBarEL = document.querySelector('.search-bar');
var inputEL = document.getElementById('input-search');
var inputControlsEL = document.querySelector('.input-controls');
var clearBtnEL = document.querySelector('.clear-btn');
var dropdownContainerEL = document.querySelector('.dropdown-container');
var dropdownEL = document.querySelector('.dropdown');
var searchBtnEL = document.getElementById('search-btn');

/********************Event Listener************************************** */
inputEL.addEventListener('input', function (e) {
    debouncedInputHandler(e);
});
inputEL.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        // event.keyCode === 13 -> deprecated !!! not use
        submitSearchHandler();
    }
});
inputEL.addEventListener('focus', (event) => {
    searchBarEL.classList.add('addon');
    dropdownContainerEL.classList.add('open');
    if (inputEL.value === "") {
        inputHandler(event);
    }
});
inputEL.addEventListener('blur', (event) => {
    dropdownContainerEL.classList.remove('open');
    searchBarEL.classList.remove('addon');
});
clearBtnEL.addEventListener('click', function (e) {
    console.log("input clear btn clicked!");
    e.preventDefault();
    inputEL.value = "";
    inputEL.focus();
});
searchBtnEL.addEventListener('click', submitSearchHandler);
dropdownContainerEL.addEventListener('scroll', function () {
    console.log("height:", dropdownContainerEL.clientHeight);
    if (dropdownContainerEL.scrollTop + dropdownContainerEL.clientHeight // 200px dropdown height
        + 5 >= dropdownContainerEL.scrollHeight) {
        renderDropDownItems(getSuggestionData(inputEL.value));
    }
});
function submitSearchHandler(e) {
    /// enter key: lose focus
    inputEL.blur();
    dropdownContainerEL.classList.remove('open');
    inputControlsEL.classList.remove('open');
    // add current search to history;
    var result = localStorage.getItem('searchHistory');
    var searchHistory = [];
    if (result) {
        console.log("localstorage result:", result);
        searchHistory = JSON.parse(result);
    }
    var newHistory = new Set(searchHistory);
    if (inputEL.value) {
        newHistory.add(inputEL.value);
    }
    newHistory = Array.from(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    inputEL.value = "";

    // TODO: get response from server 
    // TODO: render response from server
}

/********************* Input Handler ******************************/
function inputHandler(e) {
    var key = inputEL.value;
    console.log("input value:", key);
    // handle input conrols elements
    if (!key) {
        inputControlsEL.classList.remove('open');
    }
    else {
        inputControlsEL.classList.add('open');
    }
    // handle dropdown 
    dropdownEL.innerHTML = ""; // for re-paint
    var data = getSuggestionData(key);
    console.log("data to render:", data);
    renderDropDownItems(data);
    console.log(key);
}
function debounce(fn, time) {
    var timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn(arguments);
        }, time);
    }
}
var debouncedInputHandler = debounce(inputHandler, 500);

/*********************  Data Fetch ******************************/
function getLocalSearchHistory() {
    var result = localStorage.getItem('searchHistory');
    console.log("search history:", typeof result, result);
    var searchHistory = [];
    if (result) {
        searchHistory = JSON.parse(result);
    }
    return searchHistory;
}
function getSuggestionData(key) {
    let data;
    if (!key) {
        data = getLocalSearchHistory();
        console.log("get local history:", data);
        return data;
    }
    // cache
    if (localStorage.getItem(key)) {
        var res = JSON.parse(localStorage.getItem(key))
        console.log('cache hit!')
        data = res.data;
    }
    else {
        console.log('cache miss!')
        // var queryData = function(key){
        //     fetch('.......${key}').then(resp=>resp.json())
        //     .then(resp=>{
        //         data = resp.data;
        //         renderDropDownItems(data);
        //     });
        // }

        // mock data for local
        if (key.length % 2 === 0)
            data = ["a", "ab", "abc", "abcd", "abcde", "abcdef"];
        else
            data = ["d", "e", "f", "g", "h", "j"];
    }
    return data;
}

/********************* Render Data ******************************/
function renderDropDownItems(data) {
    if (!data || data.length === 0) {
        return;
    }
    var fragment = new DocumentFragment();
    data.forEach(str => {
        console.log("render item:", str);
        var li = document.createElement('li');
        li.classList.add('dropdown-item');
        li.innerHTML = str;
        li.tabIndex = 0;
        fragment.appendChild(li);
    });
    dropdownEL.appendChild(fragment);    // show the dropdown while use input
}
/********************* Accessibility ******************************/
var liSelected;
inputEL.addEventListener('keydown', function (e) {
    // only when input is focused, this event can capture
    var lis = document.querySelectorAll('.dropdown li');
    if (e.key === 'ArrowDown') {
        console.log("arrow down pressed!");
        if (!liSelected) {
            liSelected = lis[0];
            liSelected.focus();
            liSelected.classList.add('li-selected');
            inputEL.value = liSelected.textContent;
            inputEL.focus();
        }
        else {
            // go to next sibling
            liSelected.classList.remove("li-selected");
            if (liSelected.nextElementSibling) {
                liSelected = liSelected.nextElementSibling;
            }
            else {
                liSelected = lis[0];
            }
            liSelected.classList.add("li-selected");
            inputEL.value = liSelected.textContent;
        }
    }
    else if (e.key === 'ArrowUp') {
        console.log("arrow up pressed!");
        if (liSelected) {
            // got to prev sibling
            liSelected.classList.remove("li-selected");
            var prevLiEL = liSelected.previousElementSibling;
            if (prevLiEL) {
                liSelected = prevLiEL;
            }
            else {
                liSelected = lis[lis.length - 1];
            }
            liSelected.classList.add("li-selected");
            inputEL.value = liSelected.textContent;
        }
    }
});

// remove the keyboard select when mouse move
dropdownContainerEL.addEventListener('mousemove', e => {
    if (liSelected) {
        liSelected.classList.remove("li-selected");
        liSelected = null;
    }
});

window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
});