$(function () {

  let initApplication = function () { 
    $('.messages-and-users').css({display: 'flex'});
    $('.controls').css({display: 'flex'});
    //инициализировать поддгрузку списка пользователей и списка сообщений
  };

  let registerUser = function (name) {
      $.post('/auth', {name: name}, function(response){
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