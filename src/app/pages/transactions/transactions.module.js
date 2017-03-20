(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions', [
            'BlurAdmin.pages.transactions.overview',
            'BlurAdmin.pages.transactions.history',
            'BlurAdmin.pages.transactions.withdrawals',
            'BlurAdmin.pages.transactions.deposits',
            'BlurAdmin.pages.transactions.transfers',
            'BlurAdmin.pages.transactions.settings'
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('transactions', {
                url: '/transactions',
                template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                title: 'Transactions',
                sidebarMeta: {
                    icon: 'ion-arrow-swap',
                    order: 100
                }
            });
    }

})();