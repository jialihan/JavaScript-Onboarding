/************************* Elements ******************************/
var postsEL = document.getElementById('posts');
var containerEL = document.querySelector('.container');
var loadingEL = document.querySelector('.loading');

/************************* Variables ******************************/
var currentPage = 1;
var limit = 6;
var total = 0;

/************************* Event Listener ******************************/
window.addEventListener('scroll', function () {
    var { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    console.log("scrollTop:", scrollTop, ", scrollHeight:", scrollHeight, 'clientHeight', clientHeight);

    if (scrollTop + clientHeight + 10 >= scrollHeight) {
        showLoading();
    }
}, {
    passive: true // improve scrolling 
});

/************************* API calls ******************************/
var getPosts = async (page, limit) => {
    var url = `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=${limit}`;
    var resp = await fetch(url);
    resp = await resp.json();

    return resp;
}

/************************* Render UI ******************************/

var renderPosts = (posts) => {
    posts.forEach(post => {
        var postEL = document.createElement('div');
        postEL.classList.add('post');
        postEL.innerHTML = `<div>${post.id}</div>
        <div class="content">${post.quote}</div>
        <div class="author">${post.author}</div>
        `;
        postsEL.appendChild(postEL);
    });
    console.log("finish render html");
    loadingEL.classList.remove('show');
}

var hasPosts = (page, limit, total) => {
    const num = (page - 1) * limit + 1;
    return total === 0 || num < total;
};

var loadPosts = async (page, limit) => {
    try {
        if (hasPosts(page, limit, total)) {
            const resp = await getPosts(page, limit);
            console.log("fetch data success:", resp);
            renderPosts(resp.data); // by data from server
            total = resp.total;
        }
    }
    catch (e) {
        console.log("error", e.message);
    }
}

var showLoading = () => {
    if (hasPosts(currentPage, limit, total)) {
        currentPage++;
        loadingEL.classList.add('show');
        setTimeout(() => {
            loadPosts(currentPage, limit);
        }, 1000);

    }
}

/************************* Initialize the Page ******************************/
loadPosts(currentPage, limit);