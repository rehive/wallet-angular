(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('TransactionsSwitchModalCtrl', TransactionsSwitchModalCtrl);

    function TransactionsSwitchModalCtrl($scope,$uibModalInstance,transactionsSwitches,toastr,$http,API,cookieManagement,errorToasts,errorHandler) {

        var vm = this;

        $scope.transactionsSwitches = transactionsSwitches;
        $scope.deletingTransactionsSwitches = false;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.deleteTransactionsSwitch = function () {
            $scope.deletingTransactionsSwitches = true;
            $http.delete(API + '/admin/company/switches/' + $scope.transactionsSwitches.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingTransactionsSwitches = false;
                if (res.status === 200) {
                    toastr.success('Transactions switch successfully deleted');
                    $uibModalInstance.close($scope.transactionsSwitches);
                }
            }).catch(function (error) {
                $scope.deletingTransactionsSwitches = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
