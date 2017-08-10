(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.address', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('settings.address', {
                url: '/address',
                views: {
                  'generalSettings': {
                    templateUrl: 'app/pages/settings/address/address.html',
                    controller: "AddressCtrl"
                  }
                },
                title: "Address"
            });
    }

})();
