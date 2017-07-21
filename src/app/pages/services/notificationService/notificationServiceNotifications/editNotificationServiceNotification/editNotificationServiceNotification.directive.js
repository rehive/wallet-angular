(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.notificationService.notificationServiceNotifications')
        .directive('editNotificationServiceNotification', editNotificationServiceNotification);

    /** @ngInject */
    function editNotificationServiceNotification() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/services/notificationService/notificationServiceNotifications/editNotificationServiceNotification/editNotificationServiceNotification.html'
        };
    }
})();
