(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings')
        .controller('AccountCurrencyFeesCtrl', AccountCurrencyFeesCtrl);

    /** @ngInject */
    function AccountCurrencyFeesCtrl($rootScope,$scope,$stateParams,$http,$uibModal,API,cookieManagement,errorToasts,currencyModifiers,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.currencyCode = $stateParams.currencyCode;
        vm.reference = $stateParams.reference;
        $scope.loadingAccountCurrencyFees = true;
        $scope.editingAccountCurrencyFees = false;
        vm.updatedAccountCurrencyFee = {};
        $scope.accountCurrencyFeesParams = {
            tx_type: 'Credit'
        };
        $scope.txTypeOptions = ['Credit','Debit'];

        $scope.toggleAccountCurrencyFeeEditView = function(accountCurrencyFee){
            if(accountCurrencyFee) {
                $scope.editAccountCurrencyFee = accountCurrencyFee;
                $scope.editAccountCurrencyFee.value = currencyModifiers.convertFromCents($scope.editAccountCurrencyFee.value,$rootScope.selectedCurrency.divisibility);
                $scope.editAccountCurrencyFee.tx_type == 'credit' ? $scope.editAccountCurrencyFee.tx_type = 'Credit' : $scope.editAccountCurrencyFee.tx_type = 'Debit';
            } else {
                $scope.editAccountCurrencyFee = {};
                $scope.getAccountCurrencyFees();
            }
            $scope.editingAccountCurrencyFees = !$scope.editingAccountCurrencyFees;
        };

        $scope.getAccountCurrencyFees = function(){
            if(vm.token) {
                $scope.loadingAccountCurrencyFees = true;
                $http.get(API + '/admin/accounts/' + vm.reference + '/currencies/' + vm.currencyCode + '/fees/',{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingAccountCurrencyFees = false;
                    if (res.status === 200) {
                        $scope.accountCurrencyFeesList = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingAccountCurrencyFees = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        $scope.getAccountCurrencyFees();

        $scope.addAccountCurrencyFee = function(accountCurrencyFeesParams){
            if(currencyModifiers.validateCurrency(accountCurrencyFeesParams.value,$rootScope.selectedCurrency.divisibility)){
                accountCurrencyFeesParams.value = currencyModifiers.convertToCents(accountCurrencyFeesParams.value,$rootScope.selectedCurrency.divisibility);
            } else {
                toastr.error('Please input amount to ' + $rootScope.selectedCurrency.divisibility + ' decimal places');
                return;
            }
            if(vm.token) {
                $scope.loadingAccountCurrencyFees = true;
                accountCurrencyFeesParams.tx_type = accountCurrencyFeesParams.tx_type.toLowerCase();
                $http.post(API + '/admin/accounts/' + vm.reference + '/currencies/' + vm.currencyCode + '/fees/',accountCurrencyFeesParams,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingAccountCurrencyFees = false;
                    if (res.status === 201) {
                        toastr.success('Fee added successfully');
                        $scope.accountCurrencyFeesParams = {
                            tx_type: 'Credit'
                        };
                        $scope.getAccountCurrencyFees();
                    }
                }).catch(function (error) {
                    $scope.accountCurrencyFeesParams = {
                        tx_type: 'Credit'
                    };
                    $scope.loadingAccountCurrencyFees = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.accountCurrencyFeeChanged = function(field){
            vm.updatedAccountCurrencyFee[field] = $scope.editAccountCurrencyFee[field];
        };

        $scope.updateAccountCurrencyFee = function(){
            if(currencyModifiers.validateCurrency($scope.editAccountCurrencyFee.value,$rootScope.selectedCurrency.divisibility)){
                vm.updatedAccountCurrencyFee.value = currencyModifiers.convertToCents($scope.editAccountCurrencyFee.value,$rootScope.selectedCurrency.divisibility);
            } else {
                toastr.error('Please input amount to ' + $rootScope.selectedCurrency.divisibility + ' decimal places');
                return;
            }
            if(vm.token) {
                $scope.loadingAccountCurrencyFees = true;
                $scope.editingAccountCurrencyFees = !$scope.editingAccountCurrencyFees;
                vm.updatedAccountCurrencyFee.tx_type ? vm.updatedAccountCurrencyFee.tx_type = vm.updatedAccountCurrencyFee.tx_type.toLowerCase() : '';

                $http.patch(API + '/admin/accounts/' + vm.reference + '/currencies/' + vm.currencyCode + '/fees/' + $scope.editAccountCurrencyFee.id +'/',vm.updatedAccountCurrencyFee,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingAccountCurrencyFees = false;
                    if (res.status === 200) {
                        toastr.success('Fee updated successfully');
                        $scope.accountCurrencyFeesParams = {
                            tx_type: 'Credit'
                        };
                        vm.updatedAccountCurrencyFee = {};
                        $scope.getAccountCurrencyFees();
                    }
                }).catch(function (error) {
                    $scope.accountCurrencyFeesParams = {
                        tx_type: 'Credit'
                    };
                    vm.updatedAccountCurrencyFee = {};
                    $scope.getAccountCurrencyFees();
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.findIndexOfAccountCurrencyFee = function(element){
            return this.id == element.id;
        };

        $scope.openAccountCurrencyFeesModal = function (page, size,accountCurrencyFee) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'AccountCurrencyFeesModalCtrl',
                scope: $scope,
                resolve: {
                    accountCurrencyFee: function () {
                        return accountCurrencyFee;
                    },
                    currencyCode: function () {
                        return vm.currencyCode
                    },
                    reference: function () {
                        return vm.reference
                    }
                }
            });

            vm.theModal.result.then(function(accountCurrencyFee){
                var index = $scope.accountCurrencyFeesList.findIndex(vm.findIndexOfAccountCurrencyFee,accountCurrencyFee);
                $scope.accountCurrencyFeesList.splice(index, 1);
            }, function(){
            });
        };


    }
})();