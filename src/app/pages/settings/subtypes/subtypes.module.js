(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.subtypes', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('settings.subtypes', {
                url: '/subtypes',
                views: {
                  'generalSettings': {
                    controller: 'SubtypesCtrl',
                    templateUrl: 'app/pages/settings/subtypes/subtypes.html'
                  }
                },
                title: "Subtypes"
            });
    }

})();
