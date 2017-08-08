(function () {
    'use strict';

    angular.module('BlurAdmin.pages.emailVerify', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('emailVerify', {
                url: '/email/verify',
                views:{
                    'admin':{
                        templateUrl: 'app/pages/register/emailVerify/emailVerify.html',
                        controller: 'EmailVerifyCtrl'
                    }
                }
            });
    }

})();
