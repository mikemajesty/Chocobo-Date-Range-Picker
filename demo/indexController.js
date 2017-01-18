(angular);
(function (angular) {
  'use strict';
  angular.module('chocoboRangePicker')
    .controller('ChocoboIndexCtrl', ['$scope', ($scope) => {

      $scope.demo = { searchDate: null };

      $scope.options = {
        txtDateInit: 'Demo: Date',
        buttons: 
        {
          btnYear: { txt: 'Demo: Year', tooltip: "Choose Year" },
          btnSemester: { txt: 'Demo: Semester', tooltip: "Choose Semester" },
          btnTrimester: { txt: 'Demo: Trimester', tooltip: "Choose Trimester" },
          btnMonth: { txt: 'Demo: Month', tooltip: "Choose Month" },
          btnWeek: { txt: 'Demo: Week', tooltip: "Choose Week" },
          btnToday: { txt: 'Demo: Today', tooltip: "Choose Today" },
          btnLastDay: { txt: 'Demo: Last Day', tooltip: "Choose Last Day" }
        },
        inputConfig: 
        {
          showIcon: false,
          iconPath: "http://www.racedepartment.com/images/rd_calext/calendar.png"
        }
      };

    }]);
})(window.angular);
