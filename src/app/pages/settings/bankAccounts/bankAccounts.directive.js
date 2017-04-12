(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .directive('bankAccounts', bankAccounts);

    /** @ngInject */
    function bankAccounts() {
        return {
            restrict: 'E',
            controller: 'BankAccountsCtrl',
            templateUrl: 'app/pages/settings/bankAccounts/bankAccounts.html'
        };
    }
})();
