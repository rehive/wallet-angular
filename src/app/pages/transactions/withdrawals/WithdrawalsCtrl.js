(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.withdrawals')
        .controller('WithdrawalsCtrl', WithdrawalsCtrl);

    /** @ngInject */
    function WithdrawalsCtrl($rootScope,$scope,IMAGEURL,$http,API,cookieManagement,toastr,errorToasts) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.withdrawalData = {
            user: null,
            amount: null,
            reference: "",
            confirm_on_create: false,
            currency: null
        };
        $scope.onGoingTransaction = false;
        $scope.showAdvancedOption = false;
        $scope.showView = 'createWithdrawal';
        $scope.currencyImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
                $scope.currencyImageUrl = IMAGEURL + $rootScope.selectedCurrency.code + '.png';
                $scope.withdrawalData.currency = $rootScope.selectedCurrency.code;
            }
        });

        $scope.goToView = function(view){
          $scope.showView = view;
        }

        $scope.displayAdvancedOption = function () {
            $scope.showAdvancedOption = true;
        };

        $scope.toggleWithdrawalView = function(view) {
            $scope.showAdvancedOption = false;
            $scope.withdrawalData = {
                user: null,
                amount: null,
                reference: '',
                confirm_on_create: false,
                currency: $rootScope.selectedCurrency.code
            };

            if(view == 'withdrawal'){
                $scope.goToView('createWithdrawal');
            } else{
                $scope.goToView('pendingWithdrawal');
            }
        };

        $scope.createWithdrawal = function () {
            //console.log($scope.withdrawalData);
            $scope.onGoingTransaction = true;
            $http.post(API + '/admin/transactions/withdraw/',$scope.withdrawalData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.onGoingTransaction = false;
                //console.log(res);
                if (res.status === 201) {
                    toastr.success('You have successfully withdrawn the money!');
                    $scope.goToView('completeWithdrawal');
                }
            }).catch(function (error) {
                $scope.onGoingTransaction = false;
                errorToasts.evaluateErrors(error.data.data);
            });
        }

    }
})();
