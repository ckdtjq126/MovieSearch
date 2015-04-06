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
      pageNotFound();    
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