$(function () {

  let initApplication = function () {
    $('.messages-and-users').css({ display: 'flex' });
    $('.controls').css({ display: 'flex' });
    //инициализировать поддгрузку списка пользователей и списка сообщений
    $('.send-message').on('click', function () {
      //готовим сообщение
      let message = $('.new-message').val();
      //при нажатии на кнопку будем отправлять ссобщения
      alert(message);
      $.post('/message', { message: message }, function (response) {
        if (response.result == true) {
          //значит сообщение переданно, очищаем текстовое поле
          $('.new-message').val('');
        } else {//если ошибка
          alert("Ошибка повторите попытку позже.");
        }
      })
    });
  };

  let registerUser = function (name) {
    $.post('/auth', { name: name }, function (response) {
      if (response.result) {
        initApplication();
      }
    });
  };

  //как только входим в приложение сразу вызываем GET запрос init
  //и дальше проверка авторизации
  $.get('/init', {}, function (response) {
    //alert(response.result);
    if (!response.result) {
      let name = prompt('Введите ваше имя:');
      registerUser(name);
      return;
    }
    initApplication();
  });

});