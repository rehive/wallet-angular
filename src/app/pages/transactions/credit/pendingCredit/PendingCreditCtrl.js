(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.credit.pendingCredit')
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

        vm.findIndexOfTransaction = function(element){
            return this.id == element.id;
        };

        $scope.openModal = function (page, size,transaction) {

            vm.theModal = $uibModal.open({
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

            vm.theModal.result.then(function(transaction){
                var index = $scope.transactions.list.findIndex(vm.findIndexOfTransaction,transaction);
                $scope.transactions.list.splice(index, 1);
                if($scope.transactions.list.length == 0){
                    $scope.transactionsStateMessage = 'No Pending Transactions';
                    return;
                }
            }, function(){
            });

        };

    }
})();
