(function (angular) {
    'use strict';
    	angular.module('BotPicker')
    	.directive("bootpicker", [function () {
        return {
            restrict: "E",
            scope: {
                refreshCallback: "&"
            },
            link: function (scope, elem, attrs) {
                angular.element(elem).on('click', function (event) {
                    event.preventDefault();

                });
            },
						templateUrl: '/timePicker.html'
        };
    }]);
})(angular);