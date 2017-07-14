(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings.accountCurrencyLimits')
        .directive('editAccountCurrencyLimit', editAccountCurrencyLimit);

    /** @ngInject */
    function editAccountCurrencyLimit() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/users/userDetails/userAccounts/accountSettings/accountCurrencyLimits/editAccountCurrencyLimit/editAccountCurrencyLimit.html'
        };
    }
})();
