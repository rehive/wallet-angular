(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.transfers')
        .directive('createTransfer', createTransfer);

    /** @ngInject */
    function createTransfer() {
        return {
            restrict: 'E',
            controller: 'TransfersCtrl',
            templateUrl: 'app/pages/transactions/transfers/createTransfer/createTransfer.html'
        };
    }
})();