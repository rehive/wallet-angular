(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('userAccountInfo', userAccountInfo);

    /** @ngInject */
    function userAccountInfo() {
        return {
            restrict: 'E',
            controller: 'UserAccountInfoCtrl',
            templateUrl: 'app/pages/users/userDetails/userAccountInfo/userAccountInfo.html'
        };
    }
})();
