angular.module('starter.controllers',[])


.controller('MapCtrl', function($scope, $ionicLoading) {
	
	 console.log("This is in Map Control");
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };
  
  var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initialise() {   
    var myLatlng = new google.maps.LatLng(17.8333,83.2000);
	
	directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
        zoom: 14, 
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP, 
      }
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
	directionsDisplay.setMap(map);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
    });
    $scope.map = map;    
  }
  

   /*
   var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  var request = {
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
  };
   service.getDetails(request, function(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
		window.localStorage['place.name.local'] = place.name;
        infowindow.open(map, this);
      });
    }
  });
 
  function calcRoute() {
  var start = document.getElementById("start").value;
  var end = document.getElementById("end").value;
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
  }
  */
  google.maps.event.addDomListener(window, 'load', initialise);
  
  

  
  $scope.centerOnMe = function () {
    console.log("Centering");
	
    if (!$scope.map) {
		alert('This is in MapCTRL  Error Occured');
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: true
    });

	
	
	
	
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
	 
	  console.log("This is in Map Control", pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
	  
    $scope.loading.hide();
	window.localStorage['pos.coords.latitude.local'] = pos.coords.latitude;
	window.localStorage['pos.coords.longitude.local'] = pos.coords.longitude;
	
	$scope.pos.coords.latitude.local=pos.coords.latitude;
	   $scope.pos.coords.longitude.local=pos.coords.longitude;
    }, function (error) {
     
    });
  };
})


.controller('AppCtrl', function($scope, $ionicModal, $timeout,loginsFactory) {
  // Form data for the login modal
  $scope.loginData = {};
$scope.logins = [];
  $scope.isEditable = [];
  $scope.passwords = [];
  $scope.isLogin=false;
  // Create the login modal that we will use later
 $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
 $scope.logout = function() {
	 
    $scope.isLogin=false;
  };
  // Perform the login action when the user submits the login form
  $scope.save = function($event) {
	 console.log('Doing login', $scope.loginData);
	 alert($scope.loginData.username);
	 
'use strict';
 /*var express = require('express');
  var router = express.Router();
  var mongojs = require('mongojs');
  var db =mongojs('mongodb://sudhakar:umasan57@ds047792.mongolab.com:47792/cityoffers', ['logins']); 
  
  db.logins.insert({'login': $scope.loginusername,'isCompleted': false,'password':$scope.loginpassword});*/
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system var name = window.localStorage['name'] || 'you';
	var lat=window.localStorage['pos.coords.latitude.local'] ;
	var lon=window.localStorage['pos.coords.longitude.local'] ;
	var place=window.localStorage['place.local'] ;
	console.log("This is save");
	  alert(''+lat+'& Place is:'+place);
	  
     loginsFactory.saveLogin({
        "login": $scope.loginData.username,
        "isAdmin": false,
		"password":$scope.loginData.password,
		"coordslatitude":''+lat,
		"coordslongitudes":''+lon,
		"area":''+place
      }).then(function(data) {
		  $scope.isLogin=true;
        $scope.logins.set(data.data);
      });
    $scope.loginusername=$scope.loginData.username;
	$scope.closeLogin();
    
  };
})

.controller('DashCtrl', function($scope, $rootScope, $ionicUser, $ionicPush) {
  // Identifies a user with the Ionic User service
  $scope.identifyUser = function() {
    console.log('Ionic User: Identifying with Ionic User service');

    var user = $ionicUser.get();
    if(!user.user_id) {
      // Set your user_id here, or generate a random one.
      user.user_id = $ionicUser.generateGUID();
    };

    // Add some metadata to your user object.
    angular.extend(user, {
      name: 'Ionitron',
      bio: 'I come from planet Ion'
    });

    // Identify your user with the Ionic User Service
    $ionicUser.identify(user).then(function(){
      $scope.identified = true;
      alert('Identified user ' + user.name + '\n ID ' + user.user_id);
    });
  };
})  


.controller('DashCtrl', function($scope, $rootScope, $ionicUser, $ionicPush) {
  
  // Identifies a user with the Ionic User service
  $scope.identifyUser = function() {
    // Your identify code from before
  };
  
  // Registers a device for push notifications and stores its token
  $scope.pushRegister = function() {
    console.log('Ionic Push: Registering user');

    // Register with the Ionic Push service.  All parameters are optional.
    $ionicPush.register({
      canShowAlert: true, //Can pushes show an alert on your screen?
      canSetBadge: true, //Can pushes update app icon badges?
      canPlaySound: true, //Can notifications play a sound?
      canRunActionsOnWake: true, //Can run actions outside the app,
      onNotification: function(notification) {
        // Handle new push notifications here
        // console.log(notification);
        return true;
      }
    });
  };
})





.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});

