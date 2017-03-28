(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.withdrawals')
        .controller('WithdrawalsCtrl', WithdrawalsCtrl);

    /** @ngInject */
    function WithdrawalsCtrl($rootScope,$scope,IMAGEURL,$http,API,cookieManagement,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.withdrawalData = {
            user: '',
            amount: '',
            reference: '',
            confirm_on_create: false,
            currency: $rootScope.selectedCurrency.code
        };
        $scope.showAdvancedOption = false;
        $scope.confirmWithdrawalView = false;
        $scope.completeWithdrawalView = false;
        $scope.pendingWithdrawalView =false;
        $scope.currencyImageUrl = IMAGEURL + $rootScope.selectedCurrency.code + '.png';

        $rootScope.$watch('selectedCurrency',function(){
            $scope.currencyImageUrl = IMAGEURL + $rootScope.selectedCurrency.code + '.png';
            $scope.withdrawalData.currency = $rootScope.selectedCurrency.code;
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
                user: '',
                amount: '',
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
            $http.post(API + '/admin/transactions/withdraw/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + vm.token
                },
                data: $scope.withdrawalData
            }).then(function (res) {
                console.log(res);
                if (res.status === 200) {
                    toastr.success('You have successfully withdrawn the money!');
                    $scope.toggleConfirmWithdrawalView($scope.confirmWithdrawalView);
                    $scope.toggleCompleteWithdrawalView();
                }
            }).catch(function (error) {
                console.log(error);
            });
        }

    }
})();