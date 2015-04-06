var movie_id;

(function(){
  movie_id = window.location.search.substring(1).slice(0);
})();


$(document).ready(function(){
  if(movie_id === ''){
    indexPage();
  } else {
    renderMovie(movie_id);
    /*getMovie(movie_id);*/
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
  var url = "https://www.themoviedb.org/search?query="+movie_id;
  $.ajax({
    url: url,
    async: false,
    dataType: 'json',
    success: function(data){
      renderMovie(data);},
    error: function(data){
      pageNotFound();
    }
  });
};

var renderGist = function(movie_id){
  $.ajax({
    url = "https://www.themoviedb.org/search?query="+movie_id;
    dataType: 'html',
    success: function(response){
      var view, template, html;
      $('#moviesearch').html('');
      template = response;
      html = Mustache.to_html(response, movie_id);
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