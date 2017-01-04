(angular);
(function (angular) {
  'use strict';
  angular.module('BotPicker')
    .controller('BotPickerIndexCtrl', ['$scope', ($scope) => {

      $scope.demo = { searchDate: null };
      
      $scope.options = {
        txtDateInit: 'Demo: Date',
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
