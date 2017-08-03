(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings.accountCurrencyFees')
        .controller('AccountCurrencyFeesCtrl', AccountCurrencyFeesCtrl);

    /** @ngInject */
    function AccountCurrencyFeesCtrl($scope,$window,$stateParams,$http,$uibModal,environmentConfig,cookieManagement,errorToasts,currencyModifiers,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.currencyCode = $stateParams.currencyCode;
        vm.currenciesList = JSON.parse($window.sessionStorage.currenciesList);
        vm.reference = $stateParams.reference;
        $scope.loadingAccountCurrencyFees = true;
        $scope.editingAccountCurrencyFees = false;
        vm.updatedAccountCurrencyFee = {};
        $scope.accountCurrencyFeesParams = {
            tx_type: 'Credit'
        };
        $scope.txTypeOptions = ['Credit','Debit'];

        vm.getCurrencyObjFromCurrenciesList = function(){
            $scope.currencyObj = vm.currenciesList.find(function(element){
                return element.code == vm.currencyCode;
            });
        };
        vm.getCurrencyObjFromCurrenciesList();

        $scope.toggleAccountCurrencyFeeEditView = function(accountCurrencyFee){
            if(accountCurrencyFee) {
                vm.getAccountCurrencyFee(accountCurrencyFee);
            } else {
                $scope.editAccountCurrencyFee = {};
                $scope.getAccountCurrencyFees();
            }
            $scope.editingAccountCurrencyFees = !$scope.editingAccountCurrencyFees;
        };

        vm.getAccountCurrencyFee = function (accountCurrencyFee) {
            $scope.loadingAccountCurrencyFees = true;
            $http.get(environmentConfig.API + '/admin/accounts/' + vm.reference + '/currencies/' + vm.currencyCode + '/fees/' + accountCurrencyFee.id +'/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingAccountCurrencyFees = false;
                if (res.status === 200) {
                    $scope.editAccountCurrencyFee = res.data.data;
                    $scope.editAccountCurrencyFee.value = currencyModifiers.convertFromCents($scope.editAccountCurrencyFee.value,$scope.currencyObj.divisibility);
                    $scope.editAccountCurrencyFee.tx_type == 'credit' ? $scope.editAccountCurrencyFee.tx_type = 'Credit' : $scope.editAccountCurrencyFee.tx_type = 'Debit';
                }
            }).catch(function (error) {
                $scope.loadingAccountCurrencyFees = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.getAccountCurrencyFees = function(){
            if(vm.token) {
                $scope.loadingAccountCurrencyFees = true;
                $http.get(environmentConfig.API + '/admin/accounts/' + vm.reference + '/currencies/' + vm.currencyCode + '/fees/',{
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
            if(currencyModifiers.validateCurrency(accountCurrencyFeesParams.value,$scope.currencyObj.divisibility)){
                accountCurrencyFeesParams.value = currencyModifiers.convertToCents(accountCurrencyFeesParams.value,$scope.currencyObj.divisibility);
            } else {
                toastr.error('Please input amount to ' + $scope.currencyObj.divisibility + ' decimal places');
                return;
            }
            if(vm.token) {
                $scope.loadingAccountCurrencyFees = true;
                accountCurrencyFeesParams.tx_type = accountCurrencyFeesParams.tx_type.toLowerCase();
                $http.post(environmentConfig.API + '/admin/accounts/' + vm.reference + '/currencies/' + vm.currencyCode + '/fees/',accountCurrencyFeesParams,{
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
            if(currencyModifiers.validateCurrency($scope.editAccountCurrencyFee.value,$scope.currencyObj.divisibility)){
                vm.updatedAccountCurrencyFee.value = currencyModifiers.convertToCents($scope.editAccountCurrencyFee.value,$scope.currencyObj.divisibility);
            } else {
                toastr.error('Please input amount to ' + $scope.currencyObj.divisibility + ' decimal places');
                return;
            }
            if(vm.token) {
                $scope.loadingAccountCurrencyFees = true;
                $scope.editingAccountCurrencyFees = !$scope.editingAccountCurrencyFees;
                vm.updatedAccountCurrencyFee.tx_type ? vm.updatedAccountCurrencyFee.tx_type = vm.updatedAccountCurrencyFee.tx_type.toLowerCase() : '';

                $http.patch(environmentConfig.API + '/admin/accounts/' + vm.reference + '/currencies/' + vm.currencyCode + '/fees/' + $scope.editAccountCurrencyFee.id +'/',vm.updatedAccountCurrencyFee,{
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