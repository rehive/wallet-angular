(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.notificationService.notificationServiceCompany', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('notificationService.notificationServiceCompany', {
                url: '/company-details',
                views: {
                  'notificationServiceViews' : {
                    templateUrl:'app/pages/services/notificationService/notificationServiceCompany/notificationServiceCompany.html',
                    controller: "NotificationServiceCompanyCtrl"
                  }
                },
                title: 'Company Details'
            });
    }

})();
