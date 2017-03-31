(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.transfers')
        .controller('TransfersCtrl', TransfersCtrl);

    /** @ngInject */
    function TransfersCtrl($rootScope,$scope,IMAGEURL,$http,API,cookieManagement,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.transferData = {
            user: null,
            amount: null,
            reference: null,
            currency: null
        };

        $scope.onGoingTransaction = false;
        $scope.showAdvancedOption = false;
        $scope.confirmTransferView = false;
        $scope.completeTransferView = false;
        $scope.currencyImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code){
                $scope.currencyImageUrl = IMAGEURL + $rootScope.selectedCurrency.code + '.png';
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
            console.log($scope.transferData);
            $scope.onGoingTransaction = true;
            $http.post(API + '/admin/transactions/transfer/',$scope.transferData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + vm.token
                }
            }).then(function (res) {
                $scope.onGoingTransaction = false;
                console.log(res);
                if (res.status === 201) {
                    toastr.success('You have successfully transferred the money!');
                    $scope.toggleConfirmTransferView($scope.confirmTransferView);
                    $scope.toggleCompleteTransferView();
                }
            }).catch(function (error) {
                $scope.onGoingTransaction = false;
                console.log(error);
                //ToDo:show toast message errors
            });
        }

    }
})();