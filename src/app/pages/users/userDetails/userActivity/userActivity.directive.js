(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('userActivity', userActivity);

    /** @ngInject */
    function userActivity() {
        return {
            restrict: 'E',
            controller: 'UserActivityCtrl',
            templateUrl: 'app/pages/users/userDetails/userActivity/userActivity.html'
        };
    }
})();
