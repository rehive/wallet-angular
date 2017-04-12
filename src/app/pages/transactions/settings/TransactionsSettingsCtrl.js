(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.settings')
        .controller('TransactionsSettingsCtrl', TransactionsSettingsCtrl);

    /** @ngInject */
    function TransactionsSettingsCtrl($rootScope,$scope,IMAGEURL) {

        $scope.currencyImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code){
                $scope.currencyImageUrl = IMAGEURL + $rootScope.selectedCurrency.code + '.png';
            }
        });

        $scope.goToCurrencySetting = function(settingView){
            $scope.settingView = settingView;
        };

    }
})();
