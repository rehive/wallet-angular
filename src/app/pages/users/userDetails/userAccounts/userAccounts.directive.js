(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('userAccounts', userAccounts);

    /** @ngInject */
    function userAccounts() {
        return {
            restrict: 'E',
            controller: 'UserAccountsCtrl',
            templateUrl: 'app/pages/users/userDetails/userAccounts/userAccounts.html'
        };
    }
})();
