(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings')
        .directive('editAccountCurrencyFee', editAccountCurrencyFee);

    /** @ngInject */
    function editAccountCurrencyFee() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/users/userDetails/userAccounts/accountSettings/accountCurrencyFees/editAccountCurrencyFee/editAccountCurrencyFee.html'
        };
    }
})();
