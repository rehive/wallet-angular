(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings')
        .controller('CurrencySettingsCtrl', CurrencySettingsCtrl);

    /** @ngInject */
    function CurrencySettingsCtrl($scope,$location) {

        $scope.goToCurrencySetting = function(settingPath){
            $location.path(settingPath);
        };

    }
})();
