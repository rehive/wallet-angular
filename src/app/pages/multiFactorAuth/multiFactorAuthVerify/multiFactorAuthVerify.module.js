(function () {
    'use strict';

    angular.module('BlurAdmin.pages.multiFactorAuthVerify', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('multiFactorAuthVerify', {
                url: '/authentication/multi-factor/verify/:authType',
                views:{
                    'admin':{
                        templateUrl: 'app/pages/multiFactorAuth/multiFactorAuthVerify/multiFactorAuthVerify.html',
                        controller: 'MultiFactorAuthVerifyCtrl'
                    }
                }
            });
    }

})();
