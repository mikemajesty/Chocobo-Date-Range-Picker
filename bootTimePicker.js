(function (angular) {
    'use strict';
    	angular.module('BotPicker')
    	.directive("bootpicker", [function () {
        return {
            require: 'ngModel',
            restrict: "AE",
            scope: {
                locale: '@',
            },
            link: function (scope, elem, attrs, ngModel) {
                angular.element(elem).on('change', function (event) {

                  var start = scope.dataIni;
                  var end = scope.dataFin;
                  var currentDate = new Date(start.getTime());
                  var between = [];

                  while (currentDate <= end) {
                      between.push(new Date(currentDate).toLocaleDateString(attrs.locale));
                      currentDate.setDate(currentDate.getDate() + 1);
                  }
                  ngModel.$setViewValue(between);
                  ngModel.$render();
                });
            },
            controller: function ($scope) {

            },
						templateUrl: '/timePicker.html'
        };
    }]);
})(angular);
