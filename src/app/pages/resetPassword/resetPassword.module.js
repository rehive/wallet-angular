(function () {
    'use strict';

    angular.module('BlurAdmin.pages.resetPassword', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('resetPassword', {
                url: '/resetPassword',
                views:{
                    'admin':{
                        templateUrl: 'app/pages/resetPassword/resetPassword.html',
                        controller: 'ResetPasswordCtrl'
                    }
                }
            });
    }

})();
