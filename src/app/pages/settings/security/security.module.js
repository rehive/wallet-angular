(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.security', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('settings.security', {
                url: '/security',
                views: {
                  'generalSettings': {
                    controller: 'SecurityCtrl',
                    templateUrl: 'app/pages/settings/security/security.html'
                  }
                },
                title: "Security"
            });
    }

})();
