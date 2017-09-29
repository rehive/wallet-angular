(function () {
    'use strict';

    angular.module('BlurAdmin.pages.signout', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('signout', {
                url: '/signout',
                controller: function($rootScope,cookieManagement,$location){
                    $rootScope.gotToken = false;
                    cookieManagement.deleteCookie('TOKEN');
                    $location.path('/login');
                }
            });
    }

})();