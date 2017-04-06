(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('LatestTransactionsCtrl', LatestTransactionsCtrl);

    /** @ngInject */
    function LatestTransactionsCtrl($scope,$uibModal,$http,API,cookieManagement,errorToasts) {

        var vm = this;
        $scope.transactions = [];
        $scope.transactionsStateMessage = '';
        vm.token = cookieManagement.getCookie('TOKEN');

        vm.getLatestTransactions = function(){
            $http.get(API + '/admin/transactions/?page_size=3&orderby=-created', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    if(res.data.data.results.length == 0){
                        $scope.transactionsStateMessage = 'No Transactions Have Been Made';
                    }
                    $scope.transactions = res.data.data.results;
                    $scope.transactionsStateMessage = '';
                }
            }).catch(function (error) {
                $scope.transactionsStateMessage = 'Failed To Load Data';
                errorToasts.evaluateErrors(error.data.data);
            });
        };
        vm.getLatestTransactions();

        $scope.openModal = function (page, size,transaction) {
            $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'transactionModalCtrl',
                resolve: {
                    transaction: function () {
                        return transaction;
                    }
                }
            });
        };

    }
})();
