(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings.tierRequirements', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('currency.settings.tierRequirements', {
                url: '/tier/requirements',
                views:{
                    'currencySettings':{
                      templateUrl: 'app/pages/currency/settings/tierRequirements/tierRequirements.html',
                      controller: "TierRequirementsCtrl"
                    }
                },
                title: 'Tier requirements'
            });
    }

})();
