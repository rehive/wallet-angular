(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings', [
      'BlurAdmin.pages.settings.accountInfo',
      'BlurAdmin.pages.settings.adminEmails',
      'BlurAdmin.pages.settings.companyInfo',
      'BlurAdmin.pages.settings.bankAccounts'
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
