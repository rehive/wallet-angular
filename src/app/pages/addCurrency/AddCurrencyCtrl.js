(function () {
    'use strict';

    angular.module('BlurAdmin.pages.addCurrency')
        .controller('AddCurrencyCtrl', AddCurrencyCtrl);

    /** @ngInject */
    function AddCurrencyCtrl($rootScope,$scope,$http,API,cookieManagement,errorToasts,errorHandler) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.addCurrency = {};
        $scope.showConfirmCurrency = false;
        $scope.showCompleteCurrency = false;
        $scope.loadingCurrencies = true;

        vm.getCurrencies = function(){
            if(vm.token) {
                $scope.loadingCurrencies = true;
                $http.get(API + '/admin/currencies/?page_size=250', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingCurrencies = false;
                    if (res.status === 200) {
                        if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code){
                            $scope.addCurrency.currencyChoice = res.data.data.results.find(function (currency) {
                                return currency.code == $rootScope.selectedCurrency.code
                            });
                        } else {
                            $scope.addCurrency.currencyChoice = res.data.data.results[0];
                        }
                        $scope.currencyOptions = res.data.data.results;
                    }
                }).catch(function (error) {
                    $scope.loadingCurrencies = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getCurrencies();

        $scope.addCompanyCurrency = function(){

            var code = $scope.addCurrency.currencyChoice.code;

            $scope.loadingCurrencies = true;
            $http.patch(API + '/admin/currencies/' + code, {enabled: true}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingCurrencies = false;
                if (res.status === 200) {
                    $scope.showConfirmCurrency = false;
                    $scope.showCompleteCurrency = true;
                    $rootScope.selectedCurrency = res.data.data;
                }
            }).catch(function (error) {
                $scope.loadingCurrencies = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.next = function(){
            $scope.showConfirmCurrency = true;
        };

    }
})();
