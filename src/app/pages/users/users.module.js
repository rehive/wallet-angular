(function () {
    'use strict';

    angular.module('BlurAdmin.pages.users', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('users', {
                url: '/users',
                templateUrl: 'app/pages/users/users.html',
                controller: "UsersCtrl",
                title: 'Users',
                sidebarMeta: {
                    icon: 'ion-person-stalker',
                    order: 200
                }
            });
    }

})();