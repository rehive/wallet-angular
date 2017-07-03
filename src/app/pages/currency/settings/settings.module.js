(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('currency.settings', {
                url: '/settings',
                templateUrl: 'app/pages/currency/settings/settings.html',
                controller: "CurrencySettingsCtrl",
                title: 'Settings',
                sidebarMeta: {
                    order: 500
                }
            });
    }

})();
