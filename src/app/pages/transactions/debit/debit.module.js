(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.debit', [
            'BlurAdmin.pages.transactions.debit.pendingDebit'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('transactions.debit', {
                url: '/debit',
                templateUrl: 'app/pages/transactions/debit/debit.html',
                controller: "DebitCtrl",
                params: {
                  email: null
                },
                title: 'Debits',
                sidebarMeta: {
                    order: 200
                }
            });
    }

})();
