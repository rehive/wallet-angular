(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.stellarService.stellarServiceTransactions')
        .controller('StellarServiceTransactionsCtrl', StellarServiceTransactionsCtrl);

    /** @ngInject */
    function StellarServiceTransactionsCtrl($scope,$http,cookieManagement,$uibModal,errorToasts,$window,$location,environmentConfig) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.currenciesList = JSON.parse($window.sessionStorage.currenciesList);

        $scope.pagination = {
            itemsPerPage: 26,
            pageNo: 1,
            maxSize: 5
        };

        $scope.searchParams = {
            searchEmail: '',
            searchType: 'Type',
            searchTxHash:'',
            searchRehiveCode:'',
            searchDateFrom: '',
            searchDateTo: '',
            searchStatus: 'Status',
            searchOrderBy: 'Latest'
        };

        $scope.transactions = [];
        $scope.transactionsStateMessage = '';
        $scope.transactionsData = {};
        $scope.loadingTransactions = false;
        $scope.typeOptions = ['Type','Deposit','Send','Withdraw'];
        $scope.statusOptions = ['Status','Pending','Confirmed','Complete','Failed'];
        $scope.orderByOptions = ['Largest','Latest','Smallest'];

        vm.getTransactionUrl = function(){
            vm.filterParams = '?page=' + $scope.pagination.pageNo + '&page_size=' + $scope.pagination.itemsPerPage
                + '&email=' + $scope.searchParams.searchEmail
                + '&tx_type=' + ($scope.searchParams.searchType == 'Type' ? '' : $scope.searchParams.searchType.toLowerCase())
                + '&transaction_hash=' + $scope.searchParams.searchTxHash
                + '&rehive_code=' + $scope.searchParams.searchRehiveCode
                + '&created__gt=' + ($scope.searchParams.searchDateFrom? Date.parse($scope.searchParams.searchDateFrom) : '')
                + '&created__lt=' + ($scope.searchParams.searchDateTo? Date.parse($scope.searchParams.searchDateTo) : '')
                + '&status=' + ($scope.searchParams.searchStatus == 'Status' ? '' : $scope.searchParams.searchStatus)
                + '&orderby=' + ($scope.searchParams.searchOrderBy == 'Latest' ? '-created' : $scope.searchParams.searchOrderBy == 'Largest' ? '-amount' : $scope.searchParams.searchOrderBy == 'Smallest' ? 'amount' : '');

            return environmentConfig.API.slice(0,-6) + '/services/crypto/transactions/' + vm.filterParams;
        };

        $scope.getLatestTransactions = function(applyFilter){
            if(vm.token){
                $scope.transactionsStateMessage = '';
                $scope.loadingTransactions = true;

                if(applyFilter){
                  // if function is called from history-filters directive, then pageNo set to 1
                    $scope.pagination.pageNo = 1;
                }

                if($scope.transactions.length > 0 ){
                    $scope.transactions.length = 0;
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
                        $scope.transactions = $scope.transactionsData.results;
                        if($scope.transactions == 0){
                            $scope.transactionsStateMessage = 'No transactions yet.';
                            return;
                        }

                        $scope.transactionsStateMessage = '';
                    }
                }).catch(function (error) {
                    $scope.loadingTransactions = false;
                    if(error.status == 403){
                        $location.path('/services');
                        return
                    }
                    $scope.transactionsStateMessage = 'Failed to load data';
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        $scope.getLatestTransactions();

        $scope.openModal = function (page, size,transaction) {
            $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'StellarServiceTransactionsModalCtrl',
                resolve: {
                    transaction: function () {
                        return transaction;
                    }
                }
            });
        };

    }

})();
