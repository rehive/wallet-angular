(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.withdrawals')
        .controller('WithdrawalsCtrl', WithdrawalsCtrl);

    /** @ngInject */
    function WithdrawalsCtrl($rootScope,$scope,IMAGEURL,$http,API,cookieManagement,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.withdrawalData = {
            user: null,
            amount: null,
            reference: '',
            confirm_on_create: false,
            currency: null
        };

        $scope.onGoingTransaction = false;
        $scope.showAdvancedOption = false;
        $scope.confirmWithdrawalView = false;
        $scope.completeWithdrawalView = false;
        $scope.pendingWithdrawalView =false;
        $scope.currencyImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
                $scope.currencyImageUrl = IMAGEURL + $rootScope.selectedCurrency.code + '.png';
                $scope.withdrawalData.currency = $rootScope.selectedCurrency.code;
            }
        });

        $scope.toggleConfirmWithdrawalView = function(confirmWithdrawalView){
            $scope.confirmWithdrawalView = !confirmWithdrawalView;
        };

        $scope.toggleCompleteWithdrawalView = function(completeWithdrawalView){
            $scope.completeWithdrawalView = !completeWithdrawalView;
        };

        $scope.displayAdvancedOption = function () {
            $scope.showAdvancedOption = true;
        };

        $scope.toggleWithdrawalView = function(view) {
            $scope.showAdvancedOption = false;
            $scope.confirmWithdrawalView = false;
            $scope.completeWithdrawalView = false;
            $scope.withdrawalData = {
                user: null,
                amount: null,
                reference: '',
                confirm_on_create: false,
                currency: $rootScope.selectedCurrency.code
            };

            if(view == 'withdrawal'){
                $scope.pendingWithdrawalView = false;
            } else{
                $scope.pendingWithdrawalView = true;
            }
        };

        $scope.createWithdrawal = function () {
            console.log($scope.withdrawalData);
            $scope.onGoingTransaction = true;
            $http.post(API + '/admin/transactions/withdraw/',$scope.withdrawalData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + vm.token
                }
            }).then(function (res) {
                $scope.onGoingTransaction = false;
                console.log(res);
                if (res.status === 201) {
                    toastr.success('You have successfully withdrawn the money!');
                    $scope.toggleConfirmWithdrawalView($scope.confirmWithdrawalView);
                    $scope.toggleCompleteWithdrawalView();
                }
            }).catch(function (error) {
                $scope.onGoingTransaction = false;
                console.log(error);
                //ToDo:show toast message errors
            });
        }

    }
})();