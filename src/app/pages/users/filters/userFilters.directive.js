(function () {
    'use strict';

    angular.module('BlurAdmin.pages.users')
        .directive('userFilters', userFilters);

    /** @ngInject */
    function userFilters() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/users/filters/userFilters.html'
        };
    }
})();