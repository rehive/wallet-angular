(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.notificationService.notificationServiceNotifications')
        .directive('createNotificationServiceNotification', createNotificationServiceNotification);

    /** @ngInject */
    function createNotificationServiceNotification() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/services/notificationService/notificationServiceNotifications/createNotificationServiceNotification/createNotificationServiceNotification.html'
        };
    }
})();
