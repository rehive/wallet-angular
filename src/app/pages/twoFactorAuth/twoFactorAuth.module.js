(function () {
    'use strict';

    angular.module('BlurAdmin.pages.twoFactorAuth', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('twoFactorAuthentication', {
                url: '/twoFactorAuthentication',
                views:{
                    'securityViews':{
                        templateUrl: 'app/pages/twoFactorAuth/twoFactorAuth.html',
                        controller: 'TwoFactorAuthCtrl'
                    }
                }
            });
    }

})();
