(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.mobiles', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('settings.mobiles', {
                url: '/mobiles',
                views: {
                  'generalSettings': {
                    controller: 'MobilesCtrl',
                    templateUrl: 'app/pages/settings/mobiles/mobiles.html'
                  }
                },
                title: "Mobile numbers"
            });
    }

})();
