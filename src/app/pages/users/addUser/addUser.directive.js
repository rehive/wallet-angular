(function () {
    'use strict';

    angular.module('BlurAdmin.pages.users')
        .directive('addUser', addUser);

    /** @ngInject */
    function addUser() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/users/addUser/addUser.html'
        };
    }
})();