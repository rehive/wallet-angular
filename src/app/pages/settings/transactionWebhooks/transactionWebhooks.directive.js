(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .directive('transactionWebhooks', transactionWebhooks);

    /** @ngInject */
    function transactionWebhooks() {
        return {
            restrict: 'E',
            controller: 'TransactionWebhooksCtrl',
            templateUrl: 'app/pages/settings/transactionWebhooks/transactionWebhooks.html'
        };
    }
})();
