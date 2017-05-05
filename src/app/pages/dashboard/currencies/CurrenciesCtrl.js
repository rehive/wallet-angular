(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('CurrenciesCtrl', CurrenciesCtrl);

    /** @ngInject */
    function CurrenciesCtrl($rootScope,$scope,$location,cookieManagement,API,$http,IMAGEURL,errorToasts) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.IMAGEURL = IMAGEURL;

        vm.getCompanyCurrencies = function(){
            $http.get(API + '/admin/currencies/?enabled=true', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.currencies = res.data.data.results;
                }
            }).catch(function (error) {
                errorToasts.evaluateErrors(error.data);
            });
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