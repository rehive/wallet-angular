(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('PageTopCtrl', PageTopCtrl);

    /** @ngInject */
    function PageTopCtrl($rootScope,$scope,$http,cookieManagement,API,$location,errorToasts,$window,_) {
        var vm = this;

        $scope.companyName = cookieManagement.getCookie('COMPANY');
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.currencies = [];
        vm.currentLocation = $location.path();

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
                vm.getCompanyCurrencies();
            }
        });

        vm.getCompanyCurrencies = function(){
            $http.get(API + '/admin/currencies/?enabled=true', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    if(!$rootScope.selectedCurrency){
                        $rootScope.selectedCurrency = res.data.data.results[0];
                    }
                    $scope.currencies = res.data.data.results;
                    $window.sessionStorage.currenciesList = JSON.stringify(res.data.data.results);
                }
            }).catch(function (error) {
                errorToasts.evaluateErrors(error.data);
                if(error.status == 403){
                    cookieManagement.deleteCookie('TOKEN');
                    cookieManagement.deleteCookie('COMPANY');
                    $location.path('/login');
                }
            });
        };
        if(vm.currentLocation != '/login'){
            vm.getCompanyCurrencies();
        }

        $scope.selectCurrency = function(selectedCurrency){
            $rootScope.selectedCurrency = selectedCurrency;
        };

        $scope.logout = function(){
            cookieManagement.deleteCookie('TOKEN');
            cookieManagement.deleteCookie('COMPANY');
            $location.path('/login');
        };
    }

})();
