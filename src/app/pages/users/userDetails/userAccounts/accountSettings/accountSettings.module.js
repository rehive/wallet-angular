(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('accountSettings', {
                url: '/account/settings/:currency',
                templateUrl: 'app/pages/users/userDetails/userAccounts/accountSettings/accountSettings.html',
                controller: "AccountSettingsCtrl",
                title: 'Account Settings'
            });
    }

})();