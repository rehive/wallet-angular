(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.deposits', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('transactions.deposits', {
                url: '/deposits',
                templateUrl: 'app/pages/transactions/deposits/deposits.html',
                controller: "DepositsCtrl",
                title: 'Deposits',
                sidebarMeta: {
                    order: 300
                }
            });
    }

})();