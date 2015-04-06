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
      checkURL();    
  }
});

var indexPage = function(){
  $.ajax({
    url: 'views/index.html',
    dataType: 'html',
    success : function(data){
      var template = data;
      $('#moviesearch').html(data);
    }
  });
};

var checkURL = function(){
  var resultURL = finalURL + encodeURI(movie_id);
  $.ajax({
    url: resultURL,
    async: false,
    dataType: 'json',
    success: function(data){
      if(data.total_results === 0) {
        pageNotFound();
      } else {
        showResult(data);
      }
    },
    error: function(data){
      pageNotFound();
    }

  });
};

var count = 0;
var showResult = function(data){
  $.ajax({
    url: 'views/show.html',
    dataType: 'html',
    success: function(res){
      if(count <= 4){
        var template, html;
        $('#moviesearch').html('');
        template = res;
        html = Mustache.to_html(res, data);
        $('#moviesearch').append($(html));
        count++;
      }

      $('.choose').click(function(){
        var id = $(this).children().attr('alt');
        var idIndex = id.indexOf(':');
        id = id.substring(0,idIndex);
        getMovieInfo(id);
      });
    }
  });
};

var getMovieInfo = function(movie_id){
  var resultURL = searchURL + movie_id + apiURL;
  $.ajax({
    url: resultURL,
    async: false,
    dataType: 'json',
    success: function(data){
      showDetail(data);
    },
    error: function(data){
      pageNotFound();
    }
  });
};

var showDetail = function(data){
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