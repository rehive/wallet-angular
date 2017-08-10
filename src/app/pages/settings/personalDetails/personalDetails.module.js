(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.personalDetails', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('settings.personalDetails', {
                url: '/personal-details',
                views: {
                  'generalSettings': {
                    templateUrl: 'app/pages/settings/personalDetails/personalDetails.html',
                    controller: "PersonalDetailsCtrl"
                  }
                },
                title: "Personal Details"
            });
    }

})();
