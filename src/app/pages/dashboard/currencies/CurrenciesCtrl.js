(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('CurrenciesCtrl', CurrenciesCtrl);

    /** @ngInject */
    function CurrenciesCtrl($scope) {

        $scope.currencyDetails = [{
            logo: "https://storage.googleapis.com/rehive-static/dashboard/dist/img/tokens/USD.png",
            pendingWithdrawals: 0,
            volume: 0
        },{
            logo: "https://storage.googleapis.com/rehive-static/dashboard/dist/img/tokens/EUR.png",
            pendingWithdrawals: 0,
            volume: 0
        },{
            logo: "https://storage.googleapis.com/rehive-static/dashboard/dist/img/tokens/XBT.png",
            pendingWithdrawals: 0,
            volume: 0
        },{
            logo: "https://storage.googleapis.com/rehive-static/dashboard/dist/img/tokens/USD.png",
            pendingWithdrawals: 20,
            volume: 30
        }];
    }

})();