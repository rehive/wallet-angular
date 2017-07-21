(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.transactionWebhooks')
        .controller('TransactionWebhooksCtrl', TransactionWebhooksCtrl);

    /** @ngInject */
    function TransactionWebhooksCtrl($scope,API,$uibModal,toastr,$http,cookieManagement,$state,errorToasts,$window,errorHandler) {


        console.log($state.params.secret);
        var vm = this;
        vm.updatedTransactionWebhook = {};
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingTransactionWebhooks = true;
        $scope.editTransactionWebhook = {};
        $scope.transactionWebhooksParams = {
            tx_type: 'All',
            event: 'Transaction Create',
            secret: $state.params.secret || ''
        };

        $scope.typeOptions = ['All','Credit','Debit'];
        $scope.txEventOptions = ['Transaction Create','Transaction Update','Transaction Delete','Transaction Initiate','Transaction Execute'];

        $scope.toggleTransactionWebhooksEditView = function(webhook){
            if(webhook){
                webhook.tx_type = webhook.tx_type == null ? 'All' : webhook.tx_type == 'credit' ? 'Credit' : 'Debit';
                webhook.event = webhook.event == 'transaction.create' ?
                 'Transaction Create' : webhook.event == 'transaction.update' ? 'Transaction Update' : webhook.event == 'transaction.delete' ?
                 'Transaction Delete' : webhook.event == 'transaction.initiate' ? 'Transaction Initiate' : webhook.event == 'transaction.execute' ?
                 'Transaction Execute' : '';
                $scope.editTransactionWebhook = webhook;
            } else {
                $scope.editTransactionWebhook = {};
                vm.getTransactionWebhooks();
            }
            $scope.editingTransactionWebhook = !$scope.editingTransactionWebhook;
        };

        vm.getTransactionWebhooks = function () {
            if(vm.token) {
                $scope.loadingTransactionWebhooks = true;
                $http.get(API + '/admin/webhooks/transactions/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingTransactionWebhooks = false;
                    if (res.status === 200) {
                        $scope.transactionWebhooks = res.data.data;
                        $window.scrollTo(0, 0);
                    }
                }).catch(function (error) {
                    $scope.loadingTransactionWebhooks = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getTransactionWebhooks();

        $scope.addTransactionWebhooks = function (transactionWebhooksParams) {
            $scope.loadingTransactionWebhooks = true;

            if(transactionWebhooksParams.tx_type == 'All'){
                transactionWebhooksParams.tx_type = null;
            } else {
              transactionWebhooksParams.tx_type = transactionWebhooksParams.tx_type.toLowerCase();
            }

            transactionWebhooksParams.event = transactionWebhooksParams.event == 'Transaction Create' ?
             'transaction.create' : transactionWebhooksParams.event == 'Transaction Update' ? 'transaction.update' : transactionWebhooksParams.event == 'Transaction Delete' ?
             'transaction.delete' : transactionWebhooksParams.event == 'Transaction Initiate' ? 'transaction.initiate' : transactionWebhooksParams.event == 'Transaction Execute' ?
             'transaction.execute' : '';
            $http.post(API + '/admin/webhooks/transactions/', transactionWebhooksParams, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingTransactionWebhooks = false;
                if (res.status === 201) {
                    vm.getTransactionWebhooks();
                    toastr.success('You have successfully added the Webhook!');
                    $scope.transactionWebhooksParams = {tx_type: 'All',event: 'Transaction Create'};
                    $window.scrollTo(0, 0);
                }
            }).catch(function (error) {
                $scope.transactionWebhooksParams = {tx_type: 'All',event: 'Transaction Create'};
                $scope.loadingTransactionWebhooks = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.transactionWebhookChanged = function(field){
            vm.updatedTransactionWebhook[field] = $scope.editTransactionWebhook[field];
        };

        $scope.updateTransactionWebhook = function () {
            $window.scrollTo(0, 0);
            $scope.editingTransactionWebhooks = !$scope.editingTransactionWebhooks;
            $scope.loadingTransactionWebhooks = true;
            if(vm.updatedTransactionWebhook.tx_type == 'All'){
                vm.updatedTransactionWebhook.tx_type = null;
            } else {
              vm.updatedTransactionWebhook.tx_type = $scope.editTransactionWebhook.tx_type.toLowerCase();
            }

            if(vm.updatedTransactionWebhook.event){
              vm.updatedTransactionWebhook.event = vm.updatedTransactionWebhook.event == 'Transaction Create' ?
               'transaction.create' : vm.updatedTransactionWebhook.event == 'Transaction Update' ? 'transaction.update' : vm.updatedTransactionWebhook.event == 'Transaction Delete' ?
               'transaction.delete' : vm.updatedTransactionWebhook.event == 'Transaction Initiate' ? 'transaction.initiate' : vm.updatedTransactionWebhook.event == 'Transaction Execute' ?
               'transaction.execute' : '';
             }

            $http.patch(API + '/admin/webhooks/transactions/'+ $scope.editTransactionWebhook.id + '/', vm.updatedTransactionWebhook, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingTransactionWebhooks = false;
                if (res.status === 200) {
                    vm.updatedTransactionWebhook = {};
                    vm.getTransactionWebhooks();
                    $scope.toggleTransactionWebhooksEditView();
                    toastr.success('You have successfully updated the Webhook!');
                }
            }).catch(function (error) {
                $scope.loadingTransactionWebhooks = false;
                vm.updatedTransactionWebhook = {};
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        vm.findIndexOfTransactionWebhook = function(element){
            return this.id == element.id;
        };

        $scope.openTransactionWebhooksModal = function (page, size,transactionWebhook) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'TransactionWebhooksModalCtrl',
                scope: $scope,
                resolve: {
                    transactionWebhook: function () {
                        return transactionWebhook;
                    }
                }
            });

            vm.theModal.result.then(function(transactionWebhook){
                var index = $scope.transactionWebhooks.findIndex(vm.findIndexOfTransactionWebhook,transactionWebhook);
                $scope.transactionWebhooks.splice(index, 1);
            }, function(){
            });
        };
    }
})();
