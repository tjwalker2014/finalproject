var myApp = myApp || {}

myApp.setUpEventListeners = function(){

  $('.front-card').on('click', function(){
    
    var $div_to_rotate = $($(this).data('rotate'));
    var $div_to_show = $($(this).data('show'));

    if (!$div_to_rotate.hasClass('rotate')) {
      $div_to_rotate.addClass('rotate', function () {
        console.log('hello')
      });
      setTimeout(function() {$div_to_rotate.children('.reverse-card').addClass('rounded')}, 500);
      $('.front-card').addClass('avoid-clicks');
      $div_to_show.addClass('show-div');
    }

    $('.close-icon').on('click', function(){
      $div_to_rotate.removeClass('rotate');
      $div_to_rotate.children('.reverse-card').removeClass('rounded');
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
    
    // Event listener for submit of form with certain id
    // Prevent default
    // Post form data to url of form action
    // Get data back
    // Check if someone is logged in

    $.ajax({
      url: '/',
      dataType: 'json',
      method: 'GET'
    }).success(function(userdata){
      $scope.user = userdata
    })

    SC.initialize({
      client_id: "f2152c9cb7d7b6a1ab6cb2a93c90f8b7"
    });

    SC.get('https://api.soundcloud.com/playlists/50868471/tracks', function(tracks) {
      // console.log(tracks)
      $scope.random = Math.floor(Math.random() * 49);
      $scope.track = tracks[$scope.random]
      $scope.track_author = $scope.track.user.username
      $scope.track_title = $scope.track.title
      $scope.track_url = $scope.track.permalink_url

      $scope.initialsoundcloudEmbed = function() {
        SC.oEmbed($scope.track_url, { show_comments: false, width: "100%" }, function(oembed){
          $('#soundcloud-div').empty();
          $('#soundcloud-div').append(oembed['html']);
          widget = SC.Widget(document.querySelector('#soundcloud-div iframe'));
        });
      }

      $scope.initialsoundcloudEmbed();

      $scope.soundcloudEmbed = function() {
        SC.oEmbed($scope.track_url, { auto_play: true, show_comments: false, width: "100%" }, function(oembed){
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
        $scope.track_author = $scope.track.user.username
        $scope.track_title = $scope.track.title
        $scope.track_url = $scope.track.permalink_url
        $scope.soundcloudEmbed();
      }

    });

    $scope.selectedTrackEmbed = function(track_url) {
      console.log(track_url)    
      SC.oEmbed(track_url, { auto_play: true, show_comments: false, width: "100%" }, function(oembed){
        $('#soundcloud-div').empty();
        $('#soundcloud-div').append(oembed['html']);
        widget = SC.Widget(document.querySelector('#soundcloud-div iframe'));
      });
    }

    $scope.favouriteThisTrack = function () {
      $http.post('/contents.json', {user_id: $scope.user.id, content: {author: $scope.track_author, title: $scope.track_title, url: $scope.track_url, type: "Song"}})
    }

    $http.get('/qotd').success(function(quotedata){
      $scope.quote_author = quotedata.quote.author
      $scope.quote_title = quotedata.quote.body
      $scope.quote_url = quotedata.quote.url 
      $('#thought-div').empty(); 
      $('#thought-div').append('<p>'+$scope.quote_title+'</p>'+'<br>'+'<p>'+$scope.quote_author+'</p>');
    });

    $scope.favouriteThisThought = function () {
      $http.post('/contents.json', {user_id: $scope.user.id, content: {author: $scope.quote_author, title: $scope.quote_title, url: $scope.quote_url, type: "Thought"}})
    }

    $scope.selectedThoughtEmbed = function(quote, author) {
    console.log(quote, author)    
      $('#thought-div').empty();
      $('#thought-div').append('<p>'+quote+'</p>'+'<br>'+'<p>'+author+'</p');
    }

    $http.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLrEnWoR732-BHrPp_Pm8_VleD68f9s14-&key=AIzaSyDQmmKpH46uJCcpUMHUsYs_X6hWyboLZck').success(function(videos) {
      $scope.random = Math.floor(Math.random() * 49);
      $scope.video = videos.items[$scope.random]
      $scope.video_author = $scope.video.snippet.channelTitle
      $scope.video_title = $scope.video.snippet.title
      $scope.video_url = $scope.video.snippet.resourceId.videoId

      $scope.youtubeEmbed = function() {
        $('#youtube-div').empty();
        $('#youtube-div').append('<iframe width="640" height="390" src="//www.youtube.com/embed/'+$scope.video_url+'?rel=0" frameborder="0" allowfullscreen></iframe>');
      }

      $scope.youtubeEmbed();

      $scope.nextVideo = function() { 
        $scope.random = Math.floor(Math.random() * 49);
        $scope.video = videos.items[$scope.random]
        $scope.video_author = $scope.video.snippet.channelTitle
        $scope.video_title = $scope.video.snippet.title
        $scope.video_url = $scope.video.snippet.resourceId.videoId
        $scope.youtubeEmbed();
      }
    });

    $scope.favouriteThisVideo = function () {
      $http.post('/contents.json', {user_id: $scope.user.id, content: {author: $scope.video_author, title: $scope.video_title, url: $scope.video_url, type: "Video"}})
    }

    $scope.selectedVideoEmbed = function(video_id) {    
      $('#youtube-div').empty();
      $('#youtube-div').append('<iframe width="640" height="390" src="//www.youtube.com/embed/'+video_id+'?rel=0" frameborder="0" allowfullscreen></iframe>');
    }

    //$http.get('http://api.giphy.com/v1/gifs/search?q=minions&api_key=dc6zaTOxFJmzC').success(function(minions) {
      // console.log(minions.data[1].id)
      // $scope.random = Math.floor(Math.random() * 24);
      // $scope.minion = minions.data[$scope.random]
      // $scope.minion_title = ('randomgif')
      // $scope.minion_url = $scope.minion.id

      // $scope.minionEmbed = function() {
      //   $('#joke-div').empty();
      //   $('#joke-div').append('<img src="http://www.giphy.com/embed/'+$scope.minion_url'">');
      //   // $('#joke-div').append('<p>'+$scope.minion_url+'</p>');
      // }

      //$scope.minionEmbed();

      // $scope.nextMinion = function() { 
      // code
    //});

    $.ajax({
      url: "http://dynamic.xkcd.com/api-0/jsonp/comic?callback=?",
      dataType: "json",
      jsonpCallback: "xkcddata",
      success: function(data) {
        // console.log(data)
        // $("#xkcdcontent").append(
        //   $("<h1/>").text(data.title),
        //   $("<img/>").attr({
        //       src: data.img,
        //       title: data.alt,
        //       alt: data.title
        //   })
        // );
      }
    });
  }]);
})();

