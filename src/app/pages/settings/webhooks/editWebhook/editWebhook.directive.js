(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .directive('editWebhook', editWebhook);

    /** @ngInject */
    function editWebhook() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/settings/webhooks/editWebhook/editWebhook.html'
        };
    }
})();
