(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserAccountsCtrl', UserAccountsCtrl);

    /** @ngInject */
    function UserAccountsCtrl($rootScope,$scope,environmentConfig,$stateParams,$http,cookieManagement,errorToasts,$location,$state) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.uuid = $stateParams.uuid;
        vm.reference = '';
        $scope.loadingUserAccounts = true;

        vm.getUser = function(){
            if(vm.token) {
                $scope.loadingUserAccounts = true;
                $http.get(environmentConfig.API + '/admin/accounts/?user=' + vm.uuid, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingUserAccounts = false;
                    if (res.status === 200) {
                        vm.reference = res.data.data.results[0].reference;
                        $scope.account = res.data.data.results[0].user;
                        $scope.currencies = res.data.data.results[0].currencies;
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

        $scope.goToSettings = function(currencyCode,currency){
            $location.path('account/'+vm.reference+'/settings/'+ currencyCode).search({currency: currency})

        }

    }
})();
