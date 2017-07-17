(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.userWebhooks', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('settings.userWebhooks', {
                url: '/user-webhooks',
                views: {
                  'generalSettings': {
                    controller: 'UserWebhooksCtrl',
                    templateUrl: 'app/pages/settings/userWebhooks/userWebhooks.html'
                  }
                },
                title: "User Webhooks"
            });
    }

})();
