(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserAccountsCtrl', UserAccountsCtrl);

    /** @ngInject */
    function UserAccountsCtrl($rootScope,$scope,API,$stateParams,$http,cookieManagement,errorToasts,$location,$state) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.uuid = $stateParams.uuid;
        $scope.loadingUserAccounts = true;

        vm.getUser = function(){
            if(vm.token) {
                $scope.loadingUserAccounts = true;
                $http.get(API + '/admin/accounts/?user=' + vm.uuid, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingUserAccounts = false;
                    if (res.status === 200) {
                        $scope.account = res.data.data.results[0];
                        $scope.balances = res.data.data.results[0].balances;
                    }
                }).catch(function (error) {
                    $scope.loadingUserAccounts = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getUser();

        $scope.goToView = function(state,currency,email){
          $rootScope.selectedCurrency = currency;
          $state.go(state,{"email": email});
        };

        $scope.goToSettings = function(currencyCode){
            $location.path('account/settings/'+ currencyCode)
        }

    }
})();
