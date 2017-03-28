(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.deposits')
        .controller('PendingDepositCtrl', PendingDepositCtrl);

    /** @ngInject */
    function PendingDepositCtrl($rootScope,$scope,$http,API,cookieManagement,$uibModal,toastr) {

        var vm = this;
        $scope.transactions = [];
        $scope.transactionsStateMessage = 'Loading Transactions...';
        vm.token = cookieManagement.getCookie('TOKEN');

        vm.getPendingTransactions = function(){
            $http.get(API + '/admin/transactions/?tx_type=deposit&status=Pending&orderby=-created', {
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
                }
            }).catch(function (error) {
                $scope.transactionsStateMessage = 'Failed To Load Data';
                console.log(error);
            });
        };
        vm.getPendingTransactions();

        $scope.openModal = function (page, size,transaction) {

            $uibModal.open({
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