(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.deposits')
        .controller('DepositsCtrl', DepositsCtrl);

    /** @ngInject */
    function DepositsCtrl($rootScope,$scope,IMAGEURL) {

        $scope.showAdvancedOption = true;

        $scope.initialize = function () {
            $scope.currencyImageUrl = IMAGEURL + $rootScope.selectedCurrency.code + '.png';
        };

        $rootScope.$watch('selectedCurrency',function(){
            $scope.currencyImageUrl = IMAGEURL + $rootScope.selectedCurrency.code + '.png';
        });


    }

})();