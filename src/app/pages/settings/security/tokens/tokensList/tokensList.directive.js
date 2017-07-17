(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.security')
        .directive('tokensList', tokensList);

    /** @ngInject */
    function tokensList() {
        return {
            restrict: 'E',
            controller: 'SecurityCtrl',
            templateUrl: 'app/pages/settings/security/tokens/tokensList/tokensList.html'
        };
    }
})();
