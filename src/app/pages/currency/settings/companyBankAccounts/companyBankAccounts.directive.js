(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings')
        .directive('companyBankAccounts', companyBankAccounts);

    /** @ngInject */
    function companyBankAccounts() {
        return {
            restrict: 'E',
            controller: 'CompanyBankAccountsCtrl',
            templateUrl: 'app/pages/currency/settings/companyBankAccounts/companyBankAccounts.html'
        };
    }
})();