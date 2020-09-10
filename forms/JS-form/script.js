var fname = document.getElementById("first-name");
var lname = document.getElementById("last-name");
var email = document.getElementById("email");
var password = document.getElementById("password");
var select = document.getElementById("title");
var abox = document.querySelector('input[type="checkbox"]#a');
var bbox = document.querySelector('input[type="checkbox"]#b');
var cbox = document.querySelector('input[type="checkbox"]#c');
// 1. select and options
select.addEventListener('change', function(){
    let selectValue = select.options[select.selectedIndex].text;
    console.log(selectValue); 
})

// 2. regular input change two events
fname.addEventListener('change', function(){
    let fnameValue = fname.value;
    console.log(fnameValue); 
})
fname.addEventListener('keyup', function(event){
    let fnameValue = fname.value;
    console.log(fnameValue); 
    if(event.keyCode === 13)
    {
        /// enter key: lose focus
        fname.blur();
    }
})

// 3. email
email.addEventListener('change', function(){
    let emailValue = email.value;
    console.log(emailValue); 
})
// when press enter key
email.addEventListener('keydown', function(event){
    if(event.keyCode === 13)
    {
        let emailValue = email.value;
         console.log(emailValue);  // double print, this will also trigger "onchange"
        // lose focus
        email.blur();
    }
})
// 4. password
password.addEventListener('change', function(){
    let pwValue = password.value;
    console.log(pwValue); 
})
// when press enter key
password.addEventListener('keydown', function(event){
    if(event.keyCode === 13)
    {
        let pwValue = email.value;
         console.log(pwValue);  // double print, this will also trigger "onchange"
        // lose focus
        password.blur();
    }
})

// 5. checkbox
abox.addEventListener('change', function(){
    if(abox.checked)
    {
        console.log(abox.value+ ': checked!');
    }
    else{
        console.log(abox.value+ ': unchecked');
    }
})
bbox.addEventListener('change', function(){
    if(bbox.checked)
    {
        console.log(bbox.value+ ': checked!');
    }
    else{
        console.log(bbox.value+ ': unchecked');
    }
})
cbox.addEventListener('change', function(){
    if(cbox.checked)
    {
        console.log(cbox.value+ ': checked!');
    }
    else{
        console.log(cbox.value+ ': unchecked');
    }
})

//6. how to check an array of radios????
var radios = document.getElementsByName("inputr");
console.log(radios);
// listen to "click event"
for( let el of radios)
{
    el.addEventListener('click', function(){
        if(el.checked)
        {
            console.log(el.value+ ': checked');

        }
    })
    
}


// 8. form submit
var form = document.querySelector('form');
form.addEventListener('submit', function(event){
    event.preventDefault();
    // 7. form data
    var formData = new FormData(form);
    // get data by name
    console.log('get email:',formData.get('email'));
    formData.append('extraFieldName', 'extraValue');

    console.log('submitted!', formData);
    var formObj = {};
    for (var pair of formData.entries()) {
        formObj[pair[0]] = pair[1]
    }
    console.log('form obj:',formObj);
})
