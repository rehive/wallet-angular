(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.history')
        .controller('HistoryCtrl', HistoryCtrl);

    /** @ngInject */
    function HistoryCtrl($scope,API,$http,cookieManagement,$uibModal,errorToasts,$state,$window,errorHandler) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.currenciesList = JSON.parse($window.sessionStorage.currenciesList) || [];

        $scope.pagination = {
            itemsPerPage: 26,
            pageNo: 1,
            maxSize: 5
        };

        $scope.searchParams = {
            searchId: '',
            searchUser: $state.params.code || '',
            searchDateFrom: '',
            searchDateTo: '',
            searchType: 'Type',
            searchStatus: 'Status',
            searchCurrency: {},
            searchOrderBy: 'Latest',
            searchSubType: ''
        };

        $scope.transactions = [];
        $scope.transactionsStateMessage = '';
        $scope.transactionsData = {};
        $scope.loadingTransactions = false;
        $scope.typeOptions = ['Type','Credit','Debit']; //Transfer
        $scope.statusOptions = ['Status','Initiating','Processing','Pending','Complete','Failed'];
        $scope.currencyOptions = [];
        $scope.orderByOptions = ['Largest','Latest','Smallest'];

        vm.getCompanyCurrencies = function(){
            //adding currency as default value in both results array and ng-model of currency
            vm.currenciesList.splice(0,0,{code: 'Currency'});
            $scope.searchParams.searchCurrency.code = 'Currency';
            $scope.currencyOptions = vm.currenciesList;
        };
        vm.getCompanyCurrencies();

        vm.getTransactionUrl = function(){
            vm.filterParams = '?page=' + $scope.pagination.pageNo + '&page_size=' + $scope.pagination.itemsPerPage
                + '&created__gt=' + ($scope.searchParams.searchDateFrom? Date.parse($scope.searchParams.searchDateFrom) : '')
                + '&created__lt=' + ($scope.searchParams.searchDateTo? Date.parse($scope.searchParams.searchDateTo) : '')
                + '&currency=' + ($scope.searchParams.searchCurrency.code ? ($scope.searchParams.searchCurrency.code == 'Currency' ? '' : $scope.searchParams.searchCurrency.code) : '')
                + '&user=' + $scope.searchParams.searchUser
                + '&orderby=' + ($scope.searchParams.searchOrderBy == 'Latest' ? '-created' : $scope.searchParams.searchOrderBy == 'Largest' ? '-amount' : $scope.searchParams.searchOrderBy == 'Smallest' ? 'amount' : '')
                + '&id=' + $scope.searchParams.searchId
                + '&tx_type=' + ($scope.searchParams.searchType == 'Type' ? '' : $scope.searchParams.searchType.toLowerCase())
                + '&status=' + ($scope.searchParams.searchStatus == 'Status' ? '' : $scope.searchParams.searchStatus)
                + '&subtype=' + $scope.searchParams.searchSubType; // all the params of the filtering

            return API + '/admin/transactions/' + vm.filterParams;
        };

        $scope.getLatestTransactions = function(applyFilter){
            if(vm.token) {
                $scope.transactionsStateMessage = '';
                $scope.loadingTransactions = true;

                if (applyFilter) {
                    // if function is called from history-filters directive, then pageNo set to 1
                    $scope.pagination.pageNo = 1;
                }

                if ($scope.transactions.length > 0) {
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
                        if ($scope.transactions == 0) {
                            $scope.transactionsStateMessage = 'No Transactions Have Been Found';
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
            $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'historyModalCtrl',
                resolve: {
                    transaction: function () {
                        return transaction;
                    }
                }
            });
        };

    }
})();
