(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.debit')
        .controller('PendingDebitCtrl', PendingDebitCtrl);

    /** @ngInject */
    function PendingDebitCtrl($rootScope,$scope,$http,API,cookieManagement,$uibModal,errorToasts,errorHandler) {

        var vm = this;
        $scope.transactions = [];
        $scope.transactionsStateMessage = '';
        vm.token = cookieManagement.getCookie('TOKEN');

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
              $scope.transactionsStateMessage = '';
              $scope.transactions.length = 0;
              vm.getPendingTransactions();
            }
        });

        vm.getPendingTransactions = function(){
            $http.get(API + '/admin/transactions/?tx_type=debit&status=Pending&orderby=-created&currency=' + $rootScope.selectedCurrency.code, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    if(res.data.data.results.length == 0){
                        $scope.transactionsStateMessage = 'No Pending Transactions';
                        return;
                    }
                    $scope.transactions = res.data.data.results;
                    $scope.transactionsStateMessage = '';
                }
            }).catch(function (error) {
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                $scope.transactionsStateMessage = 'Failed To Load Data';
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.openModal = function (page, size,transaction) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'PendingDebitModalCtrl',
                resolve: {
                    transaction: function () {
                        return transaction;
                    }
                }
            });
        };

    }
})();
