(function () {
    'use strict';

    angular.module('BlurAdmin.pages')
        .directive('authNavigation', authNavigation);

    /** @ngInject */
    function authNavigation() {
        return {
            restrict: 'E',
            require: 'parent',
            templateUrl: 'app/pages/authNavigation/authNavigation.html'
        };
    }
})();