
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.credit')
        .directive('creditMenu', creditMenu);

    /** @ngInject */
    function creditMenu() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/transactions/credit/creditMenu/creditMenu.html'
        };
    }
})();
