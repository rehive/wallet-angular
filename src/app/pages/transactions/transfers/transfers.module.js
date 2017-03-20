(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.transfers', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('transactions.transfers', {
                url: '/transfers',
                templateUrl: 'app/pages/transactions/transfers/transfers.html',
                controller: "TransfersCtrl",
                title: 'Transfers',
                sidebarMeta: {
                    order: 400
                }
            });
    }

})();