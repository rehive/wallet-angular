(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.overview')
        .controller('OverviewCtrl', OverviewCtrl);

    /** @ngInject */
    function OverviewCtrl($rootScope,IMAGEURL,$scope) {

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
                $scope.currencyImageUrl = IMAGEURL + $rootScope.selectedCurrency.code + '.png';
            }
        });

        $scope.currencyImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";
    }
})();