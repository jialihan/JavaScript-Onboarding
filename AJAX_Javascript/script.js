document.querySelector(".btn-ajax").addEventListener("click", function() {
  // create request
  var request = new XMLHttpRequest();

  // open request
  request.open(
    "GET",
    "https://jelly-burger.firebaseio.com/weather.json?orderBy=%22code%22&equalTo=2",
    true
  );

  // set request header if needed
  request.setRequestHeader("Content-Type", "application/json");

  // add handle response method
  request.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      var obj = JSON.parse(this.responseText);
      var pretty = JSON.stringify(obj, undefined, 4);
      document.getElementById("get_resp").value = pretty;
    }
  };

  // add on error handler
  request.onerror = function() {
    console.log(" An error occurred during the http request");
    document
      .querySelector(".ajax-result")
      .insertAdjacentHTML("beforeend", `<p>${this.statusText}</p>`);
  };

  // send request
  request.send();
});

document
  .getElementById("ajax-form")
  .addEventListener("submit", function(event) {
    event.preventDefault();

    // create request
    var request = new XMLHttpRequest();

    // open request
    request.open("POST", "https://jelly-burger.firebaseio.com/weather.json");
    request.setRequestHeader("Content-Type", "application/json"); // or 'multipart/form'

    // add handle response method
    request.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        document.getElementById("post_resp").innerHTML = `${
          this.responseText
        }<br>${this.statusText}`;
      }
    };

    // error handler method
    request.onerror = function() {
      console.log(" An error occurred during the http request");
      document
        .querySelector(".form-result")
        .insertAdjacentHTML("beforeend", `<p>${this.statusText}</p>`);
    };

    // construct form data to json data
    var formData = new FormData(document.getElementById("ajax-form"));
    var obj = {};
    formData.forEach((val, key) => {
      obj[key] = val;
    });
    var jsonData = JSON.stringify(obj);

    // send request
    request.send(jsonData);
  });
