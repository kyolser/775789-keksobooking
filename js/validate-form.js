'use strict';

(function () {

  var DEFAUTL_SELECTED_ROOM = '1';

  var RoomsCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var SelectTypePrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var SelectTypeBuilding = {
    bungalo: 'bungalo',
    flat: 'flat',
    house: 'house',
    palace: 'palace'
  };

  var selectType = window.globalVar.form.querySelector('#type');
  var inputPrice = window.globalVar.form.querySelector('#price');
  var selectTimeIn = window.globalVar.form.querySelector('#timein');
  var selectTimeOut = window.globalVar.form.querySelector('#timeout');
  var selectRoomNumber = window.globalVar.form.querySelector('#room_number');
  var selectCapacity = window.globalVar.form.querySelector('#capacity');
  var capacityOptions = selectCapacity.querySelectorAll('option');

  selectType.addEventListener('change', function () {
    switch (selectType.value) {
      case SelectTypeBuilding.bungalo :
        inputPrice.setAttribute('placeholder', SelectTypePrice.bungalo);
        inputPrice.setAttribute('min', SelectTypePrice.bungalo);
      case SelectTypeBuilding.flat :
        inputPrice.setAttribute('placeholder', SelectTypePrice.flat);
        inputPrice.setAttribute('min', SelectTypePrice.flat);
      case SelectTypeBuilding.house :
        inputPrice.setAttribute('placeholder', SelectTypePrice.house);
        inputPrice.setAttribute('min', SelectTypePrice.house);
      case SelectTypeBuilding.palace :
        inputPrice.setAttribute('placeholder', SelectTypePrice.palace);
        inputPrice.setAttribute('min', SelectTypePrice.palace);
    }
  });

  selectTimeIn.addEventListener('change', function () {
    selectTimeOut.value = selectTimeIn.value;
  });

  selectTimeOut.addEventListener('change', function () {
    selectTimeIn.value = selectTimeOut.value;
  });

  var setCapacity = function (selectedValue) {
    for (var i = 0; i < capacityOptions.length; i++) {
      capacityOptions[i].disabled = !RoomsCapacity[selectedValue].includes(capacityOptions[i].value);
    }
    if (selectCapacity.options[selectCapacity.selectedIndex].disabled) {
      selectCapacity.value = RoomsCapacity[selectedValue][0];
    }
  };

  var setCapacityHandler = function (evt) {
    setCapacity(evt.currentTarget.value);
  };

  selectRoomNumber.addEventListener('change', setCapacityHandler);
  setCapacity(DEFAUTL_SELECTED_ROOM);

}());
