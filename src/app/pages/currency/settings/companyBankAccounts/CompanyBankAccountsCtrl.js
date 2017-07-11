(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings.companyBankAccounts')
        .controller('CompanyBankAccountsCtrl', CompanyBankAccountsCtrl);

    /** @ngInject */
    function CompanyBankAccountsCtrl($rootScope,$scope,API,$http,cookieManagement,errorToasts,toastr,_) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingCompanyBankAccounts = true;

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
                vm.getCompanyBankAccounts();
            }
        });

        vm.getCompanyBankAccounts = function(){
            if(vm.token) {
                $scope.loadingCompanyBankAccounts = true;
                $http.get(API + '/admin/bank-accounts/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        vm.getSingleCurrencyBankAccounts(res.data.data);
                    }
                }).catch(function (error) {
                    $scope.loadingCompanyBankAccounts = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.getSingleCurrencyBankAccounts = function(companyBankAccounts){
            if(vm.token) {
                $http.get(API + '/admin/currencies/' + $rootScope.selectedCurrency.code + '/bank-accounts/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingCompanyBankAccounts = false;
                    if (res.status === 200) {
                        if(res.data.data.results.length > 0 ){
                            var currencyBankAccountsIds =_.pluck(res.data.data.results, 'id');
                            vm.checkSelectedBankAccount(companyBankAccounts,currencyBankAccountsIds);
                        } else {
                            $scope.companyBankAccounts = companyBankAccounts;
                        }
                    }
                }).catch(function (error) {
                    $scope.loadingCompanyBankAccounts = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.checkSelectedBankAccount = function (companyBankAccounts,currencyBankAccountsIds){
            currencyBankAccountsIds.forEach(function (id) {
                companyBankAccounts.forEach(function(bankAccount){
                    if(bankAccount.id == id){
                        bankAccount.checked = true;
                    }
                })
            });

            $scope.companyBankAccounts = companyBankAccounts;
        };

        $scope.saveMarkedBankAccounts = function (bank) {
            if(bank.checked){
                vm.activateBankAccountForCurrency(bank.id);
            } else {
                vm.deleteBankAccountForCurrency(bank.id);
            }
        };

        vm.activateBankAccountForCurrency = function(id){
            $scope.loadingCompanyBankAccounts = true;
            if(vm.token) {
                $http.post(API + '/admin/currencies/' + $rootScope.selectedCurrency.code + '/bank-accounts/', {id: id} ,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingCompanyBankAccounts = false;
                    toastr.success('Bank successfully added');
                }).catch(function (error) {
                    $scope.loadingCompanyBankAccounts = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.deleteBankAccountForCurrency = function(id){
            $scope.loadingCompanyBankAccounts = true;
            if(vm.token) {
                $http.delete(API + '/admin/currencies/' + $rootScope.selectedCurrency.code + '/bank-accounts/' +id +'/',{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingCompanyBankAccounts = false;
                    toastr.success('Bank successfully removed');
                }).catch(function (error) {
                    $scope.loadingCompanyBankAccounts = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

    }
})();
