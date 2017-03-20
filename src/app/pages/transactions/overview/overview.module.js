(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.overview', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('transactions.overview', {
                url: '/overview',
                templateUrl: 'app/pages/transactions/overview/overview.html',
                controller: "OverviewCtrl",
                title: 'Overview',
                sidebarMeta: {
                    order: 0
                }
            });
    }

})();