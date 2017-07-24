(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings.accountCurrencySwitches')
        .controller('AccountCurrencySwitchesCtrl', AccountCurrencySwitchesCtrl);

    /** @ngInject */
    function AccountCurrencySwitchesCtrl($rootScope,$scope,$stateParams,$http,$uibModal,environmentConfig,cookieManagement,errorToasts,currencyModifiers,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.currencyCode = $stateParams.currencyCode;
        vm.reference = $stateParams.reference;
        $scope.loadingAccountCurrencySwitches = true;
        $scope.editingAccountCurrencySwitches = false;
        vm.updatedAccountCurrencySwitch = {};
        $scope.accountCurrencySwitchesParams = {
            tx_type: 'Credit',
            enabled: 'False'
        };
        $scope.txTypeOptions = ['Credit','Debit'];
        $scope.boolOptions = ['True','False'];

        $scope.toggleAccountCurrencySwitchEditView = function(accountCurrencySwitch){
            if(accountCurrencySwitch) {
                $scope.editAccountCurrencySwitch = accountCurrencySwitch;
                $scope.editAccountCurrencySwitch.tx_type == 'credit' ? $scope.editAccountCurrencySwitch.tx_type = 'Credit' : $scope.editAccountCurrencySwitch.tx_type = 'Debit';
                $scope.editAccountCurrencySwitch.enabled == true ? $scope.editAccountCurrencySwitch.enabled = 'True' : $scope.editAccountCurrencySwitch.enabled = 'False';
            } else {
                $scope.editAccountCurrencySwitch.enabled == 'True' ? $scope.editAccountCurrencySwitch.enabled = true : $scope.editAccountCurrencySwitch.enabled = false;
                $scope.editAccountCurrencySwitch = {};
                $scope.getAccountCurrencySwitches();
            }
            $scope.editingAccountCurrencySwitches = !$scope.editingAccountCurrencySwitches;
        };

        $scope.getAccountCurrencySwitches = function(){
            if(vm.token) {
                $scope.loadingAccountCurrencySwitches = true;
                $http.get(environmentConfig.API + '/admin/accounts/' + vm.reference + '/currencies/' + vm.currencyCode + '/switches/',{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingAccountCurrencySwitches = false;
                    if (res.status === 200) {
                        $scope.accountCurrencySwitchesList = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingAccountCurrencySwitches = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        $scope.getAccountCurrencySwitches();

        $scope.addAccountCurrencySwitch = function(accountCurrencySwitchesParams){
            if(vm.token) {
                $scope.loadingAccountCurrencySwitches = true;
                accountCurrencySwitchesParams.tx_type = accountCurrencySwitchesParams.tx_type.toLowerCase();
                accountCurrencySwitchesParams.enabled == 'True' ? accountCurrencySwitchesParams.enabled = true : accountCurrencySwitchesParams.enabled = false;
                $http.post(environmentConfig.API + '/admin/accounts/' + vm.reference + '/currencies/' + vm.currencyCode + '/switches/',accountCurrencySwitchesParams,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingAccountCurrencySwitches = false;
                    if (res.status === 201) {
                        toastr.success('Switch added successfully');
                        $scope.accountCurrencySwitchesParams = {
                            tx_type: 'Credit',
                            enabled: 'False'
                        };
                        $scope.getAccountCurrencySwitches();
                    }
                }).catch(function (error) {
                    $scope.accountCurrencySwitchesParams = {
                        tx_type: 'Credit',
                        enabled: 'False'
                    };
                    $scope.loadingAccountCurrencySwitches = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.accountCurrencySwitchChanged = function(field){
            vm.updatedAccountCurrencySwitch[field] = $scope.editAccountCurrencySwitch[field];
        };

        $scope.updateAccountCurrencySwitch = function(){
            if(vm.token) {
                $scope.loadingAccountCurrencySwitches = true;
                $scope.editingAccountCurrencySwitches = !$scope.editingAccountCurrencySwitches;
                vm.updatedAccountCurrencySwitch.tx_type ? vm.updatedAccountCurrencySwitch.tx_type = vm.updatedAccountCurrencySwitch.tx_type.toLowerCase() : '';
                vm.updatedAccountCurrencySwitch.enabled == 'True' ? vm.updatedAccountCurrencySwitch.enabled = true : vm.updatedAccountCurrencySwitch.enabled = false;

                $http.patch(environmentConfig.API + '/admin/accounts/' + vm.reference + '/currencies/' + vm.currencyCode + '/switches/' + $scope.editAccountCurrencySwitch.id + '/',vm.updatedAccountCurrencySwitch,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingAccountCurrencySwitches = false;
                    if (res.status === 200) {
                        toastr.success('Switch updated successfully');
                        $scope.AccountCurrencySwitchesParams = {
                            tx_type: 'Credit',
                            enabled: 'False'
                        };
                        vm.updatedAccountCurrencySwitch = {};
                        $scope.getAccountCurrencySwitches();
                    }
                }).catch(function (error) {
                    $scope.AccountCurrencySwitchesParams = {
                        tx_type: 'Credit',
                        enabled: 'False'
                    };
                    vm.updatedAccountCurrencySwitch = {};
                    $scope.getAccountCurrencySwitches();
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.findIndexOfAccountCurrencySwitch = function(element){
            return this.id == element.id;
        };

        $scope.openAccountCurrencySwitchesModal = function (page, size,accountCurrencySwitch) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'AccountCurrencySwitchesModalCtrl',
                scope: $scope,
                resolve: {
                    accountCurrencySwitch: function () {
                        return accountCurrencySwitch;
                    },
                    currencyCode: function () {
                        return vm.currencyCode
                    },
                    reference: function () {
                        return vm.reference
                    }
                }
            });

            vm.theModal.result.then(function(accountCurrencySwitch){
                var index = $scope.accountCurrencySwitchesList.findIndex(vm.findIndexOfAccountCurrencySwitch,accountCurrencySwitch);
                $scope.accountCurrencySwitchesList.splice(index, 1);
            }, function(){
            });
        };


    }
})();