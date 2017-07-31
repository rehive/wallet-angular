(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('editUserBasicInfo', editUserBasicInfo);

    /** @ngInject */
    function editUserBasicInfo() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/users/userDetails/userBasicInfo/editUserBasicInfo/editUserBasicInfo.html'
        };
    }
})();
