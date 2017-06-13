
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.credit')
        .directive('confirmCredit', confirmCredit);

    /** @ngInject */
    function confirmCredit() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/transactions/credit/confirmCredit/confirmCredit.html'
        };
    }
})();
