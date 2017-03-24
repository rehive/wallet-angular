(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.history')
        .controller('HistoryCtrl', HistoryCtrl);

    /** @ngInject */
    function HistoryCtrl($scope,API,$http,cookieManagement,$uibModal) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.pageSize = 25;
        vm.orderBy = '-created';

        $scope.page = 1;
        $scope.searchParams = {
            searchUser:'',
            date_from: '',
            date_to: '',
            searchType: 'Type',
            searchStatus: 'Status',
            searchCurrency: {},
            orderBy: 'Latest'
        };

        $scope.transactions = [];
        $scope.loadingTransactions = false;
        $scope.transactionsStateMessage = 'Loading Transactions...';
        $scope.typeOptions = ['Type','Deposit','Transfer','Withdraw'];
        $scope.statusOptions = ['Status','Cancelled','Claimed','Complete','Denied','Expired','Failed','Incoming',
                                'Incomplete','Pending','Processing','Reversed','Unclaimed','Uncredited','Waiting'];
        $scope.currencyOptions = [];
        $scope.orderByOptions = ['Largest','Latest','Smallest'];

        vm.getCompanyCurrencies = function(){
            $http.get(API + '/company/currencies/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    res.data.data.results.splice(0,0,{code: 'Currency'});
                    $scope.searchParams.searchCurrency.code = "Currency";
                    $scope.currencyOptions = res.data.data.results;
                }
            }).catch(function (error) {
                console.log(error);
            });
        };
        vm.getCompanyCurrencies();

        $scope.getLatestTransactions = function(){
            $scope.loadingTransactions = true;
            $scope.transactions = [];

            vm.filterParams = '?page=' + $scope.page + '&page_size=' + vm.pageSize + '&orderby=' + vm.orderBy ;  // all the params of the filtering

            //console.log($scope.searchParams.searchUser);
            //console.log(API + '/admin/transactions/' + vm.filterParams);

            $http.get(API + '/admin/transactions/' + vm.filterParams, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + vm.token
                }
            }).then(function (res) {
                $scope.loadingTransactions = false;
                if (res.status === 200) {
                    if(res.data.data.results.length == 0){
                        $scope.transactionsStateMessage = 'No Transactions Have Been Made';
                    }
                    $scope.transactions = res.data.data.results;
                    //console.log($scope.transactions);
                }
            }).catch(function (error) {
                $scope.loadingTransactions = false;
                $scope.transactionsStateMessage = 'Failed To Load Data';
                console.log(error);
            });
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