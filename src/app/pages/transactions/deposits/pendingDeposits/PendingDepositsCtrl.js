(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.deposits')
        .controller('PendingDepositCtrl', PendingDepositCtrl);

    /** @ngInject */
    function PendingDepositCtrl($rootScope,$scope,$http,API,cookieManagement,$uibModal,errorToasts) {

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
            $http.get(API + '/admin/transactions/?tx_type=deposit&status=Pending&orderby=-created&currency=' + $rootScope.selectedCurrency.code, {
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
                $scope.transactionsStateMessage = 'Failed To Load Data';
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.openModal = function (page, size,transaction) {

            vm.theModel = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'PendingDepositsModalCtrl',
                resolve: {
                    transaction: function () {
                        return transaction;
                    }
                }
            });
        };

    }
})();
