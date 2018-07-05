'use strict';

(function () {

  window.globalVar = {
    mapBlock: document.querySelector('.map'),
    form: document.querySelector('.ad-form'),
    fieldsetArray: Array.from(document.querySelectorAll('fieldset')),
    mapMarkTemp: document.querySelector('.temp').content,
    mapPinMain: document.querySelector('.map__pin--main'),
    formAdress: document.querySelector('#address'),
    KEY_ESCAPE: 'Escape',
    success: document.querySelector('.success'),
    allLoadedPins: [],
    filtredPins: [],
    marker: true,
    CUT_START: 5,
    CUT_QUANTITY: 10
  };

})();
