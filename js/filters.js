'use strict';

(function () {

  var PriceTypes = {
    MIDDLE: 'middle',
    LOW: 'low',
    HIGH: 'high'
  };

  var PriceValue = {
    priceOne: 10000,
    priceTwo: 50000
  };

  var ANY = 'any';

  var filtresForm = document.querySelector('.map__filters');
  var housingTypeField = filtresForm.querySelector('#housing-type');
  var housingPriceField = filtresForm.querySelector('#housing-price');
  var housingRoomsField = filtresForm.querySelector('#housing-rooms');
  var housingGuestsField = filtresForm.querySelector('#housing-guests');
  var feauturesList = filtresForm.querySelectorAll('input[name="features"]');

  var compareFiltres = function (filterValue, compareValue) {
    return filterValue === ANY || compareValue === filterValue;
  };

  var compareByPrice = function (filterValue, offerPrice) {
    switch (filterValue) {
      case PriceTypes.MIDDLE:
        return offerPrice >= PriceValue.priceOne && offerPrice < PriceValue.priceTwo;
      case PriceTypes.LOW:
        return offerPrice < PriceValue.priceOne;
      case PriceTypes.HIGH:
        return offerPrice >= PriceValue.priceTwo;
      default:
        return true;
    }
  };

  var compareByFeatures = function (filteredFetures, comparedValues) {
    for (var i = 0; i < filteredFetures.length; i++) {
      if (!comparedValues.includes(filteredFetures[i])) {
        return false;
      }
    }
    return true;
  };

  var setFiltres = function () {
    var feauturesArr = Array.from(feauturesList);
    var selectedFeautures = feauturesArr.filter(function (it) {
      return it.checked;
    }).map(function (it) {
      return it.value;
    });

    return window.globalVar.allLoadedPins.filter(function (it) {

      if (!compareFiltres(housingTypeField.value, it.offer.type)) {
        return false;
      }

      if (!compareFiltres(housingRoomsField.value, it.offer.rooms.toString())) {
        return false;
      }

      if (!compareFiltres(housingGuestsField.value, it.offer.guests.toString())) {
        return false;
      }

      if (!compareByPrice(housingPriceField.value, it.offer.price)) {
        return false;
      }

      if (!compareByFeatures(selectedFeautures, it.offer.features)) {
        return false;
      }

      return true;
    });
  };

  var FiltresFormChangeHandler = window.debounce(function () {
    window.createCards.mapCardRemove();
    window.createPins.removeMapPins();
    var filterPins = setFiltres();
    filterPins.splice(window.globalVar.CUT_START, window.globalVar.CUT_QUANTITY);
    window.createPins.renderMapPins(filterPins);
  });

  filtresForm.addEventListener('change', FiltresFormChangeHandler);

})();
