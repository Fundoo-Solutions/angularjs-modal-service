var app = angular.module('FundooModalApp', ['fundoo.services'])
	.controller('MainCtrl', ['$scope', 'createDialog', function($scope, createDialogService) {
		$scope.launchSimpleModal = function() {
			createDialogService('simpleModal.html', {
              id: 'simpleDialog',
              title: 'A Simple Modal Dialog',
              backdrop: true,
              success: {label: 'Success', fn: function() {console.log('Successfully closed simple modal');}}
            });
		};
		$scope.launchComplexModal = function() {
			createDialogService('complexModal.html', {
              id: 'complexDialog',
              title: 'A Complex Modal Dialog',
              backdrop: true,
              controller: 'ComplexModalController',
              success: {label: 'Success', fn: function() {console.log('Successfully closed complex modal');}}
            }, {
        	  myVal: 15,
        	  assetDetails: {
        	  	name: 'My Asset',
        	  	description: 'A Very Nice Asset'
        	  }
        	});
		};
	}])
	.factory('SampleFactory', function() {
		return {
			sample: function() {
				console.log('This is a sample');
			}
		};
	})
	.controller('ComplexModalController', ['$scope', 'SampleFactory', 'myVal', 'assetDetails',
		 function($scope, SampleFactory, myVal, assetDetails) {
		 	$scope.myVal = myVal;
		 	$scope.asset = assetDetails;
		 	SampleFactory.sample();
	}]);
