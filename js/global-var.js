'use strict';

(function () {

  window.globalVar = {
    KEY_ESCAPE: 'Escape',
    CUT_START: 5,
    CUT_QUANTITY: 10,
    mapBlock: document.querySelector('.map'),
    form: document.querySelector('.ad-form'),
    fieldsetArray: Array.from(document.querySelectorAll('fieldset')),
    mapMarkTemp: document.querySelector('.temp').content,
    mapPinMain: document.querySelector('.map__pin--main'),
    formAdress: document.querySelector('#address'),
    success: document.querySelector('.success'),
    allLoadedPins: [],
    filtredPins: [],
    marker: true
  };

})();
