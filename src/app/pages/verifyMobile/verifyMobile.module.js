(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verifyMobile', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('verifyMobile', {
                url: '/mobile/verify',
                views:{
                'admin':{
                templateUrl: 'app/pages/verifyMobile/verifyMobile.html',
                controller: 'VerifyMobileCtrl'
                        }
                    }
                });
            }

})();
