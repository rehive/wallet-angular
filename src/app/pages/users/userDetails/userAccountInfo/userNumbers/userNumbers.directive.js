(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('userNumbers', userNumbers);

    /** @ngInject */
    function userNumbers() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/users/userDetails/userAccountInfo/userNumbers/userNumbers.html'
        };
    }
})();
