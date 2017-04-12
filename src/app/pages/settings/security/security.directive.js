(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .directive('security', security);

    /** @ngInject */
    function security() {
        return {
            restrict: 'E',
            controller: 'SecurityCtrl',
            templateUrl: 'app/pages/settings/security/security.html'
        };
    }
})();
