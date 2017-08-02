(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('addUserEmail', addUserEmail);

    /** @ngInject */
    function addUserEmail() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/users/userDetails/userAccountInfo/addUserEmail/addUserEmail.html'
        };
    }
})();
