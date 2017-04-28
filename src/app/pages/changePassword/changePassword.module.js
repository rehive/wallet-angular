(function () {
    'use strict';

    angular.module('BlurAdmin.pages.changePassword', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('changePassword', {
                url: '/password/change',
                views:{
                    'securityViews':{
                        templateUrl: 'app/pages/changePassword/changePassword.html',
                        controller: 'ChangePasswordCtrl'
                    }
                }
            });
    }

})();
