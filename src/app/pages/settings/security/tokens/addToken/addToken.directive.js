(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.security')
        .directive('addTokenView', addTokenView);

    /** @ngInject */
    function addTokenView() {
        return {
            restrict: 'E',
            controller: 'SecurityCtrl',
            templateUrl: 'app/pages/settings/security/tokens/addToken/addToken.html'
        };
    }
})();
