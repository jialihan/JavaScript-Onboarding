const modal = document.getElementById('add-modal');
// const modal = document.querySelector('#add-modal');
// const modal = document.body.children[1];
const addBtn = document.querySelector('header > button');
const backdrop = document.getElementById('backdrop');
const cancelBtn = modal.querySelector('.btn--passive');
const confirmAddBtn = cancelBtn.nextElementSibling;
const inputElements = modal.querySelectorAll('input');
// const inputElements = modal.getElementsByTagName('input');
const entryTextSection = document.getElementById('entry-text');
const deleteModal = document.getElementById('delete-modal');

const movies = [];

const updateUI = () => {
	if (movies.length === 0) {
		entryTextSection.style.display = 'block';
	} else {
		entryTextSection.style.display = 'none';
	}
};

const deleteMovie = (movieId) => {
	// movies.filter((id) => {
	// 	return id !== movieId;
	// });
	let movieIndex = 0;
	for (const movie of movies) {
		if (movie.id === movieId) {
			break;
		}
		movieIndex++;
	}
	movies.splice(movieIndex, 1);
	const listRoot = document.getElementById('movie-list');
	listRoot.children[movieIndex].remove();
	// listRoot.removeChild(listRoot.children[movieIndex]);

	cancelMovieDeletion();
	updateUI();
};

const cancelMovieDeletion = () => {
	deleteModal.classList.remove('visible');
	toggleBackdrop();
};

/**
 * Delete method 1
 * click current item to delete itself from UI
 */
const deleteSelfHandler = (event) => {
	const curMovie = event.target.closest('li.movie-element');
	console.log(curMovie);
	curMovie.parentNode.removeChild(curMovie);
};

/**
 * Delete method 2
 * open delete confirm modal, click confirm to delete item in list
 */
const deleteMovieHandler = (movieId) => {
	deleteModal.classList.add('visible');
	toggleBackdrop();
	const cancelDeleteMovieBtn = deleteModal.querySelector('.btn--passive');
	let confirmDeleteMovieBtn = deleteModal.querySelector('.btn--danger');
	// tricky solution
	confirmDeleteMovieBtn.replaceWith(confirmDeleteMovieBtn.cloneNode(true));
	confirmDeleteMovieBtn = deleteModal.querySelector('.btn--danger');

	cancelDeleteMovieBtn.removeEventListener('click', cancelMovieDeletion);
	cancelDeleteMovieBtn.addEventListener('click', cancelMovieDeletion);
	/* bug: we are adding more and more listener on the same button */
	confirmDeleteMovieBtn.addEventListener('click', deleteMovie.bind(null, movieId));
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
	const newMovieElement = document.createElement('li');
	newMovieElement.className = 'movie-element';
	newMovieElement.innerHTML = `
      <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
      </div>
      <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
      </div>
    `;
	// newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
	newMovieElement.addEventListener('click', deleteSelfHandler);
	const listRoot = document.getElementById('movie-list');
	listRoot.append(newMovieElement);
};

const openAddModal = () => {
	modal.classList.add('visible');
	toggleBackdrop();
};

const closeAddModal = () => {
	modal.classList.remove('visible');
};
addBtn.addEventListener('click', openAddModal);

// add a backdrop
const toggleBackdrop = () => {
	console.log('arrow function not hoisted!');
	backdrop.classList.toggle('visible');
};
const backdropClickHandler = () => {
	closeAddModal();
	cancelMovieDeletion();
	clearUserInputs();
	// toggleBackdrop(); // inside of the cancelMovieDeletion()
};
backdrop.addEventListener('click', backdropClickHandler);

// handle cancel button
const clearUserInputs = () => {
	for (let inputElement of inputElements) {
		inputElement.value = '';
	}
};
const cancelMovieHandler = () => {
	closeAddModal();
	toggleBackdrop();
	clearUserInputs();
};
cancelBtn.addEventListener('click', cancelMovieHandler);

// handle add movie button
const addMovieHandler = () => {
	// fetch user input
	const titleValue = inputElements[0].value;
	const imgUrlValue = inputElements[1].value;
	const ratingValue = inputElements[2].value;
	if (
		titleValue.trim() === '' ||
		imgUrlValue.trim() === '' ||
		ratingValue.trim() === '' ||
		+ratingValue < 1 ||
		+ratingValue > 5
	) {
		alert('please enter a rating from 1 to 5 score.');
		return;
	}
	// create a movie object
	const newMovie = {
		id: Math.random().toString(),
		title: titleValue,
		image: imgUrlValue,
		rating: ratingValue
	};
	movies.push(newMovie);
	console.log(newMovie);
	closeAddModal();
	toggleBackdrop();
	clearUserInputs();
	renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
	updateUI();
};
confirmAddBtn.addEventListener('click', addMovieHandler);
