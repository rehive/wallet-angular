(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.history')
        .controller('HistoryCtrl', HistoryCtrl);

    /** @ngInject */
    function HistoryCtrl($rootScope,$scope,API,$http,cookieManagement,$uibModal) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.pageSize = 25;

        $scope.page = 1;
        $scope.searchParams = {
            txCode: '',
            searchUserFrom:'',
            searchUserTo:'',
            date_from: '',
            date_to: '',
            searchType: 'Type',
            searchStatus: 'Status',
            searchCurrency: {},
            orderBy: 'Latest',
            searchSubType: ''
        };

        //used rootscope to communicate between directives
        $rootScope.transactions = [];
        $rootScope.transactionsStateMessage = '';
        $rootScope.transactionsData = {};
        $scope.loadingTransactions = false;
        $scope.typeOptions = ['Type','Deposit','Transfer','Withdraw'];
        $scope.statusOptions = ['Status','Cancelled','Claimed','Complete','Denied','Expired','Failed','Incoming',
                                'Incomplete','Pending','Processing','Reversed','Unclaimed','Uncredited','Waiting'];
        $scope.currencyOptions = [];
        $scope.orderByOptions = ['Largest','Latest','Smallest'];

        $scope.$on('$locationChangeStart', function( event ) {
            delete $rootScope.transactions;
            delete $rootScope.transactionsStateMessage;
            delete $rootScope.transactionsData;
        });

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

        $scope.getLatestTransactions = function(transactionsUrl){
            $rootScope.transactionsStateMessage = '';
            $scope.loadingTransactions = true;
            if($rootScope.transactions.length > 0 ){
                $rootScope.transactions.length = 0;
            }

            if(!transactionsUrl){
            vm.filterParams = '?page=' + $scope.page + '&page_size=' + vm.pageSize
                + '&orderby=' + ($scope.searchParams.orderBy == 'Latest' ? '-created' : $scope.searchParams.orderBy == 'Largest' ? '-amount' : $scope.searchParams.orderBy == 'Smallest' ? 'amount' : '')
                + '&tx_code=' + $scope.searchParams.txCode
                + '&tx_type=' + ($scope.searchParams.searchType == 'Type' ? '' : $scope.searchParams.searchType.toLowerCase())
                + '&status=' + ($scope.searchParams.searchStatus == 'Status' ? '' : $scope.searchParams.searchStatus)
                + '&subtype=' + $scope.searchParams.searchSubType; // all the params of the filtering

            console.log(API + '/admin/transactions/' + vm.filterParams);

                transactionsUrl = API + '/admin/transactions/' + vm.filterParams;
            }

            $http.get(transactionsUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + vm.token
                }
            }).then(function (res) {
                $scope.loadingTransactions = false;
                if (res.status === 200) {
                    console.log(res.data.data);
                    $rootScope.transactionsData = res.data.data;
                    $rootScope.transactions = $rootScope.transactionsData.results;
                    if($rootScope.transactions == 0){
                        $rootScope.transactionsStateMessage = 'No Transactions Have Been Found';
                        return;
                    }

                    $rootScope.transactionsStateMessage = '';

                }
            }).catch(function (error) {
                $scope.loadingTransactions = false;
                $rootScope.transactionsStateMessage = 'Failed To Load Data';
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