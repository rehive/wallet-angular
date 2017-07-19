(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.notificationService')
        .directive('notificationServiceNavigation', notificationServiceNavigation);

    /** @ngInject */
    function notificationServiceNavigation() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/services/notificationService/notificationServiceNavigation/notificationServiceNavigation.html'
        };
    }
})();
