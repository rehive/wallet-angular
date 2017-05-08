(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('BankAccountModalCtrl', BankAccountModalCtrl);

    function BankAccountModalCtrl($scope,bankAccount,toastr,$http,API,cookieManagement,errorToasts,errorHandler) {

        var vm= this;

        $scope.bankAccount = bankAccount;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.deletingBankAccount = false;

        vm.findIndexOfBankAccount = function(element){
            return $scope.bankAccount.id == element.id;
        };

        $scope.deleteBankAccount = function () {
            $scope.deletingBankAccount = true;
            $http.delete(API + '/admin/bank-accounts/' + $scope.bankAccount.id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.$dismiss();
                $scope.deletingBankAccount = false;
                if (res.status === 204) {
                    var index = $scope.bankAccounts.findIndex(vm.findIndexOfBankAccount);
                    $scope.bankAccounts.splice(index, 1);
                    toastr.success('You have successfully deleted the bank account!');
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
