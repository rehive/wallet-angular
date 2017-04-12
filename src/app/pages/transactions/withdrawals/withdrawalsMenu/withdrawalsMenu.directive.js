
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.withdrawals')
        .directive('withdrawalsMenu', withdrawalsMenu);

    /** @ngInject */
    function withdrawalsMenu() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/transactions/withdrawals/withdrawalsMenu/withdrawalsMenu.html'
        };
    }
})();
