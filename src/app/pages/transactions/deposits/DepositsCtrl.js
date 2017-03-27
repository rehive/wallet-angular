(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.deposits')
        .controller('DepositsCtrl', DepositsCtrl);

    /** @ngInject */
    function DepositsCtrl($rootScope,$scope,IMAGEURL,$http,API,cookieManagement,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.depositData = {
            user: '',
            amount: '',
            reference: '',
            confirm_on_create: false,
            currency: $rootScope.selectedCurrency.code
        };
        $scope.showAdvancedOption = false;
        $scope.confirmDepositView = false;
        $scope.completeDepositView = false;
        $scope.pendingDepositView =false;
        $scope.currencyImageUrl = IMAGEURL + $rootScope.selectedCurrency.code + '.png';

        $rootScope.$watch('selectedCurrency',function(){
            $scope.currencyImageUrl = IMAGEURL + $rootScope.selectedCurrency.code + '.png';
            $scope.depositData.currency = $rootScope.selectedCurrency.code;
        });

        $scope.toggleConfirmDepositView = function(confirmDepositView){
            $scope.confirmDepositView = !confirmDepositView;
        };

        $scope.toggleCompleteDepositView = function(completeDepositView){
            $scope.completeDepositView = !completeDepositView;
        };

        $scope.displayAdvancedOption = function () {
            $scope.showAdvancedOption = true;
        };
        
        $scope.toggleDepositView = function(view) {
            $scope.showAdvancedOption = false;
            $scope.confirmDepositView = false;
            $scope.completeDepositView = false;
            $scope.depositData = {
                user: '',
                amount: '',
                reference: '',
                confirm_on_create: false,
                currency: $rootScope.selectedCurrency.code
            };


            if(view == 'deposit'){
                $scope.pendingDepositView = false;
            } else{
                $scope.pendingDepositView = true;
            }
        };

        $scope.createDeposit = function () {
            console.log($scope.depositData);
            $http.post(API + '/admin/transactions/deposit/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + vm.token
                },
                data: $scope.depositData
            }).then(function (res) {
                console.log(res);
                if (res.status === 200) {
                    toastr.success('You have successfully deposited your money!');
                    $scope.toggleConfirmDepositView($scope.confirmDepositView);
                    $scope.toggleCompleteDepositView();
                }
            }).catch(function (error) {
                console.log(error);
            });
        }


    }

})();