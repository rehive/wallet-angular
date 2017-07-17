(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.accountInfo', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('settings.accountInfo', {
                url: '/account-info',
                views: {
                  'generalSettings': {
                    templateUrl: 'app/pages/settings/accountInfo/accountInfo.html',
                    controller: "AccountInfoCtrl",
                  }
                },
                title: "Account Info"
            });
    }

})();
