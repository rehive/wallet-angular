(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .directive('companyInfo', companyInfo);

    /** @ngInject */
    function companyInfo() {
        return {
            restrict: 'E',
            controller: 'CompanyInfoCtrl',
            templateUrl: 'app/pages/settings/companyInfo/companyInfo.html'
        };
    }
})();
