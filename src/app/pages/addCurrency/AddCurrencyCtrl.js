(function () {
    'use strict';

    angular.module('BlurAdmin.pages.addCurrency')
        .controller('AddCurrencyCtrl', AddCurrencyCtrl);

    /** @ngInject */
    function AddCurrencyCtrl($rootScope,$scope,$http,API,cookieManagement,IMAGEURL,errorToasts) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.addCurrency = {};
        $scope.showConfirmCurrency = false;
        $scope.showCompleteCurrency = false;
        $scope.loadingCurrencies = true;

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
                $scope.currencyImageUrl = IMAGEURL + $rootScope.selectedCurrency.code + '.png';
            }
        });

        vm.getCurrencies = function(){
            $scope.loadingCurrencies = true;
            $http.get(API + '/admin/currencies/?page_size=250', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingCurrencies = false;
                if (res.status === 200) {
                    $scope.addCurrency.currencyChoice = res.data.data.results[0];
                    $scope.currencyOptions = res.data.data.results;
                }
            }).catch(function (error) {
                $scope.loadingCurrencies = false;
                errorToasts.evaluateErrors(error.data);
            });
        };
        vm.getCurrencies();

        $scope.addCompanyCurrency = function(){

            var addCurrency = {
                code: $scope.addCurrency.currencyChoice.code,
                description: $scope.addCurrency.currencyChoice.description,
                symbol: $scope.addCurrency.currencyChoice.symbol,
                unit: $scope.addCurrency.currencyChoice.unit,
                divisibility: $scope.addCurrency.currencyChoice.divisibility
            };

            //$scope.loadingCurrencies = true;
            //$http.post(API + '/admin/currencies/', addCurrency, {
            //    headers: {
            //        'Content-Type': 'application/json',
            //        'Authorization': vm.token
            //    }
            //}).then(function (res) {
            //    $scope.loadingCurrencies = false;
            //    if (res.status === 200) {
            //        $scope.addCurrency.currencyChoice.code = res.data.data.results[0].code;
            //        $scope.currencyOptions = res.data.data.results;
            //    }
            //}).catch(function (error) {
            //    $scope.loadingCurrencies = false;
            //    errorToasts.evaluateErrors(error.data);
            //});
        };

        $scope.next = function(){
            $scope.showConfirmCurrency = true;
        };

        $scope.confirmCurrency = function () {
            $scope.showConfirmCurrency = false;
            $scope.showCompleteCurrency = true;
        };

    }
})();
