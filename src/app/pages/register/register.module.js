(function () {
    'use strict';

    angular.module('BlurAdmin.pages.register', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('register', {
                url: '/register',
                views:{
                    'admin':{
                        templateUrl: 'app/pages/register/register.html',
                        controller: 'RegisterCtrl'
                    }
                }
            });
    }

})();
