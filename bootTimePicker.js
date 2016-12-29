(function (angular) {
  'use strict';
  angular.module('BotPicker', [])
    .directive("bootpicker", ['$filter', function ($filter) {
      
      String.prototype.capitalizeFirstLetter = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
      };

      Date.prototype.reverseFormat = function (date, format) {
        var formatDate = date.split("/");
        //year//month//day -> this is used when the format was dd/MM/yyyy
        return new Date(formatDate[2], formatDate[1] - 1, formatDate[0]);
      };

      Object.prototype.getKeyByValue = function (value) {
        for (var prop in this) {
          if (this.hasOwnProperty(prop)) {
            if (this[prop] === value)
              return prop;
          }
        }
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

          var date = new Date();//$filter('date')(new Date(), 'dd/MM/yyyy');
          var optionsWeek = { weekday: "long" };
          var optionsMonth = { month: 'long' };
          var optionsYear = { year: 'numeric' };
          var optionsDay = { day: 'numeric' };
          var optionsAlmostComplete = { day: 'numeric', month: 'numeric', year: 'numeric' };

          //attr format that it was arrived form directive
          scope.startDate = getFormatDate(date.toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.format);
          scope.endDate = getFormatDate(date.toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.format);

          scope.dateMap = {};

          function getFirstDayOfWeek() {
            var dt = new Date();
            var day = dt.getDay();
            dt.setDate((dt.getDate() - day + (day === 0 ? -6 : 0)));
            return dt.toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter();
          }

          var getLastSunday = function (d) {
            var t = new Date(d);
            t.setDate(t.getDate() - t.getDay());
            return t;
          };

          var getRangeDate = function (currentDate, endDate, array) {
            currentDate.setHours(0, 0, 0, 0);
            endDate.setHours(0, 0, 0, 0);
            while (currentDate <= endDate) {
              var dt = getFormatDate(currentDate, attrs.format);
              array.push(dt);
              currentDate.setDate(currentDate.getDate() + 1);
            }
          };

          var changeDate = function (date) {
            var month = date.toLocaleDateString(attrs.locale, optionsMonth).capitalizeFirstLetter();
            var year = date.toLocaleDateString(attrs.locale, optionsYear).capitalizeFirstLetter();

            scope.dateMap = { month: month, year: year, result: setRangeDay(date) };

            function setRangeDay(date) {
              var start = new Date(date.getFullYear(), date.getMonth(), 1);
              var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
              var weeks = [];
              for (var index = start.getDate(); index <= end.getDate(); index++) {
                start.setDate(index);
                if (start.toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter() == getFirstDayOfWeek() || weeks.length === 0) {
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
                weeks[weeks.length - 1][start.toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter()] = start.toLocaleDateString(attrs.locale, optionsDay);
                if (index === 1) {
                  weeks.find(finding);
                }
              }
              return weeks;
            }
          };

          function finding(element, index, array) {
            console.log(array);
            if (index === 0) {
              if (element.getKeyByValue("1") != getFirstDayOfWeek()) {
                var td = date;
                setLastDaysOfLastMonth(element, td);
              }
            }
          }

          function setLastDaysOfLastMonth(element, dt) {
            dt.setDate(1);
            var lastSunday = getLastSunday(dt);
            var lastDayOfMonth = new Date(lastSunday.getUTCFullYear(), lastSunday.getUTCMonth() + 1, 0);
            lastSunday.setHours(0, 0, 0, 0);
            lastDayOfMonth.setHours(0, 0, 0, 0);
            while (lastSunday <= lastDayOfMonth) {
              var tempDate = getFormatDate(lastSunday, attrs.format);
              element[new Date().reverseFormat(tempDate, attrs.format).toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter()] = new Date().reverseFormat(tempDate, attrs.format).toLocaleDateString(attrs.locale, optionsDay);
              lastSunday.setDate(lastSunday.getDate() + 1);
            }
          }

          changeDate(date);

          function getWeekDays() {
            var dt = new Date();
            var diff = {};
            var weekList = [];
            for (var index = 0; index < 7; index++) {
              var day = dt.getDay();
              diff = dt.getDate() - day + (day === 0 ? -6 : index);
              dt.setDate(diff);
              weekList.push(dt.toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter());
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
            scope.startDate = getFormatDate(today.toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.format);
            scope.endDate = getFormatDate(new Date().toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.format);
            between = [];
            SetRangeDate();
          };

          scope.selectSemester = function () {
            var today = new Date();
            today.setMonth(today.getMonth() - 6);
            scope.startDate = getFormatDate(today.toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.format);
            scope.endDate = getFormatDate(new Date().toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.format);
            between = [];
            SetRangeDate();
          };

          scope.selectYear = function () {
            var today = new Date();
            today.setMonth(today.getMonth() - 12);
            scope.startDate = getFormatDate(today.toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.format);
            scope.endDate = getFormatDate(new Date().toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.format);
            between = [];
            SetRangeDate();
          };

          scope.selectMonth = function () {
            var today = new Date();
            today.setMonth(today.getMonth() - 1);
            scope.startDate = getFormatDate(today.toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.format);
            scope.endDate = getFormatDate(new Date().toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.format);
            between = [];
            SetRangeDate();
          };

          scope.selectYear = function () {
            var today = new Date();
            today.setMonth(today.getMonth() - 12);
            scope.startDate = getFormatDate(today.toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.format);
            scope.endDate = getFormatDate(new Date().toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.format);
            between = [];
            SetRangeDate();
          };

          scope.selectMonth = function () {
            var today = new Date();
            today.setMonth(today.getMonth() - 1);
            scope.startDate = getFormatDate(today.toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.format);
            scope.endDate = getFormatDate(new Date().toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.format);
            between = [];
            SetRangeDate();
          };

          scope.selectToday = function () {
            scope.startDate = getFormatDate(new Date().toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.format);
            scope.endDate = getFormatDate(new Date().toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.format);
            between = [];
            SetRangeDate();
          };

          scope.selectWeek = function () {
            var today = new Date();
            today.setDate(today.getDate() - 7);
            scope.startDate = getFormatDate(today.toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.format);
            scope.endDate = getFormatDate(new Date().toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.format);
            between = [];
            SetRangeDate();
          };

          scope.selectLastDay = function () {
            var today = new Date();
            today.setDate(today.getDate() - 1);
            scope.startDate = getFormatDate(today.toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.format);
            scope.endDate = getFormatDate(today.toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.format);
            between = [];
            SetRangeDate();
          };

          function SetRangeDate() {
            var start = scope.startDate;
            start = new Date().reverseFormat(start, attrs.format);
            var end = scope.endDate;
            end = new Date().reverseFormat(end, attrs.format);
            var currentDate = new Date(start.getTime());

            getRangeDate(currentDate, end, between);

            ngModel.$setViewValue(between);
            ngModel.$render();
            console.log('quantity ', between.length);
          }
        },
        templateUrl: '/timePicker.html'
      };
    }]);
})(angular);
