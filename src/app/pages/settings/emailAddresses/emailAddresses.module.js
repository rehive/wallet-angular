(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.switches', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('settings.switches', {
                url: '/switches',
                views: {
                  'generalSettings': {
                    controller: 'SwitchesCtrl',
                    templateUrl: 'app/pages/settings/switches/switches.html'
                  }
                },
                title: "Global switches"
            });
    }

})();
