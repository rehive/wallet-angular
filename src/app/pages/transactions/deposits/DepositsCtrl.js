(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.deposits')
        .controller('DepositsCtrl', DepositsCtrl);

    /** @ngInject */
    function DepositsCtrl($rootScope,$scope,IMAGEURL,$http,API,cookieManagement,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.depositData = {
            user: null,
            amount: null,
            reference: "",
            confirm_on_create: false,
            currency: $rootScope.selectedCurrency.code
        };

        $scope.onGoingTransaction = false;
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
                user: null,
                amount: null,
                reference: "",
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
            $scope.onGoingTransaction = true;
            // $http.post takes the params as follow post(url, data, {config})
            // https://docs.angularjs.org/api/ng/service/$http#post
            $http.post(API + '/admin/transactions/deposit/', $scope.depositData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + vm.token
                }
            }).then(function (res) {
                console.log(res);
                $scope.onGoingTransaction = false;
                if (res.status === 201) {
                    toastr.success('You have successfully deposited your money!');
                    $scope.toggleConfirmDepositView($scope.confirmDepositView);
                    $scope.toggleCompleteDepositView();
                }
            }).catch(function (error) {
                console.log(error);
                $scope.onGoingTransaction = false;
                //ToDo:show toast message errors
            });
        }


    }

})();