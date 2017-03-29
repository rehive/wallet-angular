(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.transfers')
        .directive('transfersMenu', transfersMenu);

    /** @ngInject */
    function transfersMenu() {
        return {
            restrict: 'E',
            controller: 'TransfersCtrl',
            templateUrl: 'app/pages/transactions/transfers/transfersMenu/transfersMenu.html'
        };
    }
})();