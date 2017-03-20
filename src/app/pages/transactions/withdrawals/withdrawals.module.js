(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.withdrawals', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('transactions.withdrawals', {
                url: '/withdrawals',
                templateUrl: 'app/pages/transactions/withdrawals/withdrawals.html',
                controller: "WithdrawalsCtrl",
                title: 'Withdrawals',
                sidebarMeta: {
                    order: 200
                }
            });
    }

})();