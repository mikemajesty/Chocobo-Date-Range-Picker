(angular);
(function (angular) {
  'use strict';
  angular.module('BotPicker')
    .controller('BotPickerIndexCtrl', ['$scope', ($scope) => {

        $scope.demo = { searchDate: null };

        $scope.options = {
          txtDateInit: 'Demo: Start Date',
          txtDateEnd: 'Demo: End Date',
          button:
          {
            btnMonth: { txt: 'Demo: Month' },
            btnYear: {txt: 'Demo: Year'},
            btnSemester: {txt: 'Demo: Semester'},
            btnLastDay: {txt: 'Demo: Last Day'}
          }
        };

    }]);
})(window.angular);
