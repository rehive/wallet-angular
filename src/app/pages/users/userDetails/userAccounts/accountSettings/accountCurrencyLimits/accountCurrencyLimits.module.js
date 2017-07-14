(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings.accountCurrencyLimits', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('accountSettings.accountCurrencyLimits', {
                url: '/limits',
                title: 'Account Currency Limits',
                views:{
                    'accountSettings':{
                        templateUrl: 'app/pages/users/userDetails/userAccounts/accountSettings/accountCurrencyLimits/accountCurrencyLimits.html',
                        controller: "AccountCurrencyLimitsCtrl"
                    }
                }
            });
    }

})();