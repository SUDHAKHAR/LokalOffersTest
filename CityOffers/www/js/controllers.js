angular.module('starter.controllers',[])


.controller('AppCtrl', function($scope, $ionicModal, $timeout,loginsFactory) {
  // Form data for the login modal
  $scope.loginData = {};

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

  // Perform the login action when the user submits the login form
  $scope.save = function() {
	alert('Oops something went wrong!');
'use strict';
 /*var express = require('express');
  var router = express.Router();
  var mongojs = require('mongojs');
  var db =mongojs('mongodb://sudhakar:umasan57@ds047792.mongolab.com:47792/cityoffers', ['logins']); 
  
  db.logins.insert({'login': $scope.loginusername,'isCompleted': false,'password':$scope.loginpassword});*/
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
	console.log("This is save");
	  alert('Click Logins');
     loginsFactory.saveLogin({
        "login": $scope.loginusername,
        "isCompleted": false,
		"password":$scope.loginpassword
      }).then(function(data) {
        $scope.logins.push(data.data);
      });
      $scope.loginusername = '';
	$scope.closeLogin();
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
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
/*.controller('LoginCtrl', function($rootScope, $scope, loginsFactory	) {
   alert('Click Logins');
  $scope.logins = [];
  $scope.isEditable = [];
  $scope.passwords = [];
 
  // get all Todos on Load
  loginsFactory.getLogins().then(function(data) {
    $scope.logins = data.data;
  });
 
  // Save a Todo to the server
  $scope.save = function() {
	  console.log("This is save");
	  alert('Click Logins');
     loginsFactory.savelogin({
        "login": $scope.loginusername,
        "isCompleted": false,
		"password":$scope.loginpassword
      }).then(function(data) {
        $scope.logins.push(data.data);
      });
      $scope.loginusername = '';
  };
 
  //update the status of the Todo
  $scope.updateStatus = function($event, _id, i) {
    var cbk = $event.target.checked;
    var _t = $scope.logins[i];
    loginsFactory.updateLogin({
      _id: _id,
      isCompleted: cbk,
      login: _t.login
    }).then(function(data) {
      if (data.data.updatedExisting) {
        _t.isCompleted = cbk;
      } else {
        alert('Oops something went wrong!');
      }
    });
  };
 
  // Update the edited Todo
  $scope.edit = function($event, i) {
    if ($event.which == 13 && $event.target.value.trim()) {
      var _t = $scope.logins[i];
      loginsFactory.updateLogin({
        _id: _t._id,
        login: $event.target.value.trim(),
        isCompleted: _t.isCompleted
      }).then(function(data) {
        if (data.data.updatedExisting) {
          _t.login = $event.target.value.trim();
          $scope.isEditable[i] = false;
        } else {
          alert('Oops something went wrong!');
        }
      });
    }
  };
 
  // Delete a Todo
  $scope.delete = function(i) {
    loginsFactory.deleteLogin($scope.Logins[i]._id).then(function(data) {
      if (data.data) {
        $scope.logins.splice(i, 1);
      }
    });
  };
  
  
}) */




.controller('PlaylistCtrl', function($scope, $stateParams) {
});

