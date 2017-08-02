(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.permissionsAndManagement', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('settings.permissionsAndManagement', {
                url: '/permissions-and-management',
                views: {
                  'generalSettings': {
                    controller: 'PermissionsAndManagementCtrl',
                    templateUrl: 'app/pages/settings/permissionsAndManagement/permissionsAndManagement.html'
                  }
                },
                title: "Permissions and management"
            });
    }

})();
