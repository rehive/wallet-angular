(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.notificationService', [
      'BlurAdmin.pages.services.notificationService.notificationServiceCompany',
      'BlurAdmin.pages.services.notificationService.notificationServiceNotifications',
      'BlurAdmin.pages.services.notificationService.notificationServiceLogs'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('notificationService', {
                url: '/services/notifications',
                abstract: true,
                template:'<div ui-view="notificationServiceViews"></div>'
            })
            $urlRouterProvider.when("/services/notifications", "/services/notifications/company-details");
    }

})();
