(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.transactionWebhooks')
        .directive('editTransactionWebhook', editTransactionWebhook);

    /** @ngInject */
    function editTransactionWebhook() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/settings/transactionWebhooks/editTransactionWebhook/editTransactionWebhook.html'
        };
    }
})();
