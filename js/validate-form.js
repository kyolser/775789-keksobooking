'use strict';

(function () {

  var DEFAUTL_SELECTED_ROOM = '1';

  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var SELECT_TYPE_PRICE = {
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
      inputPrice.setAttribute('placeholder', SELECT_TYPE_PRICE.bungalo);
      inputPrice.setAttribute('min', SELECT_TYPE_PRICE.bungalo);
    } else if (selectType.value === 'flat') {
      inputPrice.setAttribute('placeholder', SELECT_TYPE_PRICE.flat);
      inputPrice.setAttribute('min', SELECT_TYPE_PRICE.flat);
    } else if (selectType.value === 'house') {
      inputPrice.setAttribute('placeholder', SELECT_TYPE_PRICE.house);
      inputPrice.setAttribute('min', SELECT_TYPE_PRICE.house);
    } else if (selectType.value === 'palace') {
      inputPrice.setAttribute('placeholder', SELECT_TYPE_PRICE.palace);
      inputPrice.setAttribute('min', SELECT_TYPE_PRICE.palace);
    }
  });

  selectTimeIn.addEventListener('change', function () {
    selectTimeOut.value = selectTimeIn.value;
  });

  selectTimeOut.addEventListener('change', function () {
    selectTimeIn.value = selectTimeOut.value;
  });

  var setCapacity = function (selectedValue) {


    capacityOptions.forEach(function(option){
      option.disabled = !ROOMS_CAPACITY[selectedValue].includes(option.value);
    })

    if (selectCapacity.options[selectCapacity.selectedIndex].disabled) {
      selectCapacity.value = ROOMS_CAPACITY[selectedValue][0];
    }
  };

  var setCapacityHandler = function (evt) {
    setCapacity(evt.currentTarget.value);
  };

  selectRoomNumber.addEventListener('change', setCapacityHandler);
  setCapacity(DEFAUTL_SELECTED_ROOM);

}());
