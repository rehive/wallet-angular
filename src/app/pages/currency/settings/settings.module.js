(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings', [
      'BlurAdmin.pages.currency.settings.companyBankAccounts',
      'BlurAdmin.pages.currency.settings.tiers',
      'BlurAdmin.pages.currency.settings.tierRequirements',
      'BlurAdmin.pages.currency.settings.tierLimits',
      'BlurAdmin.pages.currency.settings.tierFees'
    ])
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
