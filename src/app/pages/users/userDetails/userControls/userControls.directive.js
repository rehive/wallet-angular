(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('userControls', userControls);

    /** @ngInject */
    function userControls() {
        return {
            restrict: 'E',
            controller: 'UserControlsCtrl',
            templateUrl: 'app/pages/users/userDetails/userControls/userControls.html'
        };
    }
})();
