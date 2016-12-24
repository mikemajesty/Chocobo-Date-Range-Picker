(angular);
(function (angular) {
  'use strict';
  angular.module('BotPicker')
    .controller('BotPickerIndexCtrl', ['$scope', ($scope) => {

      $scope.demo = { searchDate: null };

      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var dateMap = [];
      
      for (var index = 0; index < months.length; index++) {
        var date = new Date();
        date.setMonth(index);
        dateMap.push([{ month: months[index], days: setRangeDay(date)}]);
      }

      function setRangeDay(date) {
        var days = [];
        var start = new Date(date.getFullYear(), date.getMonth(), 1);
        var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        for (var index = start.getDate(); index <= end.getDate(); index++) {
          days.push(index);
        }

        return days;
      }

      $scope.options = {
        txtDateInit: 'Demo: Start Date',
        txtDateEnd: 'Demo: End Date',
        buttons:
        {
          btnMonth: { txt: 'Demo: Month' },
          btnYear: { txt: 'Demo: Year' },
          btnSemester: { txt: 'Demo: Semester' },
          btnTrimester: { txt: 'Demo: Trimester' },
          btnLastDay: { txt: 'Demo: Last Day' },
          btnToday: { txt: 'Demo: Today' },
          btnWeek: { txt: 'Demo: Week' },
        }
      };

    }]);
})(window.angular);
