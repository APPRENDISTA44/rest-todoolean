$(document).ready(function () {
  var url = "http://157.230.17.132:3015/todos/";

  stampaLista(url);


  //al click del bottone aggiungo elemento
  $(document).on('click','#add',
  function () {
    var testo = $('#text').val();
    if (testo.trim() != '') {
      aggiungiElemento(url,testo);

      testo = '';
    }
});
$(document).on('click','.elimina',
function () {
  var thisId = $(this).parent().attr('data-id');
  $.ajax({
    method: "DELETE",
    url: url + thisId,
    success : function (data) {
      stampaLista(url);
    },
    error : function() {
        errore("Si è verificato un errore");
    }
  });
});


//FUNZIONI
function stampaLista(url) {
  $('#todo_list').html('');
  $.ajax({
    method: "GET",
    url: url,
    success : function (data) {
      if (data.length > 0) {
        var source = $('#item_template').html();
        var template = Handlebars.compile(source);
        for (var i = 0; i < data.length; i++) {
          console.log(data);
          var thisTodo = data[i];
          console.log(thisTodo);
          var html = template(thisTodo);
          $('#todo_list').append(html);
        }
      }
    },
    error : function() {
        errore("Si è verificato un errore");
    }
  });
}


function aggiungiElemento(url,text) {
  $.ajax({
    method: "POST",
    url: url,
    data : {
      "text" : text
    },
    success: function (data) {
      stampaLista(url);
    },
    error : function() {
        errore("Si è verificato un errore");
    }
  });
}

});
