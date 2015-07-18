angular.module('starter.controllers',[])


.controller('MapCtrl', function($scope, $ionicLoading,merchantRegisterFactory, $http) {
	
	
	 navigator.geolocation.getCurrentPosition(function (pos) {
		
var map;
var infowindow = new google.maps.InfoWindow();
var marker;

      console.log('Got pos', pos);
	// alert('This is in geolocation');
	  console.log("This is in Map Control", pos);
	  
	//   alert('This is in geolocation 1');
  
 //  alert('This is in geolocation 2'+pos);
  var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
 // alert('This is in geolocation 3');
   var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        $scope.map.setZoom(16);
        marker = new google.maps.Marker({
            position: latlng,
            map: $scope.map
        });
		 google.maps.event.addListener(marker, 'click', function() {
    infowindow.open($scope.map, marker);
  });
		//  alert('This is in geolocation 5  :'+results[1].formatted_address);
	//	var t=$scope.map.PlaceResult.name;
		
		
		if (!results[1].geometry) {
      return;
    }

    if (results[1].geometry.viewport) {
      $scope.map.fitBounds(results[1].geometry.viewport);
    } else {
      $scope.map.setCenter(results[1].geometry.location);
      $scope.map.setZoom(16);
    }

    // Set the position of the marker using the place ID and location
    marker.setPlace(/** @type {!google.maps.Place} */ ({
		//name:results[1].name,
      placeId: results[1].place_id,
      location: results[1].geometry.location
    }));
    marker.setVisible(true);
var input1 = results[1].formatted_address;
var t3= results[1].address_components;
var t5=t3[1].short_name;
  var latlngStr = input1.split(',', 4);
  var t1 =latlngStr[0];
  
      //infowindow.setContent(results[1].formatted_address);
		infowindow.setContent('<div><strong> Area: ' + t1 + '<br> City: '+t5+'</strong><br>' +'Place ID: ' + results[1].place_id + '<br>' +results[1].formatted_address+'');
        infowindow.open($scope.map, marker);
		 window.localStorage['place.area.local'] = ''+t1;
		  window.localStorage['place.city.local'] = ''+t5;
		   window.localStorage['area.register.local'] = ''+t1;
		  window.localStorage['city.register.local'] = ''+t5;
		  $scope.arearegister=t1;
		$scope.cityregister=t5;
		  $scope.loginData.area = ''+t1;
		  $scope.loginData.city = ''+t5;
      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });
  
  
 
  
  
  

		// alert('This is in geolocation 4');
		// $ionicLoading.hide();
		$ionicLoading.hide();
	window.localStorage['pos.coords.latitude.local'] = pos.coords.latitude;
	window.localStorage['pos.coords.longitude.local'] = pos.coords.longitude;

	$ionicLoading.hide();
	  }, function (error) {
     
    })

	
	
	$scope.registermerchant=function($event){
		 console.log("This is in Map Control registermerchant");
	
	 var now = new Date();
  
        var headers = {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
		
		
		return $http({
            method: "POST",
            headers: headers,
      url: 'http://104.155.192.54:8080/api/merchantlogins',
            data: {
        "loginid": $scope.loginData.userid,
        "isActive": true,
		"password":$scope.loginData.pass,
		"companyname":$scope.loginData.compname,
		"area":$scope.loginData.area,
		"city":$scope.loginData.city,
		"email":$scope.loginData.email,
		"contact1":$scope.loginData.contact1,
		"contact2":$scope.loginData.contact2
      }
    }).success(function(data) {
                console.log("Recoded sucessfully in merchant login success!")
				  
        $scope.logins.push(data.data);
		
	

                console.log(data);
    }).error(function(data, status, headers, config) {
                console.log("Auth.signin.error!")
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
    });
	
	
	
	
	
	
	
	
		 merchantRegisterFactory.saveLogin({
        "loginid": $scope.loginData.userid,
        "isActive": true,
		"password":$scope.loginData.pass,
		"companyname":$scope.loginData.compname,
		"area":$scope.loginData.area,
		"city":$scope.loginData.city,
		"email":$scope.loginData.email,
		"contact1":$scope.loginData.contact1,
		"contact2":$scope.loginData.contact2
      }).then(function(data) {
		  
        $scope.logins.push(data.data);
      });
		
		alert('Registered Sucessfully');
		
		
		
	};
	
	
	 console.log("This is in Map Control");
  $scope.mapCreated = function(map) {
    $scope.map = map;
	};
  
  var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initialise() {   
  //  var myLatlng = new google.maps.LatLng(17.8333,83.2000);
	 var latlng = new google.maps.LatLng(17.8333,83.2000);

	geocoder = new google.maps.Geocoder();

	 var mapOptions = {
           zoom: 18,
    center: latlng,
    mapTypeId: 'roadmap'

        };
}

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
	  
	   alert('This is in geolocation 1');
  
   alert('This is in geolocation 2'+pos);
  var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
  alert('This is in geolocation 3');
   var geocoder = new google.maps.Geocoder();
  
  
  
 
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        $scope.map.setZoom(18);
        marker = new google.maps.Marker({
            position: latlng,
            map: $scope.map
			//location: results[1].geometry.location
        });
		 google.maps.event.addListener(marker, 'click', function() {
    infowindow.open($scope.map, marker);
  });
		  
	//	var t=$scope.map.PlaceResult.name;
		
		
		if (!results[1].geometry) {
      return;
    }

    if (results[1].geometry.viewport) {
      $scope.map.fitBounds(results[1].geometry.viewport);
    } else {
      $scope.map.setCenter(results[1].geometry.location);
      $scope.map.setZoom(18);
    }

    // Set the position of the marker using the place ID and location
    marker.setPlace(/** @type {!google.maps.Place} */ ({
		//name:results[1].name,
      placeId: results[1].place_id,
      location: results[1].geometry.location
    }));
    marker.setVisible(true);
var input1 = results[1].formatted_address;
var t3= results[1].address_components;

  var latlngStr = input1.split(',', 4);
  var t5=t3[1].long_name;
  var t1 =latlngStr[0];
 // var typesStr = t5[0].value;
  var t6 =t5;
  alert('This is in geolocation 5  :'+t6);
infowindow.setContent('<div><strong> Area: ' + t1 + '<br> City: '+t6+'</strong><br>' +'Place ID: ' + results[1].place_id + '<br>' +results[1].formatted_address+'');
        infowindow.open($scope.map, marker);
		 window.localStorage['place.area.local'] = ''+t1;
		  window.localStorage['place.city.local'] = ''+t5;
		    $scope.arearegister=t1;
		$scope.cityregister=t5;
		 $scope.loginData.area = ''+t1;
		  $scope.loginData.city = ''+t5;
      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });
  
  		 alert('This is in geolocation 4');
		 $ionicLoading.hide();
		
	window.localStorage['pos.coords.latitude.local'] = pos.coords.latitude;
	window.localStorage['pos.coords.longitude.local'] = pos.coords.longitude;
	$ionicLoading.hide();
	  }, function (error) {
     
    });
  };
})


