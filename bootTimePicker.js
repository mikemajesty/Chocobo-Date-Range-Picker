angular.module("bootpicker", ['ui.bootstrap'])
  .directive("bootpicker", [function() {
    return {
          restrict: 'E',
      		scope: {
      			options: '='
      		},
      		controller: function($scope) {
            
      		},
  		      templateUrl: 'public/home/DateTimePicker/timePicker.html'
          }
  }]);
