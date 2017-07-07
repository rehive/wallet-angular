(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('CurrenciesCtrl', CurrenciesCtrl);

    /** @ngInject */
    function CurrenciesCtrl($rootScope,$scope,$location,cookieManagement,API,$http,errorToasts,errorHandler) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingCurrencies = true;

        vm.getCompanyCurrencies = function(){
            if(vm.token) {
              $scope.loadingCurrencies = true;
                $http.get(API + '/admin/currencies/?enabled=true', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                  $scope.loadingCurrencies = false;
                    if (res.status === 200) {
                        $scope.currencies = res.data.data.results;
                    }
                }).catch(function (error) {
                  $scope.loadingCurrencies = false;
                    if(error.status == 403){
                        errorHandler.handle403();
                        return;
                      }
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getCompanyCurrencies();

        $scope.goToView = function(currency,path){
            $rootScope.selectedCurrency = currency;
            $location.path(path);
        };

        $scope.goToAddCurrency = function(){
            $location.path('/currency/add');
        }
    }
})();
