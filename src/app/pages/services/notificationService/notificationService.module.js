(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.notificationService', [
      'BlurAdmin.pages.services.notificationService.notificationServiceCompany',
      'BlurAdmin.pages.services.notificationService.notificationServiceNotifications'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('notificationService', {
                url: '/services/notifications',
                abstract: true,
                template:'<div ui-view="notificationServiceViews"></div>'
            });
    }

})();
