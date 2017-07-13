(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('createUserSwitch', createUserSwitch);

    /** @ngInject */
    function createUserSwitch() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/users/userDetails/userSwitches/createUserSwitch/createUserSwitch.html'
        };
    }
})();
