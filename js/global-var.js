'use strict';

(function () {

  window.globalVar = {
    mapBlock: document.querySelector('.map'),
    form: document.querySelector('.ad-form'),
    fieldsetNodeList: document.querySelectorAll('fieldset'),
    mapMarkTemp: document.querySelector('.temp').content,
    mapPinMain: document.querySelector('.map__pin--main'),
    formAdress: document.querySelector('#address'),
    KEY_ESCAPE : 'Escape',
    success : document.querySelector('.success'),
    allLoadedPins: [],
    filtredPins: []
  };

})();
