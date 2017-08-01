(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserBankAccountsCtrl', UserBankAccountsCtrl);

    /** @ngInject */
    function UserBankAccountsCtrl($scope,environmentConfig,$stateParams,$uibModal,$http,cookieManagement,errorToasts,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.uuid = $stateParams.uuid;
        vm.updatedUserBankAccount = {};
        $scope.userBankAccountParams = {};
        $scope.editUserBankAccount = {};
        $scope.loadingUserBankAccount = true;
        $scope.addingUserBankAccount = false;

        vm.getUserBankAccounts = function(){
            if(vm.token) {
                $scope.loadingUserBankAccount = true;
                $http.get(environmentConfig.API + '/admin/users/bank-accounts/?user=' + vm.uuid, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingUserBankAccount = false;
                    if (res.status === 200) {
                      $scope.userBanks = res.data.data.results;
                    }
                }).catch(function (error) {
                    $scope.loadingUserBankAccount = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getUserBankAccounts();

        $scope.toggleAddUserBankAccountView = function () {
            $scope.addingUserBankAccount = !$scope.addingUserBankAccount;
        };

        $scope.addUserBankAccount = function(userBankAccountParams){
            if(vm.token) {
                userBankAccountParams.user = vm.uuid;
                $scope.loadingUserBankAccount = true;
                $scope.toggleAddUserBankAccountView();
                $http.post(environmentConfig.API + '/admin/users/bank-accounts/',userBankAccountParams,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingUserBankAccount = false;
                    if (res.status === 201) {
                        $scope.userBankAccountParams = {};
                        toastr.success('Successfully added user bank account!');
                        vm.getUserBankAccounts();
                    }
                }).catch(function (error) {
                    $scope.loadingUserBankAccount = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.toggleEditUserBankAccountView = function (userBankAccount) {
            if(userBankAccount){
                $scope.editUserBankAccount = userBankAccount;
            } else {
                $scope.editUserBankAccount = {};
                vm.getUserBankAccounts();
            }

            $scope.editingUserBankAccount = !$scope.editingUserBankAccount;
        };

        $scope.userBankAccountChanged =  function (field) {
            vm.updatedUserBankAccount[field] = $scope.editUserBankAccount[field];
        };

        $scope.updateUserBankAccount = function(){
            if(vm.token) {
                $scope.loadingUserBankAccount = true;
                $scope.editingUserBankAccount = !$scope.editingUserBankAccount;
                $http.patch(environmentConfig.API + '/admin/users/bank-accounts/' + $scope.editUserBankAccount.id + '/',vm.updatedUserBankAccount,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingUserBankAccount = false;
                    if (res.status === 200) {
                        vm.updatedUserBankAccount = {};
                        $scope.editUserBankAccount = {};
                        toastr.success('Successfully updated user bank account!');
                    }
                }).catch(function (error) {
                    $scope.loadingUserBankAccount = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };


        $scope.openUserBankAccountModal = function (page, size, bankAccount) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'UserBankAccountModalCtrl',
                scope: $scope,
                resolve: {
                    bankAccount: function () {
                        return bankAccount;
                    }
                }
            });

            vm.theModal.result.then(function(address){
                if(address){
                    vm.getUserBankAccounts();
                }
            }, function(){
            });
        };


    }
})();
