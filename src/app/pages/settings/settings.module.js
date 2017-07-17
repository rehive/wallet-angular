(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings', [
      'BlurAdmin.pages.settings.accountInfo',
      'BlurAdmin.pages.settings.adminEmails',
      'BlurAdmin.pages.settings.companyInfo',
      'BlurAdmin.pages.settings.bankAccounts',
      'BlurAdmin.pages.settings.subtypes',
      'BlurAdmin.pages.settings.transactionWebhooks',
      'BlurAdmin.pages.settings.userWebhooks',
      'BlurAdmin.pages.settings.permissionsAndManagement',
      'BlurAdmin.pages.settings.notifications',
      'BlurAdmin.pages.settings.switches',
      'BlurAdmin.pages.settings.transactionsSwitches',
      'BlurAdmin.pages.settings.security'
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
