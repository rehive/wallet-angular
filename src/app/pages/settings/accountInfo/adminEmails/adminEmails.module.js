(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.adminEmails', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('adminEmails', {
                url: '/admin/emails',
                templateUrl: 'app/pages/settings/accountInfo/adminEmails/adminEmails.html',
                controller: "AdminEmailsCtrl",
                title: "Admin Emails"
            });
    }

})();


