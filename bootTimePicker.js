(function (angular) {
  'use strict';
  angular.module('BotPicker', [])
    .directive("bootpicker", ['$filter', function ($filter) {

      Array.prototype.groupBy = function (prop) {
        return this.reduce(function (groups, item) {
          var val = item[prop];
          groups[val] = groups[val] || [];
          groups[val].push(item);
          return groups;
        }, {});
      };
      
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

          scope.dateMap = {};
          //attr format that it was arrived form directive
          var date = new Date();//$filter('date')(new Date(), 'dd/MM/yyyy');
          var month = getFormatDate(date, 'MMMM');
          var year = getFormatDate(date, 'yyyy');

          scope.dateMap = { month: month, year: year, result: setRangeDay(date) };

          console.log('date: ', scope.dateMap);

          function setRangeDay(date) {
            var days = [];
            var start = new Date(date.getFullYear(), date.getMonth(), 1);
            var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            for (var index = start.getDate(); index <= end.getDate(); index++) {
              start.setDate(index);
              days.push({ day: index, week: getFormatDate(start, 'EEEE') });
            }

            days = days.groupBy('week');
            return days;
          }

          function getFormatDate(date, format) {
            return $filter('date')(date, format);
          }

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
