(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.addService', [
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('addService', {
                url: '/services/add',
                templateUrl: 'app/pages/services/addService/addService.html',
                controller: "AddServiceCtrl",
                title: 'Add service'
            });
    }

})();
