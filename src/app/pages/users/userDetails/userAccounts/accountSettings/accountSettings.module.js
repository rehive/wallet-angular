(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings', [
            'BlurAdmin.pages.accountSettings.accountCurrencyLimits',
            'BlurAdmin.pages.accountSettings.accountCurrencyFees',
            'BlurAdmin.pages.accountSettings.accountCurrencySwitches'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('accountSettings', {
                url: '/account/:reference/settings/:currencyCode',
                templateUrl: 'app/pages/users/userDetails/userAccounts/accountSettings/accountSettings.html',
                controller: "AccountSettingsCtrl",
                title: 'Account settings'
            });
    }

})();