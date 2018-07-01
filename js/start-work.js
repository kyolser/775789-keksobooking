'use strict';

(function () {

  var fieldsetArray = Array.from(window.globalVar.fieldsetNodeList);
  var titlePage = document.querySelector('.promo');
  var message = document.createElement('div');

  var stopWork = function (content) {
    window.globalVar.mapPinMain.classList.add('hold');
    message.classList.add('alert');
    message.innerHTML = content;
    titlePage.appendChild(message);
    setTimeout(function () {
      var alert = document.querySelector('.alert');
      alert.parentNode.removeChild(alert);
    }, 3000);
  };

  var startWork = function () {
    window.backend.downloadData(function (data) {
      window.renderMapPins(data);
      window.renderMapPinsFilter(data);
      window.globalVar.mapBlock.classList.remove('map--faded');
      window.globalVar.form.classList.remove('ad-form--disabled');
      for (var field = 0; field < fieldsetArray.length; field++) {
        fieldsetArray[field].removeAttribute('disabled', true);
      }
    }, function (err) {
      stopWork(err);
    });
  };

  window.startWork = startWork;

})();
