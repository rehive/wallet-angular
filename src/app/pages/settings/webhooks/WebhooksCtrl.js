(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('WebhooksCtrl', WebhooksCtrl);

    /** @ngInject */
    function WebhooksCtrl($scope,API,$uibModal,toastr,$http,cookieManagement,errorToasts,$window,stringService,errorHandler) {

        var vm = this;
        vm.updatedWebhook = {};
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingWebhooks = true;
        $scope.editWebhook = {};

        $scope.webhooksParams = {
            tx_type: 'Credit'
        };

        $scope.typeOptions = ['Credit','Debit'];

        $scope.toggleWebhooksEditView = function(webhook){
            if(webhook){
                webhook.tx_type = stringService.capitalizeWord(webhook.tx_type);
            }
            webhook ? $scope.editWebhook = webhook : $scope.editWebhook = {};
            $scope.editingWebhooks = !$scope.editingWebhooks;
        };

        vm.getWebhooks = function () {
            if(vm.token) {
                $scope.loadingWebhooks = true;
                $http.get(API + '/admin/webhooks/users/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingWebhooks = false;
                    console.log(res);
                    if (res.status === 200) {
                        $scope.webhooks = res.data.data;
                        $window.scrollTo(0, 0);
                    }
                }).catch(function (error) {
                    $scope.loadingWebhooks = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getWebhooks();

        $scope.addWebhooks = function (webhooksParams) {
            $scope.loadingWebhooks = true;
            webhooksParams.tx_type = webhooksParams.tx_type.toLowerCase();
            $http.post(API + '/admin/webhooks/', webhooksParams, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingWebhooks = false;
                if (res.status === 201) {
                    vm.getWebhooks();
                    toastr.success('You have successfully added the Webhook!');
                    $scope.webhooksParams = {tx_type: 'Transfer'};
                    $window.scrollTo(0, 0);
                }
            }).catch(function (error) {
                $scope.webhooksParams = {tx_type: 'Transfer'};
                $scope.loadingWebhooks = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.webhookChanged = function(field){
            vm.updatedWebhook[field] = $scope.editWebhook[field];
        };

        $scope.updateWebhook = function () {
            $window.scrollTo(0, 0);
            $scope.editingWebhooks = !$scope.editingWebhooks;
            $scope.loadingWebhooks = true;
            vm.updatedWebhook.tx_type = $scope.editWebhook.tx_type.toLowerCase();
            $http.patch(API + '/admin/webhooks/'+ $scope.editWebhook.id + '/', vm.updatedWebhook, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingWebhooks = false;
                if (res.status === 200) {
                    vm.getWebhooks();
                    toastr.success('You have successfully updated the Webhook!');
                }
            }).catch(function (error) {
                $scope.loadingWebhooks = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.openWebhooksModal = function (page, size,webhook) {
            $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'WebhooksModalCtrl',
                scope: $scope,
                resolve: {
                    webhook: function () {
                        return webhook;
                    }
                }
            });
        };
    }
})();
