'use strict';

(function () {

  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var URL_DOWNLOAD = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT = 10000;

  var HTTPResponseCodes = {
    NOT_FOUND: 404,
    SUCCESS: 200,
    SERVER_ERROR: 500
  };

  var createXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case HTTPResponseCodes.SUCCESS:
          onLoad(xhr.response);
          break;
        case HTTPResponseCodes.NOT_FOUND:
          onError('Ресурс не найден');
          break;
        case HTTPResponseCodes.SERVER_ERROR:
          onError('Ошибка на стороне сервера.');
          break;
        default:
          onError('Неизвестный код ошибки: ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за 10 секунд.');
    });

    return xhr;
  };

  var downloadData = function (onLoad, onError) {
    var xhr = createXHR(onLoad, onError);
    xhr.open('GET', URL_DOWNLOAD);
    xhr.send();
  };

  var uploadData = function (data, onLoad, onError) {
    var xhr = createXHR(onLoad, onError);
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    downloadData: downloadData,
    uploadData: uploadData
  };

})();
