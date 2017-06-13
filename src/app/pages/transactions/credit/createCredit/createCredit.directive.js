
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.credit')
        .directive('createCredit', createCredit);

    /** @ngInject */
    function createCredit() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/transactions/credit/createCredit/createCredit.html'
        };
    }
})();
