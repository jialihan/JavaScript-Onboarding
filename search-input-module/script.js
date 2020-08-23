// UI elements
const searchInputElement = document.querySelector('.search-input');
const resultsElement = document.querySelector('.results');

// add events
searchInputElement.addEventListener('change', handleChange);
searchInputElement.addEventListener('keyup', handleChange);

function handleChange(e) {
	const inputValue = e.target.value;
	console.log(inputValue);
	// or this.value
	return getSearchResults(inputValue);
}

// Function to make http request
// and handle response
function getSearchResults(key) {
	searchData(key)
		.then((resp) => {
			const arr = resp.data;
			const markups = arr.map((el) => {
				const title = el.title;
				const rating = el.rating;
				return `
            <li>
                <span class="title">${title}</span>
                <span class="rating">${rating}</span>
            </li>
            `;
			});
			resultsElement.innerHTML = markups.join('');
		})
		.catch((e) => {
			console.log(e);
		});
}

//  Mock the api request and response
async function searchData() {
	return new Promise((resolve, reject) => {
		resolve({
			data: [ { title: 'TITANIC', rating: '9.9' }, { title: 'Joker', rating: '9.8' } ]
		});
	});
}

/** Optimize Features */

// Cache search results
function memoize(func) {
	const cache = new Map();
	return function(...args) {
		// Use first argument as key
		const key = args[0];
		if (cache.has(key)) {
			console.log('cache hit');
			return cache.get(key);
		}
		console.log('cache miss');
		const val = func.apply(this, arguments);
		cache.set(key, val);
		return val;
	};
}
getSearchResults = memoize(getSearchResults);

// Avoid fast typing and reduce unnecessary api request
function debounce(fn, time) {
	let timeout;
	return function() {
		const executeFunc = () => {
			return fn.apply(this, arguments);
		};
		clearTimeout(timeout);
		timeout = setTimeout(executeFunc, time);
	};
}
// set timeout 0.2s
getSearchResults = debounce(getSearchResults, 200);
