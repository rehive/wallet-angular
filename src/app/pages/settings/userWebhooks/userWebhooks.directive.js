(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .directive('userWebhooks', userWebhooks);

    /** @ngInject */
    function userWebhooks() {
        return {
            restrict: 'E',
            controller: 'UserWebhooksCtrl',
            templateUrl: 'app/pages/settings/userWebhooks/userWebhooks.html'
        };
    }
})();
