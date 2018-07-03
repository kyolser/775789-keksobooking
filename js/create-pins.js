'use strict';

(function () {

  var ANY = 'any';

  var mapPins = window.globalVar.mapBlock.querySelector('.map__pins');

  var renderMapPins = function (adsObjects) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adsObjects.length; i++) {
      var pin = window.globalVar.mapMarkTemp.querySelector('.map__pin').cloneNode(true);
      pin.style.left = adsObjects[i].location.x + 'px';
      pin.style.top = adsObjects[i].location.y + 'px';
      pin.querySelector('img').src = adsObjects[i].author.avatar;
      pin.addEventListener('click', window.createCards.pinClickHandler.bind(undefined, adsObjects[i]));
      fragment.appendChild(pin);
    }
    mapPins.appendChild(fragment);
  };

  var removeMapPins = function () {
    var allRenderedPins = document.querySelectorAll('.map__pin');
    for (var i = 0; i < allRenderedPins.length; i++) {
      if (allRenderedPins[i].classList.contains('map__pin--main')) {
        continue;
      }
      mapPins.removeChild(allRenderedPins[i]);
    }
  };

  var formReset = document.querySelector('.ad-form__reset');
  var positionMainPinLeft = window.globalVar.mapPinMain.style.left;
  var positionMainPinTop = window.globalVar.mapPinMain.style.top;

  formReset.addEventListener('click', function () {
    window.globalVar.mapBlock.classList.add('map--faded');
    window.globalVar.form.classList.add('ad-form--disabled');
    removeMapPins();
    window.globalVar.mapPinMain.style.left = positionMainPinLeft;
    window.globalVar.mapPinMain.style.top = positionMainPinTop;
    window.globalVar.formAdress.value = parseFloat(window.globalVar.mapPinMain.style.left) + ', ' + parseFloat(window.globalVar.mapPinMain.style.top);

  });

  window.createPins = {
    removeMapPins: removeMapPins,
    renderMapPins: renderMapPins,
  };
}());


