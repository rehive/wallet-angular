(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings.accountCurrencyLimits')
        .controller('AccountCurrencyLimitsModalCtrl', AccountCurrencyLimitsModalCtrl);

    function AccountCurrencyLimitsModalCtrl($scope,$uibModalInstance,accountCurrencyLimit,currencyCode,reference,toastr,$http,environmentConfig,cookieManagement,errorToasts,errorHandler) {

        var vm = this;
        vm.currencyCode = currencyCode;
        vm.reference = reference;
        $scope.accountCurrencyLimit = accountCurrencyLimit;
        $scope.deletingAccountCurrencyLimits = false;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.deleteAccountCurrencyLimit = function () {
            $scope.deletingAccountCurrencyLimits = true;
            $http.delete(environmentConfig.API + '/admin/accounts/' + vm.reference + '/currencies/' + vm.currencyCode + '/limits/' + $scope.accountCurrencyLimit.id +'/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingAccountCurrencyLimits = false;
                if (res.status === 200) {
                    toastr.success('Account currency limit successfully deleted');
                    $uibModalInstance.close($scope.accountCurrencyLimit);
                }
            }).catch(function (error) {
                $scope.deletingAccountCurrencyLimits = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
