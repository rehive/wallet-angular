(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('addUserBankAccountView', addUserBankAccountView);

    /** @ngInject */
    function addUserBankAccountView() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/users/userDetails/userBankAccounts/addUserBankAccount/addUserBankAccount.html'
        };
    }
})();
