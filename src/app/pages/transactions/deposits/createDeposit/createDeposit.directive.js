
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.deposits')
        .directive('createDeposit', createDeposit);

    /** @ngInject */
    function createDeposit() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/transactions/deposits/createDeposit/createDeposit.html'
        };
    }
})();
