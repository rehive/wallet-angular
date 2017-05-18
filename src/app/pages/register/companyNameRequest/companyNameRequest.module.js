(function () {
    'use strict';

    angular.module('BlurAdmin.pages.companyNameRequest', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('companyNameRequest', {
                url: '/company/name_request',
                views:{
                    'admin':{
                        templateUrl: 'app/pages/register/companyNameRequest/companyNameRequest.html',
                        controller: 'CompanyNameRequestCtrl'
                    }
                }
            });
    }

})();
