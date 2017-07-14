(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings.accountCurrencySwitches', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('accountSettings.accountCurrencySwitches', {
                url: '/switches',
                title: 'Account Currency Switches',
                views:{
                    'accountSettings':{
                        templateUrl: 'app/pages/users/userDetails/userAccounts/accountSettings/accountCurrencySwitches/accountCurrencySwitches.html',
                        controller: "AccountCurrencySwitchesCtrl"
                    }
                }
            });
    }

})();