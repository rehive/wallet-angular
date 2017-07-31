(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('userProfilePicture', userProfilePicture);

    /** @ngInject */
    function userProfilePicture() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/users/userDetails/userProfilePicture/userProfilePicture.html'
        };
    }
})();
