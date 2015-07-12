angular.module('starter.controllers',[])


.controller('MapCtrl', function($scope, $ionicLoading) {
	
	var geocoder;
var map;
var infowindow = new google.maps.InfoWindow();
var marker;

	 var service;
	
	 console.log("This is in Map Control");
  $scope.mapCreated = function(map) {
    $scope.map = map;
	
	
	
	
	service = new google.maps.places.PlacesService($scope.map);
	
	
	
	var mapOptions = {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13
  };
  var map = $scope.map;

  var input = /** @type {HTMLInputElement} */(
      document.getElementById('input'));

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', $scope.map);

  $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: $scope.map
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open($scope.map, marker);
  });

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    infowindow.close();
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    if (place.geometry.viewport) {
      $scope.map.fitBounds(place.geometry.viewport);
    } else {
      $scope.map.setCenter(place.geometry.location);
      $scope.map.setZoom(17);
    }

    // Set the position of the marker using the place ID and location
    marker.setPlace(/** @type {!google.maps.Place} */ ({
      placeId: place.place_id,
      location: place.geometry.location
    }));
    marker.setVisible(true);

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        'Place ID: ' + place.place_id + '<br>' +
        place.formatted_address);
		 window.localStorage['place.local'] = place.name;
    infowindow.open(map, marker);
  });
 
	
  google.maps.event.addDomListener(window, 'load', initialize);
	
	
	
	
	
  };
  
  var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initialise() {   
    var myLatlng = new google.maps.LatLng(17.8333,83.2000);
	 var latlng = new google.maps.LatLng(17.8333,83.2000);

	geocoder = new google.maps.Geocoder();

	 var mapOptions = {
           zoom: 8,
    center: latlng,
    mapTypeId: 'roadmap'

        };
}





  



  
 /* var place =new google.maps.places.getPlace(myLatlng);
 */
	
 // 
  
 
  
  

  
  $scope.centerOnMe = function () {
	  alert('This is in ccenterOnMe() function');
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
		var geocoder;
var map;
var infowindow = new google.maps.InfoWindow();
var marker;
      console.log('Got pos', pos);
	 alert('This is in geolocation');
	  console.log("This is in Map Control", pos);
	   var input = '17.8333,83.2000';
	   alert('This is in geolocation 1');
  var latlngStr = input.split(',', 2);
  var lat = parseFloat(latlngStr[0]);
  var lng = parseFloat(latlngStr[1]);
 

   alert('This is in geolocation 2');
  var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
  alert('This is in geolocation 3');
  
  marker = new google.maps.Marker({
            position: latlng,
            map: $scope.map
        });
		 alert('This is in geolocation 4');
		 $scope.loading.hide();
		  $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
		infowindow.setContent($scope.map.formatted_address);
        infowindow.open($scope.map, marker);
  
 
	  
	  
     
	//  var place1=service.getPlace();
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

