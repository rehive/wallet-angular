(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .directive('transactionsSwitches', transactionsSwitches);

    /** @ngInject */
    function transactionsSwitches() {
        return {
            restrict: 'E',
            controller: 'TransactionsSwitchesCtrl',
            templateUrl: 'app/pages/settings/transactionsSwitches/transactionsSwitches.html'
        };
    }
})();
