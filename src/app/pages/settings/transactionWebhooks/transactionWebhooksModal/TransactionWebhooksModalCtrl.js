(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.transactionWebhooks')
        .controller('TransactionWebhooksModalCtrl', TransactionWebhooksModalCtrl);

    function TransactionWebhooksModalCtrl($scope,$uibModalInstance,transactionWebhook,toastr,$http,API,cookieManagement,errorToasts,errorHandler) {

        var vm = this;

        $scope.transactionWebhook = transactionWebhook;
        $scope.deletingTransactionWebhook = false;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.deleteTransactionWebhook = function () {
            $scope.deletingTransactionWebhook = true;
            $http.delete(API + '/admin/webhooks/transactions/' + $scope.transactionWebhook.id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingTransactionWebhook = false;
                if (res.status === 200) {
                    toastr.success('Transaction Webhook successfully deleted');
                    $uibModalInstance.close($scope.transactionWebhook);
                }
            }).catch(function (error) {
                $scope.deletingTransactionWebhook = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
