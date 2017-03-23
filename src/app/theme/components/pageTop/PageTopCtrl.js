(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('PageTopCtrl', PageTopCtrl);

    /** @ngInject */
    function PageTopCtrl($scope,$http,cookieManagement,API,$location) {
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
                    vm.convertCurrenciesToViewableSymbols(res.data.data.results);
                }
            }).catch(function (error) {
                console.log(error);
            });
        };
        vm.getCompanyCurrencies();

        vm.convertCurrenciesToViewableSymbols = function(currenciesArray){
            currenciesArray.forEach(function(obj,index){
                $scope.currencies[index] = obj.symbol + ' ' +obj.code;
            });
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