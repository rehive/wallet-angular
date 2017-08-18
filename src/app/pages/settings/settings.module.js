(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings', [
      'BlurAdmin.pages.settings.personalDetails',
      'BlurAdmin.pages.settings.address',
      'BlurAdmin.pages.settings.bankAccounts',
      'BlurAdmin.pages.settings.bitcoinAddresses',
      'BlurAdmin.pages.settings.notifications',
      'BlurAdmin.pages.settings.security',
      'BlurAdmin.pages.settings.emails',
      'BlurAdmin.pages.settings.mobiles'
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
