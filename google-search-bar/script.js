// Requirement:
// 1. Input element:
//    - support user input element (debounce)
//    - a clear button to clear input value
// 2. dropdown element:
//    - show dropdown whenever input is focused
//    - hide dropdown after submit or outside click (mount / unmount)
//          * when submitted, unmount
//          * outside click, input before submit, keep mounted with current data
//    - updates UI when hide/show dropdown, be consistent UI
//    - when value is empty, show local search history in dropdown
//    - render suggestion data from sever
//    - infinite scroll for more data in dropdown
// 3. submit data:  enter key or search icon
// 4. Accessibility:
//    - arrow down key to select dropdown from input element at the first time
//    - arrow down / up key to select with keyboard
//    - auto complete when keyboard selected


/****************************************************************************************/
/*****************************  Elements    *********************************************/
/****************************************************************************************/
var searchBarEL = document.querySelector('.search-bar');
var inputEL = document.getElementById('input-search');
var inputControlsEL = document.querySelector('.input-controls');
var clearBtnEL = document.querySelector('.clear-btn');
var dropdownContainerEL = document.querySelector('.dropdown-container');
var dropdownEL = document.querySelector('.dropdown');
var searchBtnEL = document.getElementById('search-btn');

/****************************************************************************************/
/**************************    Event Listener     ***************************************/
/****************************************************************************************/
inputEL.addEventListener('input', debounce(inputHandler, 500));
inputEL.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        submitSearchHandler();
    }
});
inputEL.addEventListener('focus', onInputFocusHandler);
inputEL.addEventListener('blur', inputBlurHandler);
clearBtnEL.addEventListener('click', clearInputHandler);
searchBtnEL.addEventListener('click', submitSearchHandler);
dropdownContainerEL.addEventListener('scroll', dropdownInfiniteScrollHandler, { passive: true });

/****************************************************************************************/
/*****************************  Event Handlers ******************************************/
/****************************************************************************************/
function debounce(fn, time) {
    var timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn(arguments);
        }, time);
    }
}
/**
 * handle the first click and any empty string on input
 * 1) before user start typing 
 * 2) clear input 
 * @param {*} e 
 */
function onInputFocusHandler(e) {
    searchBarEL.classList.add('addon');
    dropdownContainerEL.classList.add('open');
    var key = inputEL.value;
    if (!key) {
        inputControlsEL.classList.remove('open');
        loadDropdown(key);
        console.log("render dropdown from focus event");
    }
}
/**
 * handle user typing, only when non-empty values on input
 * @param {*} e 
 */
function inputHandler(e) {
    console.log("input event:");
    var key = inputEL.value;
    // handle input conrols elements
    if (key) {
        console.log("render dropdown from input event");
        inputControlsEL.classList.add('open');
        loadDropdown(key);
    }
}
/**
 * When outside click, inputEL blur
 * hide dropdown & recover searchBar style
 */
function inputBlurHandler(event) {
    dropdownContainerEL.classList.remove('open');
    searchBarEL.classList.remove('addon');
}
/**
 * load dropdown with data
 * @param {*} key 
 */
function loadDropdown(key) {
    dropdownEL.innerHTML = ""; // for re-paint
    var data = getSuggestionData(key);
    renderDropDownItems(data);
}
/**
 * handle submit input value event
 * store curernt search in localstorage
 * TODO: send data to server
 * @param {*} e 
 */
function submitSearchHandler(e) {
    inputEL.blur(); // lose focus
    dropdownContainerEL.classList.remove('open');
    inputControlsEL.classList.remove('open');
    // add current search to history;
    var result = localStorage.getItem('searchHistory');
    var searchHistory = [];
    if (result) {
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
/**
 * infinite scroll on dropdown
 */
function dropdownInfiniteScrollHandler() {
    // console.log("height:", dropdownContainerEL.clientHeight);
    if (dropdownContainerEL.scrollTop + dropdownContainerEL.clientHeight // 200px dropdown height
        + 5 >= dropdownContainerEL.scrollHeight) {
        renderDropDownItems(getSuggestionData(inputEL.value));
    }
}
/**
 * Clear user input 
 * still keeps input focus state
 * @param {*} e 
 */
function clearInputHandler(e) {
    e.preventDefault();
    inputEL.value = "";
    inputEL.focus();
}

/***************************************************************************************/
/************************************  Data Fetch **************************************/
/***************************************************************************************/
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

/***************************************************************************************/
/********************************** DOM Manipulations **********************************/
/***************************************************************************************/
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
    dropdownEL.appendChild(fragment);
}

/***************************************************************************************/
/****************************   Accessibility     **************************************/
/***************************************************************************************/
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

/**
 * Remove the keyboard select when mouse move 
 */
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