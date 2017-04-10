(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.settings')
        .directive('bankAccounts', bankAccounts);

    /** @ngInject */
    function bankAccounts() {
        return {
            restrict: 'E',
            controller: 'SettingsCtrl',
            templateUrl: 'app/pages/transactions/settings/bankAccounts/bankAccounts.html'
        };
    }
})();