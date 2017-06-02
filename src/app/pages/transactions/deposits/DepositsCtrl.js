(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.deposits')
        .controller('DepositsCtrl', DepositsCtrl);

    /** @ngInject */
    function DepositsCtrl($rootScope,$scope,$http,API,cookieManagement,toastr,errorToasts,errorHandler,$state,currencyModifiers) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.depositData = {
            user: null,
            amount: null,
            reference: "",
            confirm_on_create: true,
            metadata: "",
            currency: null
        };

        if($state.params.email){
          $scope.depositData.user = $state.params.email;
        }

        $scope.onGoingTransaction = false;
        $scope.showAdvancedOption = false;
        $scope.showView = 'createDeposit';

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
                $scope.depositData.currency = $rootScope.selectedCurrency.code;
            }
        });

        $scope.goToView = function(view){
            if($scope.depositData.amount){
                var validAmount = currencyModifiers.validateCurrency($scope.depositData.amount,$rootScope.selectedCurrency.divisibility);
                if(validAmount){
                    $scope.showView = view;
                } else {
                    toastr.error('Please input amount to ' + $rootScope.selectedCurrency.divisibility + ' decimal places');
                }
            } else{
                $scope.showView = view;
            }
        };

        $scope.displayAdvancedOption = function () {
            $scope.showAdvancedOption = true;
        };

        $scope.toggleDepositView = function(view) {
            $scope.showAdvancedOption = false;
            $scope.depositData = {
                user: null,
                amount: null,
                reference: "",
                confirm_on_create: true,
                metadata: "",
                currency: $rootScope.selectedCurrency.code
            };

            if(view == 'deposit'){
                $scope.goToView('createDeposit');
            } else{
                $scope.goToView('pendingDeposit');
            }
        };

        $scope.createDeposit = function () {

            var sendTransactionData = {
                user: $scope.depositData.user,
                amount: currencyModifiers.convertToCents($scope.depositData.amount,$rootScope.selectedCurrency.divisibility),
                reference: $scope.depositData.reference,
                confirm_on_create: $scope.depositData.confirm_on_create,
                metadata: $scope.depositData.metadata,
                currency: $scope.depositData.currency
            };

            $scope.onGoingTransaction = true;
            // $http.post takes the params as follow post(url, data, {config})
            // https://docs.angularjs.org/api/ng/service/$http#post
            $http.post(API + '/admin/transactions/deposit/', sendTransactionData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.onGoingTransaction = false;
                if (res.status === 201) {
                    toastr.success('You have successfully deposited your money!');
                    $scope.goToView('completeDeposit');
                }
            }).catch(function (error) {
                $scope.onGoingTransaction = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        }

    }
})();
