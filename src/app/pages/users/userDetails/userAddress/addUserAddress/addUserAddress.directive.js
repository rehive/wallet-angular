(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('addUserAddress', addUserAddress);

    /** @ngInject */
    function addUserAddress() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/users/userDetails/userAddress/addUserAddress/addUserAddress.html'
        };
    }
})();
