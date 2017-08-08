(function () {
    'use strict';

    angular.module('BlurAdmin.pages.identityVerification', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('identityVerification', {
                url: '/identity/verification',
                views:{
                'admin':{
                templateUrl: 'app/pages/register/identityVerification/identityVerification.html',
                controller: 'IdentityVerificationCtrl'
                        }
                    }
                });
            }

})();
