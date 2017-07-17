(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.userWebhooks')
        .directive('editUserWebhook', editUserWebhook);

    /** @ngInject */
    function editUserWebhook() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/settings/userWebhooks/editUserWebhook/editUserWebhook.html'
        };
    }
})();
