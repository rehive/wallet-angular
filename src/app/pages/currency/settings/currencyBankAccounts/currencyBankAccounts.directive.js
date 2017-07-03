(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings')
        .directive('currencyBankAccounts', currencyBankAccounts);

    /** @ngInject */
    function currencyBankAccounts() {
        return {
            restrict: 'E',
            controller: 'currencyBankAccountsCtrl',
            templateUrl: 'app/pages/currency/settings/currencyBankAccounts/currencyBankAccounts.html'
        };
    }
})();