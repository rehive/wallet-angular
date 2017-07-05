(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings')
        .controller('CurrencySettingsCtrl', CurrencySettingsCtrl);

    /** @ngInject */
    function CurrencySettingsCtrl($scope) {

        $scope.goToCurrencySetting = function(settingView){
            $scope.settingView = settingView;
        };

    }
})();
