(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings.tierLimits', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('currency.settings.tierLimits', {
                url: '/tier/limits',
                templateUrl: 'app/pages/currency/settings/tierLimits/tierLimits.html',
                controller: "TierLimitsCtrl",
                title: 'Tier Limits'
            });
    }

})();
