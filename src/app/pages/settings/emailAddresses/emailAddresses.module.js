(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.emails', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('settings.emails', {
                url: '/emails',
                views: {
                  'generalSettings': {
                    controller: 'EmailsCtrl',
                    templateUrl: 'app/pages/settings/emailAddresses/emailAddresses.html'
                  }
                },
                title: "Email Addresses"
            });
    }

})();
