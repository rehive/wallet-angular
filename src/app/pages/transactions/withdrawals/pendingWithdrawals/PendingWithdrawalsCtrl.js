(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.withdrawals')
        .controller('PendingWithdrawalCtrl', PendingWithdrawalCtrl);

    /** @ngInject */
    function PendingWithdrawalCtrl($timeout,$scope,$http,API,cookieManagement,$uibModal,toastr) {

        var vm = this;
        $scope.transactions = [];
        $scope.transactionsStateMessage = '';
        vm.token = cookieManagement.getCookie('TOKEN');

        vm.getPendingTransactions = function(){
            $http.get(API + '/admin/transactions/?tx_type=withdraw&status=Pending&orderby=-created', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + vm.token
                }
            }).then(function (res) {
                console.log(res);

                if (res.status === 200) {
                    if(res.data.data.results.length == 0){
                        $scope.transactionsStateMessage = 'No Pending Transactions';
                    }
                    $scope.transactions = res.data.data.results;
                    $scope.transactionsStateMessage = '';
                }
            }).catch(function (error) {
                $scope.transactionsStateMessage = 'Failed To Load Data';
                console.log(error);
            });
        };
        vm.getPendingTransactions();

        $scope.openModal = function (page, size,transaction) {

            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'PendingWithdrawalsModalCtrl',
                resolve: {
                    transaction: function () {
                        return transaction;
                    }
                }
            });

            //vm.theModal.result.finally(function(){
            //    $scope.transactions = [];
            //    $timeout(function(){
            //        vm.getPendingTransactions();
            //    },2000);
            //});
        };
    }
})();