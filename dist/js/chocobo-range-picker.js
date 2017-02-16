/* jshint expr: true */
(function(angular) {
  'use strict';
  angular.module('chocoboRangePicker', [])
    .directive('chocoboRangePicker', [function() {

      String.prototype.capitalizeFirstLetter = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
      };

      Date.prototype.reverseFormat = function(tDate, locale) {
        if (locale === 'pt-BR' || locale === 'en-GB') {
          var formatDate = tDate.split('/');
          return new Date(formatDate[2], formatDate[1] - 1, formatDate[0]);
        }
        if (locale === 'de-DE') {
          var parts = tDate.match(/(\d+)/g);
          return new Date(parts[2], parts[1] - 1, parts[0]);
        }
        return new Date(tDate);
      };

      return {
        require: 'ngModel',
        restrict: 'AE',
        scope: {
          options: '='
        },
        link: function(scope, elem, attrs, ngModel) {
          /**
           * DATE MANIPULATION
           */

          // Date Operation Enumerator
          var DATEOPERATION = {
            DAY: 0,
            MONTH: 1,
            YEAR: 2
          };

          // Date Operation Function - Used to manipulate date
          function dateOperation(date, value, operation, createNewObject) {
            var newDate = date;

            if (typeof createNewObject !== 'undefined' ? createNewObject : false) {
              newDate = new Date(date.getTime());
            }

            if (operation === DATEOPERATION.DAY) {
              newDate.setDate(newDate.getDate() + value);
            } else if (operation === DATEOPERATION.MONTH) {
              newDate.setMonth(newDate.getMonth() + value);
            } else if (operation === DATEOPERATION.YEAR) {
              newDate.setFullYear(newDate.getFullYear() + value);
            }

            return newDate;
          }

          // Remove timepart of a date
          function dateWithoutTime(date) {
            date.setHours(0, 0, 0, 0);
            return date;
          }

          // Compare if two date are equals
          scope.isEqualsDate = function(a, b) {
            return dateWithoutTime(a).getTime() === dateWithoutTime(b).getTime();
          };

          // Check if a date is between of two dates
          scope.isBetweenDate = function(date, a, b) {
            return dateWithoutTime(date).getTime() >= dateWithoutTime(a).getTime() && dateWithoutTime(date).getTime() <= dateWithoutTime(b).getTime();
          };

          scope.betweenMinMax = function(date) {
            if(scope.options.minDate && scope.options.maxDate) {
              return scope.isBetweenDate(date, scope.options.minDate, scope.options.maxDate);
            }
            if(scope.options.minDate) {
              return scope.isAfterOrEqual(date, scope.options.minDate);
            }
            if(scope.options.maxDate) {
              return scope.isBeforeOrEqual(date, scope.options.maxDate, true);
            }
            return true;
          };

          // Check if a date is before or equal
          scope.isBeforeOrEqual = function(a, b, disableVerification) {
            if (!disableVerification) {
              var restrict = attrs.blockweekday ? attrs.blockweekday.split(',') : [];
              return restrict.indexOf(String(dateWithoutTime(a).getDay())) === -1;
            }
            return dateWithoutTime(a).getTime() <= dateWithoutTime(b).getTime();
          };

          // Check if a date is after or equal
          scope.isAfterOrEqual = function(a, b) {
            var restrict = attrs.blockweekday ? attrs.blockweekday.split(',') : [];
            return restrict.indexOf(String(dateWithoutTime(a).getDay())) === -1 && dateWithoutTime(a).getTime() >= dateWithoutTime(b).getTime();
          };

          /*
           * CALENDAR
           */

          function updateCalendar(calendar) {
            var calendarMonth = calendar.baseDate.getMonth();

            // Find the nearst start week day
            var start = new Date(calendar.baseDate.getTime());
            start.setDate(1);
            start.setDate(start.getDate() - start.getDay());

            // Find the last week after end of month
            var end = new Date(calendar.baseDate.getTime());
            end.setDate(1);
            end.setMonth(end.getMonth() + 1);
            end.setDate(0);
            end.setDate(end.getDate() + (6 - end.getDay()));

            calendar.weeks = [];

            var week = {};
            while (scope.isBeforeOrEqual(start, end, true)) {
              week[start.getDay()] = {
                date: new Date(start.getTime()),
                calendarMonth: start.getMonth() === calendarMonth,
              };

              // End of a week reached]
              var SATURDAY = 6;
              if (start.getDay() === SATURDAY) {
                calendar.weeks.push(week);
                week = {};
              }
              var ADD_ONE_DAY = 1;
              dateOperation(start, ADD_ONE_DAY, DATEOPERATION.DAY);
            }
          }

          // Go to the next month
          scope.nextMonth = function(calendar) {
            var ADD_ONE_MONTH = 1;
            dateOperation(calendar.baseDate, ADD_ONE_MONTH, DATEOPERATION.MONTH);
            updateCalendar(calendar);
          };

          // Go to the previous month
          scope.previousMonth = function(calendar) {
            var REMOVE_ONE_MONTH = -1;
            dateOperation(calendar.baseDate, REMOVE_ONE_MONTH, DATEOPERATION.MONTH);
            updateCalendar(calendar);
          };

          // Generate an array of weekdays
          scope.weekdays = function() {
            var date = new Date();

            // Get first day of week
            date.setDate(date.getDate() - date.getDay());

            // Create an array of localized weekday
            var weekList = [scope.localeWeekday(date)];
            for (var i = 0; i < 6; i++) {
              date.setDate(date.getDate() + 1);
              weekList.push(scope.localeWeekday(date));
            }

            return weekList;
          };

          // Method called when a date is selected
          scope.selectDate = function(calendar, date) {
            calendar.baseDate = new Date(date.getTime());
            calendar.selectedDate = new Date(date.getTime());

            updateCalendar(calendar);
            updateModel();
          };

          /*
           * Locale
           */
          scope.localeMonth = function(date) {
            return date.toLocaleDateString(attrs.locale || navigator.language, { month: 'long' }).capitalizeFirstLetter();
          };

          scope.localeYear = function(date) {
            return date.toLocaleDateString(attrs.locale || navigator.language, { year: 'numeric' }).capitalizeFirstLetter();
          };

          scope.localeWeekday = function(date) {
            return date.toLocaleDateString(attrs.locale || navigator.language, { weekday: 'long' }).capitalizeFirstLetter();
          };

          scope.localeDate = function(date) {
            return date.toLocaleDateString(attrs.locale || navigator.language, { day: '2-digit', month: '2-digit', year: 'numeric' });
          };

          /*
           * Variables - Initial configurations
           */

          var currentDate = dateWithoutTime(new Date());

          scope.leftCalendar = {
            baseDate: new Date(currentDate.getTime()),
            selectedDate: new Date(currentDate.getTime()),
            weeks: []
          };
          updateCalendar(scope.leftCalendar);

          scope.rightCalendar = {
            baseDate: new Date(currentDate.getTime()),
            selectedDate: new Date(currentDate.getTime()),
            weeks: []
          };
          updateCalendar(scope.rightCalendar);

          /*
           * Modal
           */
          scope.openModal = function() {
            scope.isOpen = !scope.isOpen;
          };

          scope.isOpen = false;
          scope.iconUrl = '/public/calendar.ico';

          /*
           * Model
           */

          // Method called to update ngModel for the parent controller
          function updateModel() {
            var start = new Date(scope.leftCalendar.selectedDate.getTime());

            var days = [];
            var BIND_RANGE_DATE = 'true';

            if (attrs.bindrange === BIND_RANGE_DATE) {
              var end = dateOperation(scope.rightCalendar.selectedDate, 1, DATEOPERATION.DAY, true);
              while (scope.isEqualsDate(start, end) === false) {
                days.push(new Date(start.getTime()));
                dateOperation(start, 1, DATEOPERATION.DAY);
              }
            } else {
              days.push(start);
              days.push(dateOperation(scope.rightCalendar.selectedDate, 0, DATEOPERATION.DAY, true));
            }
            ngModel.$setViewValue(days);
            ngModel.$render();
          }

          /*
           INICIA O CALENDARIO JÁ SELECIONADO
           */

          var initiateCalendar = function() {
            var dt = new Date();
            dt.setHours(0, 0, 0, 0);
            ngModel.$setViewValue([dt, dt]);
            ngModel.$render();
          }();

          /*
           * PERIODS
           */
          // Set a period of dates
          scope.setPeriod = function(start, end) {
            scope.leftCalendar.baseDate = new Date(start.getTime());
            scope.leftCalendar.selectedDate = new Date(start.getTime());
            updateCalendar(scope.leftCalendar);

            scope.rightCalendar.baseDate = new Date(end.getTime());
            scope.rightCalendar.selectedDate = new Date(end.getTime());
            updateCalendar(scope.rightCalendar);

            updateModel();
          };

          scope.selectYear = function() {
            scope.setPeriod(dateOperation(currentDate, -1, DATEOPERATION.YEAR, true), new Date(currentDate.getTime()));
          };

          scope.selectSemester = function() {
            scope.setPeriod(dateOperation(currentDate, -6, DATEOPERATION.MONTH, true), new Date(currentDate.getTime()));
          };

          scope.selectTrimester = function() {
            scope.setPeriod(dateOperation(currentDate, -3, DATEOPERATION.MONTH, true), new Date(currentDate.getTime()));
          };

          scope.selectMonth = function() {
            scope.setPeriod(dateOperation(currentDate, -1, DATEOPERATION.MONTH, true), new Date(currentDate.getTime()));
          };

          scope.selectWeek = function() {
            scope.setPeriod(dateOperation(currentDate, -7, DATEOPERATION.DAY, true), new Date(currentDate.getTime()));
          };

          scope.selectLastDay = function() {
            scope.setPeriod(dateOperation(currentDate, -1, DATEOPERATION.DAY, true), new Date(currentDate.getTime()));
          };

          scope.selectToday = function() {
            scope.setPeriod(new Date(currentDate.getTime()), new Date(currentDate.getTime()));
          };
        },
        replace: true,
        templateUrl: 'chocobo-range-picker.html'
      };
    }]);
})(angular);