(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.adminEmails', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('settings.adminEmails', {
                url: '/admin/emails',
                views: {
                  'generalSettings': {
                    templateUrl: 'app/pages/settings/accountInfo/adminEmails/adminEmails.html',
                    controller: "AdminEmailsCtrl",
                  }
                },
                title: "Admin Emails"
            });
    }

})();
