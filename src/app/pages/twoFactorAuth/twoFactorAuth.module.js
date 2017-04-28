(function () {
    'use strict';

    angular.module('BlurAdmin.pages.twoFactorAuth', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('twoFactorAuthentication', {
                url: '/authentication/two-factor',
                views:{
                    'securityViews':{
                        templateUrl: 'app/pages/twoFactorAuth/twoFactorAuth.html',
                        controller: 'TwoFactorAuthCtrl'
                    }
                }
            });
    }

})();
