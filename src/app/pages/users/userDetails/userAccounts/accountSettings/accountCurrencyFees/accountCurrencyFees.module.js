(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings.accountCurrencyFees', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('accountSettings.accountCurrencyFees', {
                url: '/fees',
                title: 'Account Currency Fees',
                views:{
                    'accountSettings':{
                        templateUrl: 'app/pages/users/userDetails/userAccounts/accountSettings/accountCurrencyFees/accountCurrencyFees.html',
                        controller: "AccountCurrencyFeesCtrl"
                    }
                }
            });
    }

})();