var app = angular.module('FundooModalApp', ['fundoo.services']);

app.controller('MainCtrl', ['$scope', 'createDialog', function($scope, createDialogService) {
	$scope.launchSimpleModal = function() {
		createDialogService('simpleModal.html', {
              id: 'simpleDialog',
              title: 'A Simple Modal Dialog',
              backdrop: true,
              success: {label: 'Yay', fn: function() {console.log('Successfully closed modal');}}
            });
	};
}]);

app.controller('SimpleModalController', ['$scope', function(){

}]);