(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.notificationService.notificationServiceNotifications')
        .directive('editNotification', editNotification);

    /** @ngInject */
    function editNotification() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/services/notificationService/notifications/editNotification/editNotification.html'
        };
    }
})();
