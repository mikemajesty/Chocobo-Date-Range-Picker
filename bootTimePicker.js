(function (angular) {
  'use strict';
  angular.module('BotPicker', [])
    .directive("bootpicker", ['$filter', function ($filter) {
      String.prototype.capitalizeFirstLetter = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
      };
      return {
        require: 'ngModel',
        restrict: "AE",
        scope: {
          locale: '@',
          format: '@',
          options: '='
        },
        link: function (scope, elem, attrs, ngModel) {

          scope.startDate = getFormatDate(new Date(), attrs.format);
          scope.endDate = getFormatDate(new Date(), attrs.format);

          scope.dateMap = {};
          //attr format that it was arrived form directive
          var date = new Date();//$filter('date')(new Date(), 'dd/MM/yyyy');
          var options = { weekday: "long" };
          var changeDate = function (date) {
            var month = getFormatDate(date, 'MMMM');
            var year = getFormatDate(date, 'yyyy');

            scope.dateMap = { month: month, year: year, result: setRangeDay(date) };

            function getFirstDayOfWeek() {
              var dt = new Date();
              var day = dt.getDay();
              dt.setDate((dt.getDate() - day + (day === 0 ? -6 : 0)));
              return dt.toLocaleDateString(attrs.locale, options).capitalizeFirstLetter();
            }

            function setRangeDay(date) {
              var start = new Date(date.getFullYear(), date.getMonth(), 1);
              var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

              var weeks = [];

              for (var index = start.getDate(); index <= end.getDate(); index++) {
                start.setDate(index);
                if (start.toLocaleDateString(attrs.locale, options).capitalizeFirstLetter() == getFirstDayOfWeek() || weeks.length === 0) {
                  weeks.push({
                    'Sunday': false,
                    'Monday': false,
                    'Tuesday': false,
                    'Wednesday': false,
                    'Thursday': false,
                    'Friday': false,
                    'Saturday': false
                  });
                }
                weeks[weeks.length - 1][start.toLocaleDateString(attrs.locale, options).capitalizeFirstLetter()] = index;
              }
              return weeks;
            }
          };

          changeDate(date);

          function getWeekDays() {
            var dt = new Date();
            var diff = {};
            var weekList = [];
            for (var index = 0; index < 7; index++) {
              var day = dt.getDay();
              diff = dt.getDate() - day + (day === 0 ? -6 : index);
              dt.setDate(diff);
              weekList.push(dt.toLocaleDateString(attrs.locale, options).capitalizeFirstLetter());
            }
            return weekList;
          }

          scope.allWeeks = getWeekDays(new Date());

          scope.nextMonth = function () {
            if (date.getMonth() == 11) {
              date = new Date(date.getFullYear() + 1, 0, 1);
            } else {
              date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
            }
            changeDate(date);
          };

          scope.lastMonth = function () {
            if (date.getMonth() === 0) {
              date = new Date(date.getFullYear() - 1, 11, 1);
            } else {
              date = new Date(date.getFullYear(), date.getMonth() - 1, 1);
            }
            changeDate(date);
          };

          scope.chooseDay = function (data, month, year) {
            console.log('data: ', data);
            console.log('month: ', month);
            console.log('year: ', year);
          };

          function getFormatDate(date, format) {
            return $filter('date')(date, format);
          }

          var between = [];
          between.push(getFormatDate(new Date(), attrs.format));
          ngModel.$setViewValue(between);

          angular.element(elem).on('change', function (event) {
            between = [];
            SetRangeDate();
          });

          scope.selectTrimester = function () {
            var today = new Date();
            today.setMonth(today.getMonth() - 3);
            scope.startDate = getFormatDate(today, attrs.format);
            scope.endDate = getFormatDate(new Date(), attrs.format);
            between = [];
            SetRangeDate();
          };

          scope.selectSemester = function () {
            var today = new Date();
            today.setMonth(today.getMonth() - 6);
            scope.startDate = getFormatDate(today, attrs.format);
            scope.endDate = getFormatDate(new Date(), attrs.format);
            between = [];
            SetRangeDate();
          };

          scope.selectYear = function () {
            var today = new Date();
            today.setMonth(today.getMonth() - 12);
            scope.startDate = getFormatDate(today, attrs.format);
            scope.endDate = getFormatDate(new Date(), attrs.format);
            between = [];
            SetRangeDate();
          };

          scope.selectMonth = function () {
            var today = new Date();
            today.setMonth(today.getMonth() - 1);
            scope.startDate = getFormatDate(today, attrs.format);;
            scope.endDate = getFormatDate(new Date(), attrs.format);
            between = [];
            SetRangeDate();
          };

          scope.selectYear = function () {
            var today = new Date();
            today.setMonth(today.getMonth() - 12)
            scope.startDate = getFormatDate(today, attrs.format);;
            scope.endDate = getFormatDate(new Date(), attrs.format);
            between = [];
            SetRangeDate();
          };

          scope.selectMonth = function () {
            var today = new Date();
            today.setMonth(today.getMonth() - 1);
            scope.startDate = getFormatDate(today, attrs.format);
            scope.endDate = getFormatDate(new Date(), attrs.format);
            between = [];
            SetRangeDate();
          };

          scope.selectToday = function () {
            scope.startDate = getFormatDate(new Date(), attrs.format);
            scope.endDate = getFormatDate(new Date(), attrs.format);
            between = [];
            SetRangeDate();
          };

          scope.selectWeek = function () {
            var today = new Date();
            today.setDate(today.getDate() - 7)
            scope.startDate = getFormatDate(today, attrs.format);
            scope.endDate = getFormatDate(new Date(), attrs.format);
            between = [];
            SetRangeDate();
          };

          scope.selectLastDay = function () {
            var today = new Date();
            today.setDate(today.getDate() - 1);
            scope.startDate = getFormatDate(today, attrs.format);
            scope.endDate = getFormatDate(today, attrs.format);
            between = [];
            SetRangeDate();
          };

          function SetRangeDate() {
            var start = scope.startDate;
            var end = scope.endDate.split("/");
            end = new Date(end[2], end[1] - 1, end[0]);
            var from = start.split("/");
            var currentDate = new Date(from[2], from[1] - 1, from[0]);
            while (currentDate <= end) {
              var dt = getFormatDate(currentDate, attrs.format);
              between.push(dt);
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
