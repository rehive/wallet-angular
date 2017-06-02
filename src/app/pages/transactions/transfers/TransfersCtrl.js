(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.transfers')
        .controller('TransfersCtrl', TransfersCtrl);

    /** @ngInject */
    function TransfersCtrl($rootScope,$scope,$http,API,cookieManagement,toastr,errorToasts,errorHandler,currencyModifiers) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.transferData = {
            user: null,
            amount: null,
            reference: "",
            currency: null
        };

        $scope.onGoingTransaction = false;
        $scope.showView = 'createTransfer';

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code){
                $scope.transferData.currency = $rootScope.selectedCurrency.code;
            }
        });

        $scope.goToView = function(view){
            if($scope.transferData.amount){
                var validAmount = currencyModifiers.validateCurrency($scope.transferData.amount,$rootScope.selectedCurrency.divisibility);
                if(validAmount){
                    $scope.showView = view;
                } else {
                    toastr.error('Please input amount to ' + $rootScope.selectedCurrency.divisibility + ' decimal places');
                }
            } else{
                $scope.showView = view;
            }
        };

        $scope.toggleTransferView = function() {
            $scope.transferData = {
                user: null,
                amount: null,
                reference: null,
                currency: $rootScope.selectedCurrency.code
            };

            $scope.goToView('createTransfer');
        };

        $scope.createTransfer = function () {

            var sendTransactionData = {
                user: $scope.transferData.user,
                amount: currencyModifiers.convertToCents($scope.transferData.amount,$rootScope.selectedCurrency.divisibility),
                reference: $scope.transferData.reference,
                currency: $scope.transferData.currency
            };

            $scope.onGoingTransaction = true;
            $http.post(API + '/admin/transactions/transfer/',sendTransactionData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.onGoingTransaction = false;
                if (res.status === 201) {
                    toastr.success('You have successfully transferred the money!');
                    $scope.goToView('completeTransfer');
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
