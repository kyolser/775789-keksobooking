'use strict';

var closeCard = function () {

  var KEY_ESCAPE = 'Escape';

  var mapCardRemove = function () {
    var mapCard = document.querySelector('.map__card');
    mapCard.parentNode.removeChild(mapCard);
  };

  var documentKeydownHandler = function (evt) {
    if (evt.key === KEY_ESCAPE) {
      mapCardRemove();
      document.removeEventListener('keydown', documentKeydownHandler);
    }
  };

  var cross = document.querySelector('.popup__close');
  cross.addEventListener('click', mapCardRemove);
  document.addEventListener('keydown', documentKeydownHandler);

};
