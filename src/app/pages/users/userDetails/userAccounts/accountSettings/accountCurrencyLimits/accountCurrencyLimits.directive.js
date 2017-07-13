(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings')
        .directive('accountCurrencyLimits', accountCurrencyLimits);

    /** @ngInject */
    function accountCurrencyLimits() {
        return {
            restrict: 'E',
            controller: 'AccountCurrencyLimitsCtrl',
            templateUrl: 'app/pages/users/userDetails/userAccounts/accountSettings/accountCurrencyLimits/accountCurrencyLimits.html'
        };
    }
})();
