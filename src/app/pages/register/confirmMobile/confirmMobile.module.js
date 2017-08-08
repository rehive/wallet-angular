(function () {
    'use strict';

    angular.module('BlurAdmin.pages.confirmMobile', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('confirmMobile', {
                url: '/mobile/confirm',
                views:{
                'admin':{
                templateUrl: 'app/pages/register/confirmMobile/confirmMobile.html',
                controller: 'ConfirmMobileCtrl'
                        }
                    }
                });
            }

})();
