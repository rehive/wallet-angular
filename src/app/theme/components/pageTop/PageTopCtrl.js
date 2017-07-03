(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('PageTopCtrl', PageTopCtrl);

    /** @ngInject */
    function PageTopCtrl($rootScope,$scope,$http,cookieManagement,API,$location,errorToasts,$window,errorHandler,_) {
        var vm = this;

        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.currencies = [];
        vm.currentLocation = $location.path();
        $rootScope.$on('$locationChangeStart', function (event,newUrl) {
            var newUrlArray = newUrl.split('/'),
                newUrlLastElement = _.last(newUrlArray);
            vm.currentLocation = newUrlLastElement;
        });


        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
                vm.getCompanyCurrencies();
            }
        });

        vm.getCompanyCurrencies = function(){
            if(vm.token){
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
                        $rootScope.newUser = res.data.data.count == 0;
                    }
                }).catch(function (error) {
                    if(error.status == 403){
                        errorHandler.handle403();
                        return
                    }
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        if(vm.currentLocation != '/login' && vm.currentLocation != '/verification' && vm.currentLocation != '/company/name_request' && vm.currentLocation != '/register' && vm.currentLocation != '/password/reset'){
            vm.getCompanyCurrencies();
        }

        $scope.selectCurrency = function(selectedCurrency){
            $rootScope.selectedCurrency = selectedCurrency;
        };

        $scope.logout = function(){
            $rootScope.selectedCurrency = null;
            $rootScope.newUser = false;
            $rootScope.gotToken = false;
            $rootScope.securityConfigured = true;
            $rootScope.companyName = null;
            $rootScope.haveCompanyName = false;
            cookieManagement.deleteCookie('TOKEN');
            $location.path('/login');
        };
    }

})();
