var app = angular.module('FundooModalApp', ['fundoo.services'])
	.controller('MainCtrl', ['$scope', 'createDialog', function($scope, createDialogService) {
		$scope.launchSimpleModal = function() {
			createDialogService('simpleModal.html', {
              id: 'simpleDialog',
              title: 'A Simple Modal Dialog',
              backdrop: true,
              success: {label: 'Yay', fn: function() {console.log('Successfully closed simple modal');}}
            });
		};
		$scope.launchComplexModal = function() {
			createDialogService('complexModal.html', {
              id: 'complexDialog',
              title: 'A Complex Modal Dialog',
              backdrop: true,
              controller: 'ComplexModalController',
              success: {label: 'Yay', fn: function() {console.log('Successfully closed complex modal');}}
            }, {
        	  myVal: 15,
        	  assetDetails: {
        	  	name: 'My Asset',
        	  	description: 'A Very Nice Asset'
        	  }
        	});	
		};
	}])
	.factory('StupidFactory', function() {
		return {
			stupid: function() {
				console.log('This is stupid');
			}
		};
	})
	.controller('ComplexModalController', ['$scope', 'StupidFactory', 'myVal', 'assetDetails',
		 function($scope, StupidFactory, myVal, assetDetails) {
		 	$scope.myVal = myVal;
		 	$scope.asset = assetDetails;
		 	StupidFactory.stupid();
	}]);