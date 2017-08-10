(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verifyUserEmail', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('verifyUserEmail', {
                url: '/email/verify/:key',
                views:{
                    'admin':{
                        controller: 'VerifyUserEmailCtrl'
                    }
                }
            });
    }

})();
