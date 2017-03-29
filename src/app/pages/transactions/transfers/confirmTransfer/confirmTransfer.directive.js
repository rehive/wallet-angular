(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.transfers')
        .directive('confirmTransfer', confirmTransfer);

    /** @ngInject */
    function confirmTransfer() {
        return {
            restrict: 'E',
            controller: 'TransfersCtrl',
            templateUrl: 'app/pages/transactions/transfers/confirmTransfer/confirmTransfer.html'
        };
    }
})();