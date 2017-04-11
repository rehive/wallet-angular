(function () {
    'use strict';

    angular.module('BlurAdmin.pages.users')
        .directive('userTable', userTable);

    /** @ngInject */
    function userTable() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/users/userTable/userTable.html'
        };
    }
})();