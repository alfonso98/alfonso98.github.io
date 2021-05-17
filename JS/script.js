var scroll = window.requestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60)};

var elementsToShow = document.querySelectorAll(".CVSection"); 
// console.log(elementsToShow);

function loop() {
  
  Array.prototype.forEach.call(elementsToShow, function(element){
    if (isElementInViewport(element)) {
      element.classList.add('is-visible');
    } else {
      element.classList.remove('is-visible');
    }
  });

  scroll(loop);

}

loop();

function isElementInViewport(el) {

  
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}

function isEmail(email) {
  let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regex.test(String(email).toLowerCase());
}

function isNotEmpty(value) {
  if (value == null || typeof value == 'undefined' ) return false;
  return (value.length > 0);
}

function fieldValidation(value, validationFunction) {

  if (value == null) return false;
 
  let isFieldValid = validationFunction(value)

  if (!isFieldValid) {
  value.className = 'placeholderRed';
  } else {
  value.className = '';
  }
 
  return isFieldValid;
}

function isValid() {
  var name = document.getElementById("name").value;
  var emailAddress = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  var res = true;

  res &= fieldValidation(name, isNotEmpty);
  res &= fieldValidation(emailAddress, isEmail);
  res &= fieldValidation(message, isNotEmpty);

  return res;

}

function resetInputs() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
}

var data_js = {
  "access_token": "ucq77ooa9nt0xnv8hci8fpbf"
};

function sendContact() {

  window.location.hash = "Footer";

  if(isValid()){

    var name = document.getElementById("name").value;
    var emailAddress = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    var request = new XMLHttpRequest();

    data_js['subject'] = "Contact from: " + name + " .";
    data_js['text'] = message + ", email: " + emailAddress +" .";

    var params = toParams(data_js);

    request.open("POST", "https://postmail.invotes.com/send", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.send(params);

    
    resetInputs();
    

  }else{
    console.log("Error !!")
  }

}

function toParams(data_js) {
  var form_data = [];
  for ( var key in data_js ) {
      form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
  }

  return form_data.join("&");
}