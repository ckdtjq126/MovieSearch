var movie_id;
var key= 'd957d3eec5eeec21e215b88e2b4f9964';
var baseURL = 'http://api.themoviedb.org/3/search/movie';
var searchURL = 'http://api.themoviedb.org/3/movie/';
var apiURL = '?api_key=' + key;
var queryURL = '&query=';
var finalURL = baseURL + apiURL + queryURL;


(function(){
  movie_id = window.location.search.substring(1).slice(0);
})();


$(document).ready(function(){
  if(movie_id === ''){
    indexPage();
  } else {
    checkError();
  }
});

var checkError = function(){
  var checkURL = finalURL + encodeURI(movie_id);
  $.ajax({
    url: checkURL,
    async: false,
    dataType: 'json',
    success: function(data){
      if(data.total_results === 0) {
        errorPage();
      } else {
        renderMovie(data);
      }
    },
    error: function(data){
      errorPage();
    }
  });
};

var indexPage = function(){
  $.ajax({
    url: 'views/index.html',
    dataType: 'html',
    success : function(data){
      $('#moviesearch').html(data);
    }
  });
};

var renderMovie = function(data){
  $.ajax({
    url = 'views/show.html',
    dataType: 'html',
    success: function(response){
      var template, html;
      $('#moviesearch').html('');
      template = response;
      html = Mustache.to_html(response, data);
      $('#moviesearch').append($(html));

      $('.choose').click(function(){
        var id = $(this).children().attr('alt');
        var idIndex = id.indexOf(':');
        id = id.substring(0,idIndex);
        getMovie(id);
      });
    }
  });
};

var getMovie = function(movie_id){
  var resultURL = searchURL + movie_id + apiURL;
  $.ajax({
    url: url,
    async: false,
    dataType: 'json',
    success: function(data){
      detail(data);
    },
    error: function(data){
      pageNotFound();
    }
  });
};

var detail = function(data){
  $.ajax({
    url: 'views/detail.html',
    dataType: 'html',
    success : function(res){
      var template, html;
      $('#moviesearch').html('');
      template = res;
      html = Mustache.to_html(res, data);
      $('#moviesearch').append($(html));
    }
  });
};


var pageNotFound = function(){
  $.ajax({
    url: 'views/error.html',
    dataType: 'html',
    success : function(data){
      var template = data;
      $('#moviesearch').html(data);
    }
  });
};