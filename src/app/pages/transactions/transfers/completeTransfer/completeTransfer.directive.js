(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.transfers')
        .directive('completeTransfer', completeTransfer);

    /** @ngInject */
    function completeTransfer() {
        return {
            restrict: 'E',
            controller: 'TransfersCtrl',
            templateUrl: 'app/pages/transactions/transfers/completeTransfer/completeTransfer.html'
        };
    }
})();