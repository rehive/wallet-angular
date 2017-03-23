(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('PageTopCtrl', PageTopCtrl);

    /** @ngInject */
    function PageTopCtrl($rootScope,$scope,$http,cookieManagement,API,$location) {
        var vm = this;

        $scope.companyName = cookieManagement.getCookie('COMPANY');
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.currencies = [];

        vm.getCompanyCurrencies = function(){
            $http.get(API + '/company/currencies/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $rootScope.selectedCurrency = res.data.data.results[0];
                    $scope.currencies = res.data.data.results;
                }
            }).catch(function (error) {
                console.log(error);
            });
        };
        vm.getCompanyCurrencies();

        $scope.selectCurrency = function(selectedCurrency){
            $rootScope.selectedCurrency = selectedCurrency;
            console.log(selectedCurrency);
        };

        //vm.getActiveCurrencies = function(){
        //    $http.get(API + '/company/currencies/', {
        //        headers: {
        //            'Content-Type': 'application/json',
        //            'Authorization': 'JWT ' + vm.token
        //        }
        //    }).then(function (res) {
        //        if (res.status === 200) {
        //            vm.convertCurrenciesToViewableSymbols(res.data.data.results);
        //        }
        //    }).catch(function (error) {
        //        console.log(error);
        //    });
        //};
        //vm.getActiveCurrencies();



        $scope.logout = function(){
            cookieManagement.deleteCookie('TOKEN');
            cookieManagement.deleteCookie('COMPANY');
            $location.path('/login');
        };
    }

})();