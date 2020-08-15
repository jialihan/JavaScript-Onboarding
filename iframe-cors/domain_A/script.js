// test 1: iframe Get
var respTextArea = document.querySelector(".get-response");
var iframe = document.getElementById("myiframe");
iframe.style.display = "none";
iframe.src = "http://127.0.0.1:8080";
var isloaded = false; // avoid repeated onload of iframe
iframe.onload = function(e) {
  if (!isloaded) {
    isloaded = true;
    // any empty proxy page from same Origin
    e.target.src = "http://127.0.0.1:55097/proxy.html";
  } else {
    // get data from CORS domain
    respTextArea.value = iframe.contentWindow.name;
  }
};

// test2: iframe Post + form
var respTextArea2 = document.querySelector(".post-response");
var iframe2 = document.getElementById("myiframe2");
iframe2.style.display = "none";
var myform = document.getElementById("form2");
myform.addEventListener("submit", function() {
  console.log("data submitted!");
});

iframe2.onload = function() {
  // But cannot async track response !!!
  respTextArea2.value = "post sent";
};
