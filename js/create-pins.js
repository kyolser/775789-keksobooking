'use strict';

(function () {

  var mapPins = mapBlock.querySelector('.map__pins');

  window.renderMapPins = function (adsObjects) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adsObjects.length; i++) {
      var pin = mapMarkTemp.querySelector('.map__pin').cloneNode(true);
      pin.style.left = adsObjects[i].location.x + 'px';
      pin.style.top = adsObjects[i].location.y + 'px';
      pin.querySelector('img').src = adsObjects[i].author.avatar;
      pin.addEventListener('click', pinClickHandler.bind(undefined, adsObjects[i]));
      fragment.appendChild(pin);
    }
    mapPins.appendChild(fragment);
  };

}());
