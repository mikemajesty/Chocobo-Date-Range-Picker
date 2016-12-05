(function (angular) {
    'use strict';
    	angular.module('BotPicker')
    	.directive("bootpicker", [function () {
        return {
            require: 'ngModel',
            restrict: "AE",
            scope: {
                locale: '@',
	              options: '='
            },
            link: function (scope, elem, attrs, ngModel) {
                scope.dataIni = new Date();
                scope.dataFin = new Date();

                var between = [];
                between.push(new Date().toLocaleDateString(attrs.locale));
                ngModel.$setViewValue(between);

                angular.element(elem).on('change', function (event) {
                    between = [];
                    SetRangeDate();
                });

                scope.selectTrimestre = function () {
                  var today = new Date();
                  today.setMonth(today.getMonth() - 3)
                  scope.dataIni = today;
                  scope.dataFin = new Date();
                  between = [];
                  SetRangeDate();
                }

                scope.selectSemester = function () {
                  var today = new Date();
                  today.setMonth(today.getMonth() - 6)
                  scope.dataIni = today;
                  scope.dataFin = new Date();
                  between = [];
                  SetRangeDate();
                }

                scope.selectYear = function () {
                  var today = new Date();
                  today.setMonth(today.getMonth() - 12)
                  scope.dataIni = today;
                  scope.dataFin = new Date();
                  between = [];
                  SetRangeDate();
                }

                scope.selectMonth = function () {
                  var today = new Date();
                  today.setMonth(today.getMonth() - 1)
                  scope.dataIni = today;
                  scope.dataFin = new Date();
                  between = [];
                  SetRangeDate();
                }

                scope.selectLastDay = function () {
                  var today = new Date();
                  today.setDate(today.getDate() - 1)
                  scope.dataIni = today;
                  scope.dataFin = today;
                  between = [];
                  SetRangeDate();
                }

                function SetRangeDate() {
                  var start = scope.dataIni;
                  var end = scope.dataFin;
                  var currentDate = new Date(start.getTime());

                  while (currentDate <= end) {
                      between.push(new Date(currentDate).toLocaleDateString(attrs.locale));
                      currentDate.setDate(currentDate.getDate() + 1);
                  }
                  ngModel.$setViewValue(between);
                  ngModel.$render();
                  console.log('quantity ', between.length);
                }
            },
						templateUrl: '/timePicker.html'
        };
    }]);
})(angular);
