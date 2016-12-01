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
                angular.element(elem).on('change', function (event) {
                  console.log('dataIni:', scope.dataIni);
                  console.log('dataFin:', scope.dataFin)
                });
            },
						templateUrl: '/timePicker.html'
        };
    }]);
})(angular);
