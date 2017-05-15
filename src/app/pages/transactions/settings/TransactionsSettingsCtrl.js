(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.settings')
        .controller('TransactionsSettingsCtrl', TransactionsSettingsCtrl);

    /** @ngInject */
    function TransactionsSettingsCtrl($rootScope,$scope) {

        $scope.goToCurrencySetting = function(settingView){
            $scope.settingView = settingView;
        };

    }
})();
