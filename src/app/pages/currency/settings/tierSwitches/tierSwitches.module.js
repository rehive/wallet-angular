(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings.tierSwitches', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('currency.settings.tierSwitches', {
                url: '/tier/switches',
                views:{
                    'currencySettings':{
                      templateUrl: 'app/pages/currency/settings/tierSwitches/tierSwitches.html',
                      controller: "TierSwitchesCtrl"
                    }
                },
                title: 'Tier switches'
            });
    }

})();
