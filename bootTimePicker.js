angular.module("BotPicker", [])
  .directive("bootpicker", [function() {
    return {
          restrict: 'E',
      		scope: {
      			options: '='
      		},
      		controller: function($scope) {
            console.log('teste');
      		},
  		      templateUrl: '/timePicker.html'
          }
  }]);
