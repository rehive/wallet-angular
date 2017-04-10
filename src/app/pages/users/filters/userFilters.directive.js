(function () {
    'use strict';

    angular.module('BlurAdmin.pages.users')
        .directive('userFilters', userFilters);

    /** @ngInject */
    function userFilters() {
        return {
            restrict: 'E',
            controller: 'UsersCtrl',
            templateUrl: 'app/pages/users/filters/userFilters.html'
        };
    }
})();