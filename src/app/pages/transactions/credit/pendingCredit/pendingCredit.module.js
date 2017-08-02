(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.credit.pendingCredit', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('transactions.credit.pendingCredit', {
                url: '/pending',
                views: {
                    "pendingCreditView": {
                        templateUrl: 'app/pages/transactions/credit/pendingCredit/pendingCredit.html',
                        controller: "PendingCreditCtrl"
                    }
                },
                title: 'Pending credits'
            });
    }

})();
