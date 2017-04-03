(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.history')
        .controller('HistoryCtrl', HistoryCtrl);

    /** @ngInject */
    function HistoryCtrl($rootScope,$scope,API,$http,cookieManagement,$uibModal) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.pageSize = 25;
        vm.orderBy = '-created';

        $scope.page = 1;
        $scope.searchParams = {
            txCode: '',
            searchUser:'',
            date_from: '',
            date_to: '',
            searchType: '',
            searchStatus: '',
            searchCurrency: {},
            orderBy: 'Latest'
        };

        //used rootscope to communicate between directives
        $rootScope.transactions = [];
        $rootScope.transactionsStateMessage = '';
        $scope.loadingTransactions = false;
        $scope.typeOptions = ['','deposit','transfer','withdraw'];
        $scope.statusOptions = ['','Cancelled','Claimed','Complete','Denied','Expired','Failed','Incoming',
                                'Incomplete','Pending','Processing','Reversed','Unclaimed','Uncredited','Waiting'];
        $scope.currencyOptions = [];
        $scope.orderByOptions = ['Largest','Latest','Smallest'];

        $scope.$on('$locationChangeStart', function( event ) {
            delete $rootScope.transactions;
            delete $rootScope.transactionsStateMessage;
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

        $scope.getLatestTransactions = function(){
            $scope.loadingTransactions = true;
            if($rootScope.transactions.length > 0 ){
                $rootScope.transactions.length = 0;
            }

            vm.filterParams = '?page=' + $scope.page + '&page_size=' + vm.pageSize + '&orderby=' + vm.orderBy
                + '&tx_code=' + $scope.searchParams.txCode + '&tx_type=' + $scope.searchParams.searchType
                + '&status=' + $scope.searchParams.searchStatus; // all the params of the filtering

            //console.log($scope.searchParams.searchUser);
            console.log(API + '/admin/transactions/' + vm.filterParams);

            var transactionsUrl = API + '/admin/transactions/' + vm.filterParams;

            $http.get(transactionsUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + vm.token
                }
            }).then(function (res) {
                $scope.loadingTransactions = false;
                if (res.status === 200) {
                    console.log(res.data.data);
                    $rootScope.transactions = res.data.data.results;
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