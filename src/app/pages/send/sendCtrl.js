(function () {
    'use strict';

    angular.module('BlurAdmin.pages.send')
        .controller('SendCtrl', SendCtrl);

    /** @ngInject */
    function SendCtrl($rootScope,$scope,$location,$uibModal,toastr,cookieManagement,environmentConfig,$http,errorToasts,errorHandler,$window) {
        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.showSendTo = true;

        vm.getUserAccounts = function(){
            if(vm.token) {
                $scope.loadingUserInfo = true;
                $http.get(environmentConfig.API + '/user/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingUserInfo = false;
                    if (res.status === 200) {
                        $scope.user = res.data.data;
                        //console.log($scope.user);
                    }
                }).catch(function (error) {
                    $scope.loadingCurrencies = false;
                    if(error.status == 403){
                        errorHandler.handle403();
                        return;
                    }
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getUserAccounts();

        $scope.send = function(recipient, amount, debit_note){
            if(vm.token) {
                amount = amount * Math.pow(10, $scope.user.currency.divisibility);
                $scope.loadingUserInfo = true;
                $http.post(environmentConfig.API + '/transactions/transfer/', {
                    amount: amount,
                    recipient: recipient,
                    debit_note: debit_note
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingUserInfo = false;
                    if (res.status === 201) {
                        $location.path('/transactions');
                    }
                }).catch(function (error) {
                    $scope.loadingUserInfo = false;
                    if(error.status == 403){
                        errorHandler.handle403();
                        return;
                    }
                    errorToasts.evaluateErrors(error.data);
                });
            }
        }

        $scope.openConfirmationModal = function(recipient, amount, debit_note){
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/send/confirmationModal/confirmationModal.html',
                size: 'md',
                controller: 'ConfirmationModalCtrl',
                scope: $scope,
                resolve: {
                    transfer: function () {
                        return {
                            amount: amount,
                            recipient: recipient,
                            debit_note: debit_note,
                            currency: $scope.user.currency.symbol
                        };
                    }
                }
            });

            vm.theModal.result.then(function(confirmation){
                if(confirmation === true){
                    $scope.send(recipient, amount, debit_note);
                }
            }, function(){
            });
        }
    }

})();
