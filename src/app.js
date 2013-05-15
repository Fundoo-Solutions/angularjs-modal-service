var app = angular.module('FundooServicesApp', []);

app.controller('MainCtrl', ['$scope', 'createDialog', function($scope, createDialogService) {
	$scope.launchSimpleModal = function() {
		createDialogService('simpleModal.html', {
              id: 'simpleDialog',
              title: 'A Simple Modal Dialog',
              controller: 'SimpleModalController',
              footerTemplate: ' '
            });
	};
}]);

app.controller('SimpleModalController', ['$scope', function(){

}]);