(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.deposits')
        .controller('DepositsCtrl', DepositsCtrl);

    /** @ngInject */
    function DepositsCtrl($rootScope,$scope,IMAGEURL,$http,API,cookieManagement,toastr,errorToasts,errorHandler,$state) {

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
        };

        $scope.onGoingTransaction = false;
        $scope.showAdvancedOption = false;
        $scope.showView = 'createDeposit';
        $scope.currencyImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
                $scope.currencyImageUrl = IMAGEURL + $rootScope.selectedCurrency.code + '.png';
                $scope.depositData.currency = $rootScope.selectedCurrency.code;
            }
        });

        $scope.goToView = function(view){
          $scope.showView = view;
        }

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
            $scope.onGoingTransaction = true;
            // $http.post takes the params as follow post(url, data, {config})
            // https://docs.angularjs.org/api/ng/service/$http#post
            //console.log($Scope.depositData);
            $http.post(API + '/admin/transactions/deposit/', $scope.depositData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                //console.log(res);
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