.controller('AppCtrl', function($scope, $ionicModal, $timeout,loginsFactory, $ionicLoading, $http) {
	
	
/*   Default get location while page opened*/

 navigator.geolocation.getCurrentPosition(function (pos) {
		
var map;
var infowindow = new google.maps.InfoWindow();
var marker;

      console.log('Got pos', pos);
	// alert('This is in geolocation');
	  console.log("This is in Map Control", pos);
	  
	//   alert('This is in geolocation 1');
  
 //  alert('This is in geolocation 2'+pos);
  var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
 // alert('This is in geolocation 3');
   var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        $scope.map.setZoom(16);
        marker = new google.maps.Marker({
            position: latlng,
            map: $scope.map
        });
		 google.maps.event.addListener(marker, 'click', function() {
    infowindow.open($scope.map, marker);
  });
		//  alert('This is in geolocation 5  :'+results[1].formatted_address);
	//	var t=$scope.map.PlaceResult.name;
		
		
		if (!results[1].geometry) {
      return;
    }

    if (results[1].geometry.viewport) {
      $scope.map.fitBounds(results[1].geometry.viewport);
    } else {
      $scope.map.setCenter(results[1].geometry.location);
      $scope.map.setZoom(16);
    }

    // Set the position of the marker using the place ID and location
    marker.setPlace(/** @type {!google.maps.Place} */ ({
		//name:results[1].name,
      placeId: results[1].place_id,
      location: results[1].geometry.location
    }));
    marker.setVisible(true);
var input1 = results[1].formatted_address;
var t3= results[1].address_components;
var t5=t3[1].short_name;
  var latlngStr = input1.split(',', 4);
  var t1 =latlngStr[0];
  
      //infowindow.setContent(results[1].formatted_address);
		infowindow.setContent('<div><strong> Area: ' + t1 + '<br> City: '+t5+'</strong><br>' +'Place ID: ' + results[1].place_id + '<br>' +results[1].formatted_address+'');
        infowindow.open($scope.map, marker);
		 window.localStorage['place.area.local'] = ''+t1;
		  window.localStorage['place.city.local'] = ''+t5;
		    $scope.arearegister=t1;
		$scope.cityregister=t5;
		 $scope.loginData.area = ''+t1;
		  $scope.loginData.city = ''+t5;
      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });
  
  
  
  
  
  

		// alert('This is in geolocation 4');
		// $ionicLoading.hide();
		$ionicLoading.hide();
	window.localStorage['pos.coords.latitude.local'] = pos.coords.latitude;
	window.localStorage['pos.coords.longitude.local'] = pos.coords.longitude;
	$ionicLoading.hide();
	  }, function (error) {
     
    });	
	
	
	
	
	


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
	// alert($scope.loginData.password);
	
	 var userid11=$scope.loginData.username;
	 var pass11=$scope.loginData.password;
	 alert(' UserId:'+$scope.loginData.username+' Password:'+$scope.loginData.password);
	 if(userid11.length==0||pass11.length==0)
	 {
		  alert(' UserId/Password cannot be empty');
		 
	 }
	 else{

	var lat=window.localStorage['pos.coords.latitude.local'] ;
	var lon=window.localStorage['pos.coords.longitude.local'] ;
	var area=window.localStorage['place.area.local'] ;
	var city=window.localStorage['place.city.local'] ;
	console.log("This is save in appctrl");
 
/* $http.post('http://localhost:8100/api/merchantlogins').then(function(resp) {
    console.log('Success', resp);	
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  });

 $http.post('http://localhost:8100/api/merchantlogins', $scope.
 
 
 data).
  success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
	console.log("This is save  $http.post ");
	  $scope.logins.push($scope.data.data);
	  $scope.loginusername=$scope.loginData.username;
	$scope.arearegister=area;
	$scope.cityregister=city;
	
	$scope.closeLogin();
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
  */
   var now = new Date();
  
        var headers = {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
		
		
		return $http({
            method: "POST",
            headers: headers,
      url: 'http://104.155.192.54:8080/api/logins',
            data: {
        "login": $scope.loginData.username,
        "isAdmin": false,
		"password":$scope.loginData.password,
		"coordslatitude":''+lat,
		"coordslongitudes":''+lon,
		"area":''+area,
		"city":''+city,
		"date":''+now

      }
    }).success(function(data) {
                console.log("Auth.signin.success!")
				  $scope.isLogin=true;
        $scope.logins.push(data.data);
		  $scope.loginusername=$scope.loginData.username;
	$scope.arearegister=area;
	$scope.cityregister=city;
	
	$scope.closeLogin();
                console.log(data);
    }).error(function(data, status, headers, config) {
                console.log("Auth.signin.error!")
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
    });
 /*
 $http.post('http://104.155.192.54:8080/api/logins', 
  {
        "login": $scope.loginData.username,
        "isAdmin": false,
		"password":$scope.loginData.password,
		"coordslatitude":''+lat,
		"coordslongitudes":''+lon,
		"area":''+area,
		"city":''+city
      }).success(successCallback);
*/
     loginsFactory.saveLogin({
        "login": $scope.loginData.username,
        "isAdmin": false,
		"password":$scope.loginData.password,
		"coordslatitude":''+lat,
		"coordslongitudes":''+lon,
		"area":''+area,
		"city":''+city,
		"date":''+now

      }).then(function(data) {
		  $scope.isLogin=true;
        $scope.logins.push(data.data);
      });
    $scope.loginusername=$scope.loginData.username;
	$scope.arearegister=area;
	$scope.cityregister=city;
	
	$scope.closeLogin();
      }
  };
  

  
  /*This for Map ctrl in login .html page */



	
	
	 console.log("This is in Map Control");
  $scope.mapCreated = function(map) {
    $scope.map = map;
	
	
  };
  
  var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initialise() {   
    var myLatlng = new google.maps.LatLng(17.8333,83.2000);
	 var latlng = new google.maps.LatLng(17.8333,83.2000);

	geocoder = new google.maps.Geocoder();

	 var mapOptions = {
           zoom: 16,
    center: latlng,
    mapTypeId: 'roadmap'

        };
}
  
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
		
