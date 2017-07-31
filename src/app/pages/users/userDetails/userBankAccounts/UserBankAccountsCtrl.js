(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserBankAccountsCtrl', UserBankAccountsCtrl);

    /** @ngInject */
    function UserBankAccountsCtrl($scope,environmentConfig,$stateParams,$http,cookieManagement,errorToasts,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.uuid = $stateParams.uuid;
        $scope.loadingUserBanks = true;

        vm.getUserBankAccounts = function(){
            if(vm.token) {
                $scope.loadingUserBanks = true;
                $http.get(environmentConfig.API + '/admin/users/bank-accounts/?user=' + vm.uuid, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingUserBanks = false;
                    if (res.status === 200) {
                      $scope.userBanks = res.data.data.results;
                    }
                }).catch(function (error) {
                    $scope.loadingUserBanks = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getUserBankAccounts();


    }
})();
