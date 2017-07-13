(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings')
        .directive('accountCurrencyFees', accountCurrencyFees);

    /** @ngInject */
    function accountCurrencyFees() {
        return {
            restrict: 'E',
            controller: 'AccountCurrencyFeesCtrl',
            templateUrl: 'app/pages/users/userDetails/userAccounts/accountSettings/accountCurrencyFees/accountCurrencyFees.html'
        };
    }
})();
