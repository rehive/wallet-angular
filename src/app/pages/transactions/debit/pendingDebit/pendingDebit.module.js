(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.debit.pendingDebit', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('transactions.debit.pendingDebit', {
                url: '/pending',
                views: {
                    "pendingDebitView": {
                        templateUrl: 'app/pages/transactions/debit/pendingDebit/pendingDebit.html',
                        controller: "PendingDebitCtrl"
                    }
                },
                title: 'Pending debits'
            });
    }

})();
