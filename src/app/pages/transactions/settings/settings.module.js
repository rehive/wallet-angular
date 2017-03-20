(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.settings', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('transactions.settings', {
                url: '/settings',
                templateUrl: 'app/pages/transactions/settings/settings.html',
                controller: "SettingsCtrl",
                title: 'Settings',
                sidebarMeta: {
                    order: 500
                }
            });
    }

})();