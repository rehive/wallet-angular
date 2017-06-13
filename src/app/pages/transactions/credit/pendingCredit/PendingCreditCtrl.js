(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.credit')
        .controller('PendingCreditCtrl', PendingCreditCtrl);

    /** @ngInject */
    function PendingCreditCtrl($rootScope,$scope,$http,API,cookieManagement,$uibModal,errorToasts) {

        var vm = this;
        $scope.transactions = {};
        $scope.transactions.list = [];
        $scope.transactionsStateMessage = '';
        vm.token = cookieManagement.getCookie('TOKEN');

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
              $scope.transactionsStateMessage = '';
              $scope.transactions.list.length = 0;
              vm.getPendingTransactions();
            }
        });

        vm.getPendingTransactions = function(){
            $scope.transactions.list = [];
            if(vm.token) {
                $http.get(API + '/admin/transactions/?tx_type=credit&status=Pending&orderby=-created&currency=' + $rootScope.selectedCurrency.code, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        if (res.data.data.results.length == 0) {
                            $scope.transactionsStateMessage = 'No Pending Transactions';
                            return;
                        }
                        $scope.transactions.list = res.data.data.results;
                        $scope.transactionsStateMessage = '';
                    }
                }).catch(function (error) {
                    $scope.transactionsStateMessage = 'Failed To Load Data';
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.openModal = function (page, size,transaction) {

            vm.theModel = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'PendingCreditModalCtrl',
                resolve: {
                    transaction: function () {
                        return transaction;
                    }
                }
            });

            //vm.theModel.result.then(function(){
            //    setTimeout(function(){vm.getPendingTransactions()}, 2000);
            //}, function(){
            //    setTimeout(function(){vm.getPendingTransactions()}, 2000);
            //});

        };

    }
})();
