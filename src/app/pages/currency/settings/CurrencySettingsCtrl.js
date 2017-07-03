(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings')
        .controller('CurrencySettingsCtrl', CurrencySettingsCtrl);

    /** @ngInject */
    function CurrencySettingsCtrl($rootScope,$scope) {

        $scope.goToCurrencySetting = function(settingView){
            $scope.settingView = settingView;
        };

    }
})();
