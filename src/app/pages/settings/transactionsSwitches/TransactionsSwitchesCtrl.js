(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.transactionsSwitches')
        .controller('TransactionsSwitchesCtrl', TransactionsSwitchesCtrl);

    function TransactionsSwitchesCtrl($scope,environmentConfig,$uibModal,$rootScope,toastr,$http,cookieManagement,errorToasts,$window,errorHandler) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingTransactionsSwitches = true;
        $scope.transactionsSwitches = {};
        vm.updatedTransactionsSwitch = {};
        $scope.transactionsSwitchParams = {
            tx_type: 'Credit',
            enabled: 'False'
        };
        $scope.transactionsSwitchesOptions = ['Credit','Debit'];
        $scope.boolOptions = ['True','False'];

        $scope.toggleTransactionsSwitchesEditView = function(transactionsSwitch){
            if(transactionsSwitch) {
                vm.getTransactionsSwitch(transactionsSwitch);
            } else {
                $scope.editTransactionsSwitch.enabled == 'True' ? $scope.editTransactionsSwitch.enabled = true : $scope.editTransactionsSwitch.enabled = false;
                $scope.editTransactionsSwitch = {};
                vm.getTransactionsSwitches();
            }
            $scope.editingTransactionsSwitches = !$scope.editingTransactionsSwitches;
        };

        vm.getTransactionsSwitch = function (transactionsSwitch) {
            $scope.loadingTransactionsSwitches = true;
            $http.get(environmentConfig.API + '/admin/company/switches/' + transactionsSwitch.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingTransactionsSwitches = false;
                if (res.status === 200) {
                    $scope.editTransactionsSwitch = res.data.data;
                    $scope.editTransactionsSwitch.tx_type == 'credit' ? $scope.editTransactionsSwitch.tx_type = 'Credit' : $scope.editTransactionsSwitch.tx_type = 'Debit';
                    $scope.editTransactionsSwitch.enabled == true ? $scope.editTransactionsSwitch.enabled = 'True' : $scope.editTransactionsSwitch.enabled = 'False';
                }
            }).catch(function (error) {
                $scope.loadingTransactionsSwitches = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        vm.getTransactionsSwitches = function () {
            if(vm.token) {
                $scope.loadingTransactionsSwitches = true;
                $http.get(environmentConfig.API + '/admin/company/switches/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingTransactionsSwitches = false;
                    if (res.status === 200) {
                        $scope.transactionsSwitchesList = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingTransactionsSwitches = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getTransactionsSwitches();

        $scope.addTransactionsSwitch = function (transactionsSwitchParams) {
            $window.scrollTo(0,0);
            transactionsSwitchParams.tx_type ? transactionsSwitchParams.tx_type = transactionsSwitchParams.tx_type.toLowerCase() : '';
            transactionsSwitchParams.enabled ? transactionsSwitchParams.enabled = transactionsSwitchParams.enabled == 'True' ? true: false : '';
            if(vm.token) {
                $scope.loadingTransactionsSwitches = true;
                $http.post(environmentConfig.API + '/admin/company/switches/', transactionsSwitchParams, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingTransactionsSwitches = false;
                    if (res.status === 201) {
                        toastr.success('Successfully created the transactions switch!');
                        $scope.transactionsSwitchParams = {tx_type: 'Credit', enabled: 'False'};
                        vm.getTransactionsSwitches();
                    }
                }).catch(function (error) {
                    $scope.transactionsSwitchParams = {tx_type: 'Credit', enabled: 'False'};
                    $scope.loadingTransactionsSwitches = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.transactionsSwitchChanged = function(field){
            vm.updatedTransactionsSwitch[field] = $scope.editTransactionsSwitch[field];
        };

        $scope.updateTransactionsSwitch = function () {
            $window.scrollTo(0,0);
            vm.updatedTransactionsSwitch.enabled ? vm.updatedTransactionsSwitch.enabled = vm.updatedTransactionsSwitch.enabled == 'True' ? true: false : '';
            if(vm.token) {
                $scope.loadingTransactionsSwitches = true;
                $http.patch(environmentConfig.API + '/admin/company/switches/' + $scope.editTransactionsSwitch.id + '/', vm.updatedTransactionsSwitch, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingTransactionsSwitches = false;
                    if (res.status === 200) {
                        $scope.editingTransactionsSwitches = !$scope.editingTransactionsSwitches;
                        vm.updatedTransactionsSwitch = {};
                        toastr.success('Successfully updated the transactions switch!');
                        vm.getTransactionsSwitches();
                    }
                }).catch(function (error) {
                    vm.updatedTransactionsSwitch = {};
                    $scope.loadingTransactionsSwitches = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.findIndexOfTransactionsSwitches = function(element){
            return this.id == element.id;
        };

        $scope.openTransactionsSwitchesModal = function (page, size,transactionsSwitches) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'TransactionsSwitchModalCtrl',
                scope: $scope,
                resolve: {
                    transactionsSwitches: function () {
                        return transactionsSwitches;
                    }
                }
            });

            vm.theModal.result.then(function(transactionsSwitches){
                var index = $scope.transactionsSwitchesList.findIndex(vm.findIndexOfTransactionsSwitches,transactionsSwitches);
                $scope.transactionsSwitchesList.splice(index, 1);
            }, function(){
            });
        };

    }
})();
