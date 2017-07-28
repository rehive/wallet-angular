(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services', [
        "BlurAdmin.pages.services.bitcoinService",
        "BlurAdmin.pages.services.stellarService",
        'BlurAdmin.pages.services.notificationService',
        'BlurAdmin.pages.services.addService'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('services', {
                url: '/services',
                templateUrl: 'app/pages/services/services.html',
                controller: "ServicesCtrl",
                title: 'Services',
                sidebarMeta: {
                    order: 300
                }
            });
    }

})();
