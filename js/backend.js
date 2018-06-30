'use strict';


(function () {

  var URL = 'https://js.dump.academy/keksobooking';

  window.upload = function (data, onLoad, onError) {

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

})();


(function () {

form.addEventListener('submit', function (evt) {
  window.upload(new FormData(form), function (response) {
    console.log()
  });
  evt.preventDefault();
});
})();
