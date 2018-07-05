'use strict';

(function () {

  var TIMEOUT_OF_ALERT = 3000;

  var titlePage = document.querySelector('.promo');
  var message = document.createElement('div');
  window.globalVar.formAdress.value = parseFloat(window.globalVar.mapPinMain.style.left) + ', ' + parseFloat(window.globalVar.mapPinMain.style.top);

  var stopWork = function (content) {
    window.globalVar.mapPinMain.classList.add('hold');
    message.classList.add('alert');
    message.innerHTML = content;
    titlePage.appendChild(message);
    setTimeout(function () {
      var alert = document.querySelector('.alert');
      alert.parentNode.removeChild(alert);
    }, TIMEOUT_OF_ALERT);
  };

  var startWork = function () {
    window.backend.downloadData(function (data) {
      data = data.splice(window.globalVar.CUT_START, window.globalVar.CUT_QUANTITY);
      window.globalVar.allLoadedPins = data;
      window.createPins.renderMapPins(window.globalVar.allLoadedPins);
      window.globalVar.mapBlock.classList.remove('map--faded');
      window.globalVar.form.classList.remove('ad-form--disabled');
      window.globalVar.fieldsetArray.forEach(function (field) {
        field.removeAttribute('disabled', true);
      });
    }, function (err) {
      stopWork(err);
    });
  };

  window.startWork = startWork;

})();
