(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .directive('webhooks', webhooks);

    /** @ngInject */
    function webhooks() {
        return {
            restrict: 'E',
            controller: 'WebhooksCtrl',
            templateUrl: 'app/pages/settings/webhooks/webhooks.html'
        };
    }
})();
