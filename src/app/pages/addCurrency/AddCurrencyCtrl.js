(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency')
        .controller('AddCurrencyCtrl', AddCurrencyCtrl);

    /** @ngInject */
    function AddCurrencyCtrl($rootScope,$scope,$http,API,cookieManagement,IMAGEURL,errorToasts) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.changeCurrency = {};
        $scope.changeCurrency.currencyChoice = {};
        $scope.showConfirmCurrency = false;
        $scope.showCompleteCurrency = false;

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
                $scope.currencyImageUrl = IMAGEURL + $rootScope.selectedCurrency.code + '.png';
            }
        });

        vm.getCurrencies = function(){
            // using wrong url here
            $http.get(API + '/company/currencies/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.changeCurrency.currencyChoice.code = res.data.data.results[0].code;
                    $scope.currencyOptions = res.data.data.results;
                }
            }).catch(function (error) {
                errorToasts.evaluateErrors(error.data.data);
            });
        };
        vm.getCurrencies();

        $scope.next = function(){
            $scope.showConfirmCurrency = true;
        };

        $scope.confirmCurrency = function () {
            $scope.showConfirmCurrency = false;
            $scope.showCompleteCurrency = true;
        }
        
    }
})();
