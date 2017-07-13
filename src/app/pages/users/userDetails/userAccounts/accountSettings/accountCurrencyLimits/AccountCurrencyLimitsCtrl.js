(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings')
        .controller('AccountCurrencyLimitsCtrl', AccountCurrencyLimitsCtrl);

    /** @ngInject */
    function AccountCurrencyLimitsCtrl($rootScope,$scope,$stateParams,$http,API,cookieManagement,errorToasts,currencyModifiers,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.currencyCode = $stateParams.currencyCode;
        vm.reference = $stateParams.reference;
        $scope.loadingAccountCurrencyLimits = true;
        $scope.editingAccountCurrencyLimits = false;
        vm.updatedAccountCurrencyLimit = {};
        $scope.accountCurrencyLimitsParams = {
            tx_type: 'Credit',
            type: 'Maximum'
        };
        $scope.txTypeOptions = ['Credit','Debit'];
        $scope.typeOptions = ['Maximum','Maximum per day','Maximum per month','Minimum','Overdraft'];

        $scope.getAccountCurrencyLimits = function(){
            if(vm.token) {
                $scope.loadingAccountCurrencyLimits = true;
                $http.get(API + '/admin/accounts/' + vm.reference + '/currencies/' + vm.currencyCode + '/limits/',{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingAccountCurrencyLimits = false;
                    if (res.status === 200) {
                       $scope.accountCurrencyLimitsList = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingAccountCurrencyLimits = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        $scope.getAccountCurrencyLimits();

        $scope.addAccountCurrencyLimit = function(accountCurrencyLimitsParams){
            if(currencyModifiers.validateCurrency(accountCurrencyLimitsParams.value,$rootScope.selectedCurrency.divisibility)){
                accountCurrencyLimitsParams.value = currencyModifiers.convertToCents(accountCurrencyLimitsParams.value,$rootScope.selectedCurrency.divisibility);
            } else {
                toastr.error('Please input amount to ' + $rootScope.selectedCurrency.divisibility + ' decimal places');
                return;
            }
            if(vm.token) {
                $scope.loadingAccountCurrencyLimits = true;
                accountCurrencyLimitsParams.tx_type = accountCurrencyLimitsParams.tx_type.toLowerCase();
                accountCurrencyLimitsParams.type = accountCurrencyLimitsParams.type == 'Maximum' ? 'max': accountCurrencyLimitsParams.type == 'Maximum per day' ? 'day_max':
                    accountCurrencyLimitsParams.type == 'Maximum per month' ? 'month_max': accountCurrencyLimitsParams.type == 'Minimum' ? 'min': 'overdraft';

                $http.post(API + '/admin/accounts/' + vm.reference + '/currencies/' + vm.currencyCode + '/limits/',accountCurrencyLimitsParams,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingAccountCurrencyLimits = false;
                    if (res.status === 201) {
                        toastr.success('Limit added successfully.');
                        $scope.accountCurrencyLimitsParams = {
                            tx_type: 'Credit',
                            type: 'Maximum'
                        };
                        $scope.getAccountCurrencyLimits();
                    }
                }).catch(function (error) {
                    $scope.accountCurrencyLimitsParams = {
                        tx_type: 'Credit',
                        type: 'Maximum'
                    };
                    $scope.loadingAccountCurrencyLimits = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };


    }
})();