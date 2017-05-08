(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('userBankAccount', userBankAccount);

    /** @ngInject */
    function userBankAccount() {
        return {
            restrict: 'E',
            controller: 'UserBankAccountCtrl',
            templateUrl: 'app/pages/users/userDetails/userBankAccount/userBankAccount.html'
        };
    }
})();
