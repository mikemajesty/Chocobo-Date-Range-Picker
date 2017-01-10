(function (angular) {
  'use strict';
  angular.module('BotPicker', [])
    .directive("bootpicker", ['$filter', function ($filter) {

      String.prototype.capitalizeFirstLetter = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
      };

      Date.prototype.reverseFormat = function (tDate, locale) {
        if (locale === 'pt-BR') {
          var formatDate = tDate.split("/");
          return new Date(formatDate[2], formatDate[1] - 1, formatDate[0]);
        }
        return new Date(tDate);
        //year//month//day -> this is used when the format was dd/MM/yyyy
      };

      return {
        require: 'ngModel',
        restrict: "AE",
        scope: {
          locale: '@',
          options: '='
        },
        link: function (scope, elem, attrs, ngModel) {

          var dateInitial = new Date();
          var dateFinal = new Date();
          var optionsWeek = { weekday: "long" };
          var optionsMonth = { month: 'long' };
          var optionsYear = { year: 'numeric' };
          var optionsDay = { day: 'numeric' };
          var optionsAlmostComplete = { day: '2-digit', month: '2-digit', year: 'numeric' };

          scope.startDate = dateInitial.reverseFormat(dateInitial.toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.locale);
          scope.endDate = dateFinal.reverseFormat(dateFinal.toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.locale);
          scope.dateMap = {};

          scope.$watch('startDate', function (newValue, oldValue) {
            var tInitialDate = scope.startDate;
            var tEndDate = scope.endDate;
            scope.dateInput = tInitialDate.toLocaleDateString(attrs.locale, optionsAlmostComplete) + " - " + tEndDate.toLocaleDateString(attrs.locale, optionsAlmostComplete);
          });

          scope.$watch('endDate', function (newValue, oldValue) {
            var tInitialDate = scope.startDate;
            var tEndDate = scope.endDate;
            scope.dateInput = tInitialDate.toLocaleDateString(attrs.locale, optionsAlmostComplete) + " - " + tEndDate.toLocaleDateString(attrs.locale, optionsAlmostComplete);
          });

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

          var getRangeDate = function (currentDate, endDate) {
            var tempArray = [];
            endDate = new Date(endDate);
            currentDate.setHours(0, 0, 0, 0);
            endDate.setHours(0, 0, 0, 0);
            while (currentDate <= endDate) {
              tempArray.push(new Date(currentDate));
              currentDate.setDate(currentDate.getDate() + 1);
            }
            return tempArray;
          };

          var changeDate = function (tDate, isInital) {
            var month = tDate.toLocaleDateString(attrs.locale, optionsMonth).capitalizeFirstLetter();
            var year = tDate.toLocaleDateString(attrs.locale, optionsYear).capitalizeFirstLetter();

            if (isInital) {
              scope.dateInitialMap = { month: month, year: year, result: setRangeDay(tDate, isInital), date: scope.startDate };
              if (!scope.dateFinalMap) {
                scope.dateFinalMap = { month: month, year: year, result: setRangeDay(tDate), date: scope.endDate };
              }
            }
            else {
              scope.dateFinalMap = { month: month, year: year, result: setRangeDay(tDate), date: scope.endDate };
            }

            function setRangeDay(tDate) {
              var start = new Date(tDate.getFullYear(), tDate.getMonth(), 1);
              var end = new Date(tDate.getFullYear(), tDate.getMonth() + 1, 0);
              var weeks = [];
              var tDay = getLastSunday(new Date());
              for (var index = start.getDate(); index <= end.getDate(); index++) {
                start.setDate(index);
                if (start.toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter() == getLastSunday(new Date()).toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter() || weeks.length === 0) {
                  var week = {};

                  if (index === 1) {
                    for (var cont = 0; cont < 7; cont++) {
                      var dt = tDay;
                      week[getWeekDays(dt)[cont]] = {};
                      dt.setDate(dt.getDate() + cont);
                    }
                  }
                  weeks.push(week);
                }
                if (isInital) {
                  scope.startDate.setHours(0, 0, 0, 0);
                  weeks[weeks.length - 1][start.toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter()] =
                    {
                      date: new Date(start),
                      class: start.getTime() == scope.startDate.getTime() ? 'current-day-first' : '',
                      select: compareDate(start) ? 'hover-range-normal' : '',
                      isReadyOnly: (new Date(start) > scope.endDate)
                    };
                }
                else {
                  weeks[weeks.length - 1][start.toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter()] =
                    {
                      date: new Date(start),
                      class: start.getTime() == scope.endDate.getTime() ? 'current-day-last' : '',
                      select: compareDate(start) ? 'hover-range-normal' : '',
                      isReadyOnly: (new Date(start) < scope.startDate)
                    };
                }
                if (isInital) {
                  if (index === 1 && start.toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter() !== getLastSunday(start).toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter()) {
                    weeks.find(findFirstCalendarLast);
                  }
                }
                else {
                  if (index === 1 && start.toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter() !== getLastSunday(start).toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter()) {
                    weeks.find(findSecondCalendarLast);
                  }
                }

                if (isInital) {
                  if (index == getLastDayOfMonth(tDate) && start.toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter() !== getNextSaturday()) {
                    weeks.find(findFirstCalendarNext);
                  }
                }
                else {
                  if (index == getLastDayOfMonth(tDate) && start.toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter() !== getNextSaturday()) {
                    weeks.find(findSecondCalendarNext);
                  }
                }
              }
              return weeks;
            }
          };

          function getNextSaturday() {
            var now = new Date();
            now.setDate(now.getDate() + (6 + (7 - now.getDay())) % 7);
            return now.toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter();
          }

          function getDaySaturday(now) {
            now.setDate(now.getDate() + (7 + (7 - now.getDay())) % 7);
            return now.toLocaleDateString(attrs.locale, optionsDay);
          }

          function findFirstCalendarNext(element, index, array) {
            if (array.length === index + 1) {
              var dt = new Date(dateInitial);
              dt.setDate(getLastDayOfMonth(dt));
              setNextDaysOfNextMonth(element, dt, true);
            }
          }

          function findFirstCalendarLast(element, index, array) {
            var FIRST_WEEK = 0;
            if (index === FIRST_WEEK) {
              var td = new Date(dateInitial);
              setLastDaysOfLastMonth(element, td, true);
            }
          }

          function findSecondCalendarLast(element, index, array) {
            var FIRST_WEEK = 0;
            if (index === FIRST_WEEK) {
              var td = new Date(dateFinal);
              setLastDaysOfLastMonth(element, td);
            }
          }

          function findSecondCalendarNext(element, index, array) {
            if (array.length === index + 1) {
              var dt = new Date(dateFinal);
              dt.setDate(getLastDayOfMonth(dt));
              setNextDaysOfNextMonth(element, dt);
            }
          }

          function getLastDayOfWeek(day) {
            var now = new Date();
            now.setDate(now.getDate() + (day + (7 - now.getDay())) % 7);
            return now.toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter();
          }

          function getNextWeekLastDay(now) {
            var dt = new Date(now);
            dt.setDate(dt.getDate() + (7 + 6 - dt.getDay()) % 7);
            return dt;
          }

          function setNextDaysOfNextMonth(element, dt, isInital) {
            var nextSadurday = getNextWeekLastDay(dt);
            var lastDay = dt;
            lastDay.setHours(0, 0, 0, 0);
            nextSadurday.setHours(0, 0, 0, 0);
            lastDay.setDate(lastDay.getDate() + 1);
            while (lastDay <= nextSadurday) {
              var tempDate = lastDay;
              if (isInital) {
                element[new Date(tempDate).toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter()] =
                  {
                    date: new Date(lastDay),
                    class: 'next-month',
                    select: compareDate(tempDate) ? 'hover-range-normal' : '',
                    isReadyOnly: (lastDay > scope.endDate)
                  };
              }
              else {
                element[new Date(tempDate).toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter()] =
                  {
                    date: new Date(lastDay),
                    class: 'next-month',
                    select: compareDate(tempDate) ? 'hover-range-normal' : '',
                    isReadyOnly: false
                  };
              }
              lastDay.setDate(lastDay.getDate() + 1);
            }
          }

          function setLastDaysOfLastMonth(element, dt, isInital) {
            dt.setDate(1);
            if (getLastDayOfWeek(7) != dt.toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter()) {
              var lastSunday = getLastSunday(dt);
              var lastDayOfMonth = new Date(lastSunday.getUTCFullYear(), lastSunday.getUTCMonth() + 1, 0);
              lastSunday.setHours(0, 0, 0, 0);
              lastDayOfMonth.setHours(0, 0, 0, 0);
              while (lastSunday <= lastDayOfMonth) {
                var tempDate = lastSunday;
                if (isInital) {
                  element[new Date(tempDate).toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter()] =
                    {
                      date: new Date(lastSunday),
                      class: 'prev-month',
                      select: compareDate(tempDate) ? 'hover-range-normal' : '',
                      isReadyOnly: false
                    };
                }
                else {
                  element[new Date(tempDate).toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter()] =
                    {
                      date: new Date(lastSunday),
                      class: 'prev-month',
                      select: compareDate(tempDate) ? 'hover-range-normal' : '',
                      isReadyOnly: (lastSunday < scope.startDate)
                    };
                }
                lastSunday.setDate(lastSunday.getDate() + 1);
              }
            }
          }

          changeDate(dateInitial, true);
          changeDate(dateFinal);

          function getWeekDays() {
            var dt = new Date();
            dt = new Date(dt.getFullYear(), dt.getMonth(), getDaySaturday(dt));
            var weekList = [];
            var tDay = parseInt(getDaySaturday(dt));
            for (var index = 0; index < 7; index++) {
              var day = (tDay + index);
              var dtTemp = new Date(dt.getFullYear(), dt.getMonth(), day);
              weekList.push(dtTemp.toLocaleDateString(attrs.locale, optionsWeek).capitalizeFirstLetter());
            }
            return weekList;
          }

          function getFormatDate(tDate, format) {
            return $filter('date')(tDate, format);
          }

          function getLastDayOfMonth(tDate) {
            var dt = new Date(tDate.getUTCFullYear(), tDate.getUTCMonth() + 1, 0);
            return dt.toLocaleDateString(attrs.locale, optionsDay);
          }

          function setRangeDate() {
            var currentDate = scope.startDate.reverseFormat(scope.startDate.toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.locale);
            between = getRangeDate(currentDate, new Date(scope.endDate)).splice(0);
            changeDate(scope.startDate, true);
            changeDate(scope.endDate);
            ngModel.$setViewValue(between);
            ngModel.$render();
            console.log('quantity ', between.length);
          }

          function compareDate(tDate) {
            scope.startDate.setHours(0, 0, 0, 0);
            scope.endDate.setHours(0, 0, 0, 0);
            return (tDate >= scope.startDate && tDate <= scope.endDate);
          }

          scope.openModal = function () {
            scope.isOpen = !scope.isOpen;
          };

          scope.chooseInitalDay = function (dt) {
            dateInitial = dt.date;
            scope.startDate = dateInitial.reverseFormat(dateInitial.toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.locale);
            changeDate(dt.date, true);
            changeDate(scope.endDate);//this is to select td
            setRangeDate();
          };

          scope.chooseFinalDay = function (dt) {
            dateFinal = dt.date;
            scope.endDate = dateFinal.reverseFormat(dateFinal.toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.locale);
            changeDate(dt.date);
            changeDate(scope.startDate, true);//this is to select td
            setRangeDate();
          };

          scope.allWeeks = getWeekDays(new Date());

          scope.nextInitialMonth = function (isInital) {
            var DECEMBER = 11;
            if (isInital) {
              if (dateInitial.getMonth() == DECEMBER) {
                dateInitial = new Date(dateInitial.getFullYear() + 1, 0, 1);
              } else {
                dateInitial = new Date(dateInitial.getFullYear(), dateInitial.getMonth() + 1, 1);
              }
              scope.startDate = dateInitial.reverseFormat(dateInitial.toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.locale);
            }
            else {
              if (dateFinal.getMonth() == DECEMBER) {
                dateFinal = new Date(dateFinal.getFullYear() + 1, 0, 1);
              } else {
                dateFinal = new Date(dateFinal.getFullYear(), dateFinal.getMonth() + 1, 1);
              }
              scope.endDate = dateFinal.reverseFormat(dateFinal.toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.locale);
            }
            setRangeDate();
          };

          scope.lastInitialMonth = function (isInital) {
            var JANUARY = 0;
            if (isInital) {
              if (dateInitial.getMonth() === JANUARY) {
                dateInitial = new Date(dateInitial.getFullYear() - 1, 11, 1);
              } else {
                dateInitial = new Date(dateInitial.getFullYear(), dateInitial.getMonth() - 1, 1);
              }
              scope.startDate = dateInitial.reverseFormat(dateInitial.toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.locale);
            }
            else {
              if (dateFinal.getMonth() === JANUARY) {
                dateFinal = new Date(dateFinal.getFullYear() - 1, 11, 1);
              } else {
                dateFinal = new Date(dateFinal.getFullYear(), dateFinal.getMonth() - 1, 1);
              }
              scope.endDate = dateFinal.reverseFormat(dateFinal.toLocaleDateString(attrs.locale, optionsAlmostComplete), attrs.locale);
            }
            setRangeDate();
          };

          var between = [];
          between.push(getFormatDate(new Date()));
          ngModel.$setViewValue(between);

          angular.element(elem).on('change', function (event) {
            between = [];
            setRangeDate();
          });

          scope.selectYear = function () {
            var today = new Date();
            dateInitial = new Date();
            dateInitial.setMonth(today.getMonth() - 12);
            scope.startDate = dateInitial;
            scope.endDate = new Date();
            between = [];
            setRangeDate();
          };

          scope.selectSemester = function () {
            var today = new Date();
            dateInitial = new Date();
            dateInitial.setMonth(today.getMonth() - 6);
            scope.startDate = dateInitial;
            scope.endDate = new Date();
            between = [];
            setRangeDate();
          };

          scope.selectTrimester = function () {
            var today = new Date();
            dateInitial = new Date();
            dateInitial.setMonth(today.getMonth() - 3);
            scope.startDate = dateInitial;
            scope.endDate = new Date();
            between = [];
            setRangeDate();
          };

          scope.selectMonth = function () {
            var today = new Date();
            dateInitial = new Date();
            dateInitial.setMonth(today.getMonth() - 1);
            scope.startDate = dateInitial;
            scope.endDate = new Date();
            between = [];
            setRangeDate();
          };

          scope.selectWeek = function () {
            var today = new Date();
            dateInitial = new Date();
            dateInitial.setDate(today.getDate() - 7);
            scope.startDate = dateInitial;
            scope.endDate = new Date();
            between = [];
            setRangeDate();
          };

          scope.selectLastDay = function () {
            var today = new Date();
            dateInitial = new Date();
            dateInitial.setDate(today.getDate() - 1);
            scope.startDate = dateInitial;
            scope.endDate = dateInitial;
            between = [];
            setRangeDate();
          };

          scope.selectToday = function () {
            dateInitial = new Date();
            scope.startDate = new Date();
            scope.endDate = new Date();
            between = [];
            setRangeDate();
          };
        },
        templateUrl: '/timePicker.html'
      };
    }]);
})(angular);
