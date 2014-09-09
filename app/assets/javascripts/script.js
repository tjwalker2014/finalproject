var myApp = myApp || {}

myApp.setUpEventListeners = function(){

  $('.front-card').on('click', function(){

    var target_id = $(this).data('target');

    var $target_div = $(target_id);

    if (!$target_div.hasClass('rotate')) {
      $target_div.addClass('rotate');
      $('.front-card').addClass('avoid-clicks');
    }

    $('.close-icon').on('click', function(){
      $target_div.removeClass('rotate');
      $('.front-card').removeClass('avoid-clicks');
    });
  });
};

$(document).ready(function(){
  myApp.setUpEventListeners();
});

(function() {

  var app = angular.module('finalAppApi', []);

  app.controller('appController' , ["$scope", "$http" ,function($scope, $http) {
        
    // $http.get("http://gdata.youtube.com/feeds/api/standardfeeds/most_popular?v=2&alt=json").success(function(data) {
    //     $scope.youtubedata = data;
    //     // console.log("youtube")
    //     console.log(data)
    // })

    // SC.oEmbed("https://soundcloud.com/selkiemusic/dancing-in-the-dark-springsteen-cover", function(oembed){
    //   // console.log("oEmbed response: ", oembed['html']);
    //   $('#track').append(oembed['html']);
    //   var widget = SC.Widget(document.querySelector('#track iframe'));

    //   // console.log(oembed);

    //   $('#song').click(function(){
    //     widget.toggle();
    //     widget.getCurrentSound(function(sound) {  
    //       $('#track-name').append(sound.title);
    //     });
    //   });

    //   $('#song-close').click(function(){
    //     widget.toggle();
    //   });

    //   $('#next').click(function(){
    //     widget.next();
    //   });

    // });
                                                   
    SC.initialize({
      client_id: "f2152c9cb7d7b6a1ab6cb2a93c90f8b7"
    });

    SC.get('/tracks', function(tracks) {
      console.log(tracks.length);

      // var arrayLength = tracks.length;
      tracks.forEach(function(element){
        console.log(element.id)
        console.log(element.title)
      });
      
      var random = Math.floor(Math.random() * 49);
      var track_url = tracks[random].permalink_url;
      // console.log(random, track_url);
    
      SC.oEmbed(track_url, function(oembed){
        console.log(oembed);
        $('#track').append(oembed['html']);
        var widget = SC.Widget(document.querySelector('#track iframe'));
        console.log(widget)
      });
      // ;
    });
  }]);
})();





