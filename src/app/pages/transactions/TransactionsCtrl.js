(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions')
        .controller('TransactionsCtrl', TransactionsCtrl);

    /** @ngInject */
    function TransactionsCtrl($scope,environmentConfig,$http,cookieManagement,$uibModal,errorToasts,$state,$window,errorHandler) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.pagination = {
            itemsPerPage: 26,
            pageNo: 1,
            maxSize: 5
        };

        $scope.transactionsList = [];
        $scope.transactionsStateMessage = '';
        $scope.transactionsData = {};
        $scope.loadingTransactions = false;
        $scope.typeOptions = ['Type','Credit','Debit']; //Transfer
        $scope.statusOptions = ['Status','Initiating','Processing','Pending','Complete','Failed'];
        $scope.currencyOptions = [];
        $scope.orderByOptions = ['Largest','Latest','Smallest'];

        vm.getTransactionUrl = function(){
            vm.filterParams = '?page=' + $scope.pagination.pageNo + '&page_size=' + $scope.pagination.itemsPerPage
                + '&orderby=-created';

            return environmentConfig.API + '/transactions/' + vm.filterParams;
        };

        $scope.getLatestTransactions = function(){
            if(vm.token) {
                $scope.transactionsStateMessage = '';
                $scope.loadingTransactions = true;

                if ($scope.transactionsList.length > 0) {
                    $scope.transactionsList.length = 0;
                }

                var transactionsUrl = vm.getTransactionUrl();

                $http.get(transactionsUrl, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingTransactions = false;
                    if (res.status === 200) {
                        $scope.transactionsData = res.data.data;
                        $scope.transactionsList = $scope.transactionsData.results;
                        if ($scope.transactionsData.count == 0) {
                            $scope.transactionsStateMessage = 'No transactions have been made';
                            return;
                        }

                        $scope.transactionsStateMessage = '';
                    }
                }).catch(function (error) {
                    $scope.loadingTransactions = false;
                    if (error.status == 403) {
                        errorHandler.handle403();
                        return
                    }
                    $scope.transactionsStateMessage = 'Failed To Load Data';
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        $scope.getLatestTransactions();

        $scope.openModal = function (page, size,transaction) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'TransactionModalCtrl',
                resolve: {
                    transaction: function () {
                        return transaction;
                    }
                }
            });

            vm.theModal.result.then(function(transaction){
                if(transaction){
                    $scope.searchParams = {
                        searchId: '',
                        searchUser: $state.params.code || '',
                        searchDateFrom: '',
                        searchDateTo: '',
                        searchType: 'Type',
                        searchStatus: 'Status',
                        searchCurrency: {code: 'Currency'},
                        searchOrderBy: 'Latest',
                        searchSubType: ''
                    };
                    $scope.getLatestTransactions();
                }
            }, function(){
            });
        };

    }
})();
