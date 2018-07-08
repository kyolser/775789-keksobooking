'use strict';

(function () {

  var mapPins = window.globalVar.mapBlock.querySelector('.map__pins');

  var renderMapPins = function (adsObjects) {
    var fragment = document.createDocumentFragment();

    adsObjects.forEach(function (obj) {
      var pin = window.globalVar.mapMarkTemp.querySelector('.map__pin').cloneNode(true);
      pin.style.left = obj.location.x + 'px';
      pin.style.top = obj.location.y + 'px';
      pin.querySelector('img').src = obj.author.avatar;
      pin.addEventListener('click', window.createCards.pinClickHandler.bind(undefined, obj));
      fragment.appendChild(pin);
    });
    mapPins.appendChild(fragment);
  };

  var removeMapPins = function () {
    var allRenderedPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    allRenderedPins.forEach(function (pin) {

      mapPins.removeChild(pin);
    });
  };

  var formReset = document.querySelector('.ad-form__reset');
  var positionMainPinLeft = window.globalVar.mapPinMain.style.left;
  var positionMainPinTop = window.globalVar.mapPinMain.style.top;

  var resetClickHandler = function () {
    window.globalVar.form.reset();
    window.globalVar.fieldsetArray.forEach(function (field) {
      field.setAttribute('disabled', true);
    });
    window.globalVar.mapBlock.classList.add('map--faded');
    window.globalVar.form.classList.add('ad-form--disabled');
    window.globalVar.marker = true;
    removeMapPins();
    window.globalVar.mapPinMain.style.left = positionMainPinLeft;
    window.globalVar.mapPinMain.style.top = positionMainPinTop;
    window.globalVar.formAdress.value = parseFloat(window.globalVar.mapPinMain.style.left) + ', ' + parseFloat(window.globalVar.mapPinMain.style.top);
  };

  formReset.addEventListener('click', resetClickHandler);

  window.createPins = {
    removeMapPins: removeMapPins,
    renderMapPins: renderMapPins,
    resetClickHandler: resetClickHandler
  };
}());


