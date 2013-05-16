var app = angular.module('FundooModalApp', ['fundoo.services']);

app.controller('MainCtrl', ['$scope', 'createDialog', function($scope, createDialogService) {
	$scope.launchSimpleModal = function() {
		createDialogService('simpleModal.html', {
              id: 'simpleDialog',
              title: 'A Simple Modal Dialog',
              backdrop: false,
              controller: 'SimpleModalController',
              footerTemplate: ' '
            });
	};
}]);

app.controller('SimpleModalController', ['$scope', function(){

}]);