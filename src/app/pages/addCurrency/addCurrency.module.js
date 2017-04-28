(function () {
    'use strict';

    angular.module('BlurAdmin.pages.addCurrency', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('addCurrency', {
                url: '/currency/add',
                templateUrl: 'app/pages/addCurrency/addCurrency.html',
                controller: 'AddCurrencyCtrl',
                title: 'Currency'
            });
    }

})();
