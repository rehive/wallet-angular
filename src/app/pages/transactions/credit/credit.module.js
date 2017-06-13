(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.credit', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('transactions.credit', {
                url: '/credit',
                templateUrl: 'app/pages/transactions/credit/credit.html',
                controller: "CreditCtrl",
                params: {
                  email: null
                },
                title: 'Credit',
                sidebarMeta: {
                    order: 300
                }
            });
    }

})();
