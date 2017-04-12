(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .directive('permissionsAndManagement', permissionsAndManagement);

    /** @ngInject */
    function permissionsAndManagement() {
        return {
            restrict: 'E',
            controller: 'PermissionsAndManagementCtrl',
            templateUrl: 'app/pages/settings/permissionsAndManagement/permissionsAndManagement.html'
        };
    }
})();
