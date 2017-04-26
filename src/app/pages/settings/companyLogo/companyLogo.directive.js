(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .directive('companyLogo', companyLogo);

    /** @ngInject */
    function companyLogo() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/settings/companyLogo/companyLogo.html'
        };
    }
})();
