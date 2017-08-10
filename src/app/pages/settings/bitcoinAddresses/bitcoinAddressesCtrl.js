(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.bitcoinAddresses')
        .controller('BitcoinAddressesCtrl', BitcoinAddressesCtrl);

    /** @ngInject */
    function BitcoinAddressesCtrl($scope,environmentConfig,$uibModal,toastr,$http,cookieManagement,errorToasts,$window,errorHandler) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.editingBankAccounts = false;
        $scope.loadingBankAccounts = true;
        $scope.newBitcoinAddress = {};
        vm.updatedBankAccount = {};


        $scope.toggleEditBankAccountsView = function(bankAccount){
            if(bankAccount){
                vm.getBankAccount(bankAccount);
            } else {
                $scope.editBitcoinAddress = {};
                vm.getBankAccounts();
            }

            $scope.editingBankAccounts = !$scope.editingBankAccounts;
        };

        vm.getBankAccount = function (bankAccount) {
            $scope.loadingBankAccounts = true;
            $http.get(environmentConfig.API + '/user/bitcoin-accounts/' + bankAccount.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingBankAccounts = false;
                if (res.status === 200) {
                    $scope.editBitcoinAddress = res.data.data;
                }
            }).catch(function (error) {
                $scope.loadingBankAccounts = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        vm.getBankAccounts = function () {
            if(vm.token) {
                $scope.loadingBankAccounts = true;
                $http.get(environmentConfig.API + '/user/bitcoin-accounts/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingBankAccounts = false;
                    if (res.status === 200) {
                        $scope.bitcoinAddresses = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingBankAccounts = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getBankAccounts();

        $scope.addBankAccount = function (newBitcoinAddress) {
            $http.post(environmentConfig.API + '/user/bitcoin-accounts/', newBitcoinAddress, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingBankAccounts = false;
                if (res.status === 201) {
                    vm.getBankAccounts();
                    toastr.success('You have successfully added the bank account!');
                    $scope.newBitcoinAddress = {};
                    $window.scrollTo(0, 0);
                }
            }).catch(function (error) {
                $scope.loadingBankAccounts = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.bankAccountChanged = function(field){
            vm.updatedBankAccount[field] = $scope.editBitcoinAddress[field];
        };

        $scope.updateBankAccount = function () {
            $window.scrollTo(0, 0);
            $scope.editingBankAccounts = !$scope.editingBankAccounts;
            $scope.loadingBankAccounts = true;
            $http.patch(environmentConfig.API + '/user/bitcoin-accounts/'+ $scope.editBitcoinAddress.id + '/', vm.updatedBankAccount, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingBankAccounts = false;
                if (res.status === 200) {
                    vm.updatedBankAccount = {};
                    vm.getBankAccounts();
                    toastr.success('You have successfully updated the bank account!');
                }
            }).catch(function (error) {
                $scope.loadingBankAccounts = false;
                vm.updatedBankAccount = {};
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        vm.findIndexOfBankAccount = function(element){
            return this.id == element.id;
        };
    }
})();