var map;
var infowindow = new google.maps.InfoWindow();
var marker;

      console.log('Got pos', pos);
	// alert('This is in geolocation');
	  console.log("This is in Map Control", pos);
	  
	//   alert('This is in geolocation 1');
  
 //  alert('This is in geolocation 2'+pos);
  var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
 // alert('This is in geolocation 3');
   var geocoder = new google.maps.Geocoder();
  
  
  
 
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        $scope.map.setZoom(16);
        marker = new google.maps.Marker({
            position: latlng,
            map: $scope.map
			//location: results[1].geometry.location
        });
		 google.maps.event.addListener(marker, 'click', function() {
    infowindow.open($scope.map, marker);
  });
		//  alert('This is in geolocation 5  :'+results[1].formatted_address);
	//	var t=$scope.map.PlaceResult.name;
		
		
		if (!results[1].geometry) {
      return;
    }

    if (results[1].geometry.viewport) {
      $scope.map.fitBounds(results[1].geometry.viewport);
    } else {
      $scope.map.setCenter(results[1].geometry.location);
      $scope.map.setZoom(16);
    }

    // Set the position of the marker using the place ID and location
    marker.setPlace(/** @type {!google.maps.Place} */ ({
		//name:results[1].name,
      placeId: results[1].place_id,
      location: results[1].geometry.location
    }));
    marker.setVisible(true);
var input1 = results[1].formatted_address;
var t3= results[1].address_components;
var t5=t3[1].short_name;
  var latlngStr = input1.split(',', 4);
  var t1 =latlngStr[0];
  
      //infowindow.setContent(results[1].formatted_address);
		infowindow.setContent('<div><strong> Area: ' + t1 + '<br> City: '+t5+'</strong><br>' +'Place ID: ' + results[1].place_id + '<br>' +results[1].formatted_address+'');
        infowindow.open($scope.map, marker);
		 window.localStorage['place.area.local'] = ''+t1;
		  window.localStorage['place.city.local'] = ''+t5;
      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });
  
  
  
  
  
  

		 alert('This is in geolocation 4');
		// $ionicLoading.hide();
		$ionicLoading.hide();
	window.localStorage['pos.coords.latitude.local'] = pos.coords.latitude;
	window.localStorage['pos.coords.longitude.local'] = pos.coords.longitude;
	$ionicLoading.hide();
	  }, function (error) {
     
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

