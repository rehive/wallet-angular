(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings')
        .directive('accountCurrencySwitches', accountCurrencySwitches);

    /** @ngInject */
    function accountCurrencySwitches() {
        return {
            restrict: 'E',
            controller: 'AccountCurrencySwitchesCtrl',
            templateUrl: 'app/pages/users/userDetails/userAccounts/accountSettings/accountCurrencySwitches/accountCurrencySwitches.html'
        };
    }
})();
