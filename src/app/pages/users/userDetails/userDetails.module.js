(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('userDetails', {
                url: '/user/details',
                templateUrl: 'app/pages/users/userDetails/userDetails.html',
                controller: "UserDetailsCtrl",
                title: 'User Details'
            });
    }

})();