(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verification', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('verification', {
                url: '/verification',
                views:{
                    'admin':{
                        templateUrl: 'app/pages/register/verification/verification.html',
                        controller: 'VerificationCtrl'
                    }
                }
            });
    }

})();
