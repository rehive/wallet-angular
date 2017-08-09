(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .controller('LatestTransactionsCtrl', LatestTransactionsCtrl);

    /** @ngInject */
    function LatestTransactionsCtrl($scope,$uibModal,$http,environmentConfig,cookieManagement,errorToasts,errorHandler,$window,$location) {

        var vm = this;
        $scope.transactions = [];
        $scope.transactionsStateMessage = '';
        vm.token = cookieManagement.getCookie('TOKEN');

        vm.getLatestTransactions = function(){
            if(vm.token) {
                $http.get(environmentConfig.API + '/admin/transactions/?page_size=4&orderby=-created', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        if (res.data.data.results.length == 0) {
                            $scope.transactionsStateMessage = 'No transactions have been made';
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
                    $scope.transactionsStateMessage = 'Failed to load data';
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
       // vm.getLatestTransactions();

        $scope.goToAllTransactions = function(){
            $location.path('/transactions/history');
        };

        $scope.openViewInNewTab =  function(event,path){
            if(event.button == 1){
                $window.open(path, "_blank");
            }
        };

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
