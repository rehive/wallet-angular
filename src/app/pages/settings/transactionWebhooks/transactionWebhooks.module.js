(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.transactionWebhooks', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('settings.transactionWebhooks', {
                url: '/transaction-webhooks',
                views: {
                  'generalSettings': {
                    controller: 'TransactionWebhooksCtrl',
                    templateUrl: 'app/pages/settings/transactionWebhooks/transactionWebhooks.html'
                  }
                },
                params: {
                    secret: null
                },
                title: "Transaction webhooks"
            });
    }

})();
