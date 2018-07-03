'use strict';

(function () {

  var PriceTypes = {
    MIDDLE: 'middle',
    LOW: 'low',
    HIGH: 'high'
  };

  var filtresForm = document.querySelector('.map__filters');
  var housingTypeField = filtresForm.querySelector('#housing-type');
  var housingPriceField = filtresForm.querySelector('#housing-price');
  var housingRoomsField = filtresForm.querySelector('#housing-rooms');
  var housingGuestsField = filtresForm.querySelector('#housing-guests');
  var feauturesList = filtresForm.querySelectorAll('input[name="features"]');

  var compareFiltres = function (filterValue, compareValue) {
    return filterValue === 'any' || compareValue === filterValue;
  };

  var compareByPrice = function (filterValue, offerPrice) {
    switch (filterValue) {
      case PriceTypes.MIDDLE:
      return offerPrice >= 10000 && offerPrice < 50000;
      case PriceTypes.LOW:
      return offerPrice < 10000;
      case PriceTypes.HIGH:
      return offerPrice >= 50000;
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

/*    feauturesArr.forEach(function(feat){
      feat.addEventListener('focus', function(){
        feat.addEventListener('keydown', function(){
          if (evt.key == "Enter") {
          alert()
        }
      })
      })
    })*/

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

  var onFiltresFormChange = function () {
    window.createCards.mapCardRemove();
    window.createPins.removeMapPins();
    var filterPins = setFiltres();
    filterPins.splice(5, 10);
    window.createPins.renderMapPins(filterPins);
  };

  filtresForm.addEventListener('change', onFiltresFormChange);

})();
