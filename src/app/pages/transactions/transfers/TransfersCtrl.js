(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.transfers')
        .controller('TransfersCtrl', TransfersCtrl);

    /** @ngInject */
    function TransfersCtrl($rootScope,$scope,$http,API,cookieManagement,toastr,errorToasts,errorHandler) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.transferData = {
            user: null,
            amount: null,
            reference: "",
            currency: null
        };

        $scope.onGoingTransaction = false;
        $scope.showAdvancedOption = false;
        $scope.confirmTransferView = false;
        $scope.completeTransferView = false;

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code){
                $scope.transferData.currency = $rootScope.selectedCurrency.code;
            }
        });

        $scope.toggleConfirmTransferView = function(confirmTransferView){
            $scope.confirmTransferView = !confirmTransferView;
        };

        $scope.toggleCompleteTransferView = function(completeTransferView){
            $scope.completeTransferView = !completeTransferView;
        };

        $scope.toggleTransferView = function() {
            $scope.confirmTransferView = false;
            $scope.completeTransferView = false;
            $scope.transferData = {
                user: null,
                amount: null,
                reference: null,
                currency: $rootScope.selectedCurrency.code
            };
        };

        $scope.createTransfer = function () {
            $scope.onGoingTransaction = true;
            $http.post(API + '/admin/transactions/transfer/',$scope.transferData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.onGoingTransaction = false;
                if (res.status === 201) {
                    toastr.success('You have successfully transferred the money!');
                    $scope.toggleConfirmTransferView($scope.confirmTransferView);
                    $scope.toggleCompleteTransferView();
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
