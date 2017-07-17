(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings', [
      'BlurAdmin.pages.settings.accountInfo',
      'BlurAdmin.pages.settings.adminEmails'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('settings', {
                url: '/settings',
                templateUrl: 'app/pages/settings/settings.html',
                controller: "SettingsCtrl",
                title: 'Settings',
                sidebarMeta: {
                    order: 400
                }
            });
    }

})();
