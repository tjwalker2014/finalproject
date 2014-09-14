var myApp = myApp || {}

myApp.setUpEventListeners = function(){

  $('.front-card').on('click', function(){
    
    var $div_to_rotate = $($(this).data('rotate'));
    var $div_to_show = $($(this).data('show'));

    if (!$div_to_rotate.hasClass('rotate')) {
      $div_to_rotate.addClass('rotate');
      $('.front-card').addClass('avoid-clicks');
      $div_to_show.addClass('show-div');
    }

    $('.close-icon').on('click', function(){
      $div_to_rotate.removeClass('rotate');
      $('.front-card').removeClass('avoid-clicks');
      $div_to_show.removeClass('show-div');
    });
  });

};

$(document).ready(function(){
  myApp.setUpEventListeners();
});

(function() {

  var app = angular.module('finalAppApi', []);

  app.controller('appController' , ["$scope", "$http" ,function($scope, $http) {
        
    //$scope.newSoundcloudTrack = function() {

      SC.initialize({
        client_id: "f2152c9cb7d7b6a1ab6cb2a93c90f8b7"
      });

      SC.get('https://api.soundcloud.com/playlists/50868471/tracks', function(tracks) {
        //console.log(tracks);

        // var arrayLength = tracks.length;
        // tracks.forEach(function(element){
          // console.log(element.id)
          // console.log(element.title)
          // console.log(element)
        // });
        
        var random = Math.floor(Math.random() * 49);
        var track_url = tracks[random].permalink_url;
        //console.log(random, track_url);
      
        SC.oEmbed(track_url, { show_comments: false, width: "100%" }, function(oembed){
          $('#soundcloud-div').empty();
          $('#soundcloud-div').append(oembed['html']);
          //test = (oembed['html']) // save this as an angular variable so other functions have access to it
          widget = SC.Widget(document.querySelector('#soundcloud-div iframe'));
        });

        $scope.playTrack = function() {     
          widget.toggle();
        }         

        $scope.pauseTrack = function() {   
          widget.pause();
        }

        // .load method described in soundcloud docs reloads widget with new song but at smaller size, hence repeated code below  

        $scope.nextTrack = function() { 
          var random = Math.floor(Math.random() * 49);
          var track_url = tracks[random].permalink_url;
          SC.oEmbed(track_url, { auto_play: true, show_comments: false, width: "100%" }, function(oembed){
            $('#soundcloud-div').empty();
            $('#soundcloud-div').append(oembed['html']);
          });
        }

      });

      $scope.favouriteThis = function () {
        $http.post('/contents.json', {tom: "test"})
      }       
    //}  
  }]);
})();





