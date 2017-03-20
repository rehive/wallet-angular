(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings', [])
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
                    icon: 'ion-settings',
                    order: 400
                }
            });
    }

})();