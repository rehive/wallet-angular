(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.transactionsSwitches', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('settings.transactionsSwitches', {
                url: '/transactions-switches',
                views: {
                  'generalSettings': {
                    controller: 'TransactionsSwitchesCtrl',
                    templateUrl: 'app/pages/settings/transactionsSwitches/transactionsSwitches.html'
                  }
                },
                title: "Transactions Switches"
            });
    }

})();
