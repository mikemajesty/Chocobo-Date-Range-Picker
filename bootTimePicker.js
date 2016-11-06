angular.module("boottimepicker", []).directive("boottimepicker", [function() {
	return {
		restrict: 'E',
		scope: {
			options: '='
		},
		controller: function($scope) {

		},
		templateUrl: 'public/home/DateTimePicker/timePicker.html'
	};
}]);
