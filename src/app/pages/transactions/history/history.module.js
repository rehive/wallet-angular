(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.history', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('transactions.history', {
                url: '/history',
                templateUrl: 'app/pages/transactions/history/history.html',
                controller: "HistoryCtrl",
                title: 'History',
                sidebarMeta: {
                    order: 100
                }
            });
    }

})();