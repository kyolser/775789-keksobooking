'use strict';

(function () {

  var DEFAUTL_SELECTED_ROOM = '1';

  var RoomsCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var selectTypePrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var selectType = window.globalVar.form.querySelector('#type');
  var inputPrice = window.globalVar.form.querySelector('#price');
  var selectTimeIn = window.globalVar.form.querySelector('#timein');
  var selectTimeOut = window.globalVar.form.querySelector('#timeout');
  var selectRoomNumber = window.globalVar.form.querySelector('#room_number');
  var selectCapacity = window.globalVar.form.querySelector('#capacity');
  var capacityOptions = selectCapacity.querySelectorAll('option');

  selectType.addEventListener('change', function () {
    if (selectType.value === 'bungalo') {
      inputPrice.setAttribute('placeholder', selectTypePrice.bungalo);
      inputPrice.setAttribute('min', selectTypePrice.bungalo);
    } else if (selectType.value === 'flat') {
      inputPrice.setAttribute('placeholder', selectTypePrice.flat);
      inputPrice.setAttribute('min', selectTypePrice.flat);
    } else if (selectType.value === 'house') {
      inputPrice.setAttribute('placeholder', selectTypePrice.house);
      inputPrice.setAttribute('min', selectTypePrice.house);
    } else if (selectType.value === 'palace') {
      inputPrice.setAttribute('placeholder', selectTypePrice.palace);
      inputPrice.setAttribute('min', selectTypePrice.palace);
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
