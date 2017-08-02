(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('userEmails', userEmails);

    /** @ngInject */
    function userEmails() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/users/userDetails/userAccountInfo/userEmails/userEmails.html'
        };
    }
})();
