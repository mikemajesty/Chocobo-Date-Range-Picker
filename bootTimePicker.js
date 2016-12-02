(function (angular) {
    'use strict';
    	angular.module('BotPicker')
    	.directive("bootpicker", [function () {
        return {
            require: 'ngModel',
            restrict: "AE",
            scope: {
                options: '@',
                format: '@',
                dateRange: '='
            },
            link: function (scope, elem, attrs) {
                angular.element(elem).on('change', function (event) {
                  var start = scope.dataIni;
                  var end = scope.dataFin;
                  var currentDate = new Date(start.getTime());
                  var between = [];

                  while (currentDate <= end) {
                      between.push(new Date(currentDate));
                      currentDate.setDate(currentDate.getDate() + 1);
                  }
                  var model = attrs['ngModel'];
              

                  console.log('model', model);
                  console.log('options', scope.options);
                  console.log('dataIni:', scope.dataIni);
                  console.log('dataFin:', scope.dataFin);
                  console.log('dateRange:', attrs)
                });
            },
            controller: function ($scope) {
              console.log('sera: ', $scope );
            },
						templateUrl: '/timePicker.html'
        };
    }]);
})(angular);
