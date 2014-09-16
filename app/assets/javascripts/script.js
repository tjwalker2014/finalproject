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

    // debugger

    $('.close-icon').on('click', function(){
      $div_to_rotate.removeClass('rotate');
      $('.front-card').removeClass('avoid-clicks');
      $div_to_show.removeClass('show-div'); 
    });
  });

  $('.linkpara').on('click', function(){
    $div_to_rotate = $($(this).data('rotate'));
    $div_to_show = $($(this).data('show'));
    $('#nine').removeClass('rotate');
    $('.front-card').removeClass('avoid-clicks');
    $('#center-content-div').removeClass('show-div');
    $div_to_rotate.addClass('rotate');
    $('.front-card').addClass('avoid-clicks');
    $div_to_show.addClass('show-div');
  });

  $('.close-icon').on('click', function(){
    $div_to_rotate = $($(this).data('rotate'));
    $div_to_show = $($(this).data('show'));
    $div_to_rotate.removeClass('rotate');
    $('.front-card').removeClass('avoid-clicks');
    $div_to_show.removeClass('show-div'); 
  });
};

$(document).ready(function(){
  myApp.setUpEventListeners();
});

(function() {

  var app = angular.module('finalAppApi', []);

  app.controller('appController' , ["$scope", "$http" ,function($scope, $http) {
        
    $.ajax({
      url: '/',
      dataType: 'json',
      method: 'GET'
    }).success(function(data){
      console.log(data);
      $scope.user = data
    })

    SC.initialize({
      client_id: "f2152c9cb7d7b6a1ab6cb2a93c90f8b7"
    });

    SC.get('https://api.soundcloud.com/playlists/50868471/tracks', function(tracks) {
      
      $scope.random = Math.floor(Math.random() * 49);
      $scope.track = tracks[$scope.random]
      $scope.track_title = $scope.track.title
      $scope.track_url = $scope.track.permalink_url

      $scope.soundcloudEmbed = function() {
        SC.oEmbed($scope.track_url, { show_comments: false, width: "100%" }, function(oembed){
          $('#soundcloud-div').empty();
          $('#soundcloud-div').append(oembed['html']);
          //test = (oembed['html']) // save this as an angular variable so other functions have access to it
          widget = SC.Widget(document.querySelector('#soundcloud-div iframe'));
        });
      }

      $scope.soundcloudEmbed();

      $scope.selectedtrackEmbed = function(track_url) {
        console.log(track_url)    
        SC.oEmbed(track_url, { show_comments: false, width: "100%" }, function(oembed){
          $('#soundcloud-div').empty();
          $('#soundcloud-div').append(oembed['html']);
          widget = SC.Widget(document.querySelector('#soundcloud-div iframe'));
        });
      }
      
      $scope.playTrack = function() {     
        widget.play();
      }         

      $scope.pauseTrack = function() {   
        widget.pause();
      }

      // .load method described in soundcloud docs reloads widget with new song but at smaller size, hence repeated code below  

      $scope.nextTrack = function() { 
        $scope.random = Math.floor(Math.random() * 49);
        $scope.track = tracks[$scope.random]
        $scope.track_title = $scope.track.title
        $scope.track_url = $scope.track.permalink_url
        $scope.soundcloudEmbed();
      }

    });

    $scope.favouriteThis = function () {
      $http.post('/contents.json', {user_id: $scope.user.id, content: {title: $scope.track_title, url: $scope.track_url, type: "Song"}})
    }         
  }]);
})();





