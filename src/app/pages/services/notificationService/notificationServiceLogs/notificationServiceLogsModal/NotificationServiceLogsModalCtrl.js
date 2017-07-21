(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.notificationService.notificationServiceCompany')
        .controller('NotificationServiceLogsModalCtrl', NotificationServiceLogsModalCtrl);

    /** @ngInject */
    function NotificationServiceLogsModalCtrl($scope,log) {

        $scope.log = log;

    }
})();
