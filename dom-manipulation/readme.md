### Delete a item in list

#### 1. double click current item to delete itself
* get **event.target**
* find **closest('li')** element
* delete this **'li'** element in parent **'ul'** element
	```
	const curMovie = event.target.closest('li.movie-element');
	curMovie.parentNode.removeChild(curMovie);
	```

#### 2. open a modal to confirm delete or not

Error implementation at first:

```
/* bug: 
we are adding more and different movieId listener
(differnet function) on the same button
*/
deleteButton.addEventListener('click', deleteMovie.bind(null, movieId));
```
**Error Analysis**:

we use `bind()` method to create different new functions with preset parameter **different param**  `movieId`. When user click happens, it might trigger multiple delete methods, cause error.

  

**Correct Solution:**
For every click event, we create a new button element, and bind only current new method on this new button element.
* deep clone this deleteButton element
	```
	deleteButton.replaceWith(deleteButton.cloneNode(true));
	```
* re-select this element in DOM
	```
	deleteButton = deleteModal.querySelector('.btn--danger');
	```

* attach a new event listener on this newly-created element
	```
	deleteButton.addEventListener('click', deleteMovie.bind(null, movieId));
	```