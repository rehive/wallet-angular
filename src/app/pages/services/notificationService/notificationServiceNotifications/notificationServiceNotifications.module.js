(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.notificationService.notificationServiceNotifications', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('notificationService.notificationServiceNotifications', {
                url: '/list',
                views: {
                  'notificationServiceViews' : {
                    templateUrl:'app/pages/services/notificationService/notificationServiceNotifications/notificationServiceNotifications.html',
                    controller: "NotificationServiceNotificationsCtrl"
                  }
                },
                title: 'Notifications'
            });
    }

})();
