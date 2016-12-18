(function (angular) {
  'use strict';
  angular.module('BotPicker', [])
    .directive("bootpicker", [function () {
      return {
        require: 'ngModel',
        restrict: "AE",
        scope: {
          locale: '@',
          options: '='
        },
        link: function (scope, elem, attrs, ngModel) {
          scope.startDate = new Date();
          scope.endDate = new Date();

          var between = [];
          between.push(new Date().toLocaleDateString(attrs.locale));
          ngModel.$setViewValue(between);

          angular.element(elem).on('change', function (event) {
            between = [];
            SetRangeDate();
          });

          scope.selectTrimester = function () {
            var today = new Date();
            today.setMonth(today.getMonth() - 3)
            scope.startDate = today;
            scope.endDate = new Date();
            between = [];
            SetRangeDate();
          };

          scope.selectSemester = function () {
            var today = new Date();
            today.setMonth(today.getMonth() - 6)
            scope.startDate = today;
            scope.endDate = new Date();
            between = [];
            SetRangeDate();
          };

          scope.selectYear = function () {
            var today = new Date();
            today.setMonth(today.getMonth() - 12)
            scope.startDate = today;
            scope.endDate = new Date();
            between = [];
            SetRangeDate();
          };

          scope.selectMonth = function () {
            var today = new Date();
            today.setMonth(today.getMonth() - 1)
            scope.startDate = today;
            scope.endDate = new Date();
            between = [];
            SetRangeDate();
          };

          scope.selectYear = function () {
            var today = new Date();
            today.setMonth(today.getMonth() - 12)
            scope.startDate = today;
            scope.endDate = new Date();
            between = [];
            SetRangeDate();
          };

          scope.selectMonth = function () {
            var today = new Date();
            today.setMonth(today.getMonth() - 1);
            scope.startDate = today;
            scope.endDate = new Date();
            between = [];
            SetRangeDate();
          };

          scope.selectToday = function () {
            scope.startDate = new Date();
            scope.endDate = new Date();
            between = [];
            SetRangeDate();
          };

          scope.selectWeek = function () {
            var today = new Date();
            today.setDate(today.getDate() - 7)
            scope.startDate = today;
            scope.endDate = new Date();;
            between = [];
            SetRangeDate();
          };

          scope.selectLastDay = function () {
            var today = new Date();
            today.setDate(today.getDate() - 1)
            scope.startDate = today;
            scope.endDate = today;
            between = [];
            SetRangeDate();
          };

          function SetRangeDate() {
            var start = scope.startDate;
            var end = scope.endDate;
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
