(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .directive('notifications', notifications);

    /** @ngInject */
    function notifications() {
        return {
            restrict: 'E',
            controller: 'NotificationsCtrl',
            templateUrl: 'app/pages/settings/notifications/notifications.html'
        };
    }
})();
