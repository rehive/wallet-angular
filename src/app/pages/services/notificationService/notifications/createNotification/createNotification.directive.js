(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.notificationService.notificationServiceNotifications')
        .directive('createNotification', createNotification);

    /** @ngInject */
    function createNotification() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/services/notificationService/notifications/createNotification/createNotification.html'
        };
    }
})();
