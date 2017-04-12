
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.deposits')
        .directive('depositsMenu', depositsMenu);

    /** @ngInject */
    function depositsMenu() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/transactions/deposits/depositsMenu/depositsMenu.html'
        };
    }
})();
