
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.credit')
        .directive('completeCredit', completeCredit);

    /** @ngInject */
    function completeCredit() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/transactions/credit/completeCredit/completeCredit.html'
        };
    }
})();
