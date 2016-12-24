(angular);
(function (angular) {
  'use strict';
  angular.module('BotPicker')
    .controller('BotPickerIndexCtrl', ['$scope', ($scope) => {

      $scope.demo = { searchDate: null };

      // var date = new Date();
      //date.setFullYear(2016, 11);
      //var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      //var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      //var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      //var allDays = [];
      //for (var index = 0; index < 11; index++) {
      // date.setFullYear(2016, index);

      // allDays = [{ month: months[index], days: }];

      //}
      //var monthsWithDate = [{ month: "Jan", days: }];

      //SetRangeDate(new Date());
      SetRangeDate();

      function SetRangeDate() {
        var date = new Date();
        var days = [];
        var start = new Date(date.getFullYear(), date.getMonth(), 1);
        var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        console.log('INIT ', t.getDay());
        console.log('END ', end);
        for (var index = start.getDay(); index <= end.getDay(); index++) {
          days.push(index);
        }

        console.log('days ', days);
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
