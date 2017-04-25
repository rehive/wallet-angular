(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services', [
        "BlurAdmin.pages.services.bitcoinService",
        "BlurAdmin.pages.services.bitcoinService.bitcoinServiceTransactions",
        "BlurAdmin.pages.services.bitcoinService.bitcoinServiceUsers"
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
                    icon: 'ion-briefcase',
                    order: 300
                }
            });
    }

})();
