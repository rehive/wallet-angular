(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('BankAccountModalCtrl', BankAccountModalCtrl);

    function BankAccountModalCtrl($scope,$uibModalInstance,bankAccount,toastr,$http,API,cookieManagement,errorToasts,errorHandler) {

        var vm= this;

        $scope.bankAccount = bankAccount;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.deletingBankAccount = false;


        $scope.deleteBankAccount = function () {
            $scope.deletingBankAccount = true;
            $http.delete(API + '/admin/bank-accounts/' + $scope.bankAccount.id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingBankAccount = false;
                if (res.status === 200) {
                    toastr.success('Bank account successfully deleted');
                    $uibModalInstance.close($scope.bankAccount);
                }
            }).catch(function (error) {
                $scope.deletingBankAccount = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
