(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.credit')
        .controller('CreditCtrl', CreditCtrl);

    /** @ngInject */
    function CreditCtrl($rootScope,$scope,$http,environmentConfig,cookieManagement,toastr,errorToasts,errorHandler,$location,$state,currencyModifiers) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.creditData = {
            user: null,
            amount: null,
            reference: "",
            confirm_on_create: true,
            metadata: "",
            currency: null,
            subtype: "",
            note: "",
            account: ""
        };

        if($state.params.email){
          $scope.creditData.user = $state.params.email;
        }

        $scope.onGoingTransaction = false;
        $scope.showAdvancedOption = false;
        $scope.showView = 'createCredit';

        if($location.path() === '/transactions/credit/pending'){
            $scope.showView = 'pendingCredit';
        }

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
                $scope.creditData.currency = $rootScope.selectedCurrency.code;
            }
        });

        $scope.goToView = function(view){
            if($scope.creditData.amount){
                var validAmount = currencyModifiers.validateCurrency($scope.creditData.amount,$rootScope.selectedCurrency.divisibility);
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

        $scope.toggleCreditView = function(view) {
            $scope.showAdvancedOption = false;
            $scope.creditData = {
                user: null,
                amount: null,
                reference: "",
                confirm_on_create: true,
                metadata: "",
                currency: $rootScope.selectedCurrency.code,
                subtype: "",
                note: "",
                account: ""
            };

            if(view == 'credit'){
                $location.path('/transactions/credit');
                $scope.goToView('createCredit');
            } else{
                $scope.goToView('pendingCredit');
                $location.path('/transactions/credit/pending');
            }
        };

        $scope.createCreditTransaction = function () {

            var sendTransactionData = {
                user: $scope.creditData.user,
                amount: currencyModifiers.convertToCents($scope.creditData.amount,$rootScope.selectedCurrency.divisibility),
                reference: $scope.creditData.reference,
                confirm_on_create: $scope.creditData.confirm_on_create,
                metadata: $scope.creditData.metadata,
                currency: $scope.creditData.currency,
                subtype: $scope.creditData.subtype,
                note: $scope.creditData.note,
                account: $scope.creditData.account
            };

            $scope.onGoingTransaction = true;
            // $http.post takes the params as follow post(url, data, {config})
            // https://docs.angularjs.org/api/ng/service/$http#post
            $http.post(environmentConfig.API + '/admin/transactions/credit/', sendTransactionData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.onGoingTransaction = false;
                if (res.status === 201) {
                    toastr.success('You have successfully credited your account!');
                    $scope.goToView('completeCredit');
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
