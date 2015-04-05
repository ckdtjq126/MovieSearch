var movie_id;

(function(){
  movie_id = window.location.search.substring(1).slice(0);
})();


$(document).ready(function(){
  if(movie_id === ''){
    indexPage();
  } else {
    getMovie(movie_id);
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

var getMovie = function(movie_id){
  var url = "https://www.themoviedb.org/search?query=";
  $.ajax({
    url: url,
    async: false,
    dataType: 'json',
    success: function(data){
      outputMovie(data);},
    error: function(data){
      pageNotFound();
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