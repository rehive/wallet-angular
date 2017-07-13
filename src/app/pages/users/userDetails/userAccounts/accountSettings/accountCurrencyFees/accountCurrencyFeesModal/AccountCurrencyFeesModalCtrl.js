(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings')
        .controller('AccountCurrencyFeesModalCtrl', AccountCurrencyFeesModalCtrl);

    function AccountCurrencyFeesModalCtrl($scope,$uibModalInstance,accountCurrencyFee,currencyCode,reference,toastr,$http,API,cookieManagement,errorToasts,errorHandler) {

        var vm = this;
        vm.currencyCode = currencyCode;
        vm.reference = reference;
        $scope.accountCurrencyFee = accountCurrencyFee;
        $scope.deletingAccountCurrencyFees = false;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.deleteAccountCurrencyFee = function () {
            $scope.deletingAccountCurrencyFees = true;
            $http.delete(API + '/admin/accounts/' + vm.reference + '/currencies/' + vm.currencyCode + '/fees/' + $scope.accountCurrencyFee.id +'/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingAccountCurrencyFees = false;
                if (res.status === 200) {
                    toastr.success('Account currency fee successfully deleted');
                    $uibModalInstance.close($scope.accountCurrencyFee);
                }
            }).catch(function (error) {
                $scope.deletingAccountCurrencyFees = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
