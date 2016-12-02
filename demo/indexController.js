(angular);
(function (angular) {
  'use strict';
  angular.module('BotPicker')
    .controller('BotPickerIndexCtrl', ['$scope', ($scope) => {

        $scope.product = {date: "ola"};

        $scope.$watch('product', function (newValue, oldValue, scope) {
          console.log('lllN: ', newValue);
          console.log('lllO: ', oldValue);
          console.log('lllS', scope);
        }, true);
        console.log('1:', $scope);
        console.log('2:', $scope.mydate);


    }]);
})(window.angular);
