(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings.companyBankAccounts', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('currency.settings.companyBankAccounts', {
                url: '/bank-accounts',
                templateUrl: 'app/pages/currency/settings/companyBankAccounts/companyBankAccounts.html',
                controller: "CompanyBankAccountsCtrl",
                title: 'Bank Accounts'
            });
    }

})();
