(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.history')
        .controller('HistoryCtrl', HistoryCtrl);

    /** @ngInject */
    function HistoryCtrl($scope,API,$http,cookieManagement) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.searchType = 'Type';
        $scope.typeOptions = ['Type','Deposit','Transfer','Withdraw'];

        $scope.searchStatus = 'Status';
        $scope.statusOptions = ['Status','Cancelled','Claimed','Complete','Denied','Expired','Failed','Incoming',
                                'Incomplete','Pending','Processing','Reversed','Unclaimed','Uncredited','Waiting'];
        $scope.transactions = [];
        $scope.transactionsStateMessage = 'Loading Transactions...';

        $scope.searchCurrency= {};
        $scope.currencyOptions = [];

        $scope.orderBy = 'Order By';
        $scope.orderByOptions = ['Order By','Largest','Latest','Smallest'];


        vm.getCompanyCurrencies = function(){
            $http.get(API + '/company/currencies/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.searchCurrency.code = res.data.data.results[0].code;
                    $scope.currencyOptions = res.data.data.results;
                }
            }).catch(function (error) {
                console.log(error);
            });
        };
        vm.getCompanyCurrencies();

        vm.getLatestTransactions = function(){
            $http.get(API + '/admin/transactions/?orderby=-created&page_size=10', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    if(res.data.data.results.length == 0){
                        $scope.transactionsStateMessage = 'No Transactions Have Been Made';
                    }
                    $scope.transactions = res.data.data.results;
                }
            }).catch(function (error) {
                $scope.transactionsStateMessage = 'Failed To Load Data';
                console.log(error);
            });
        };
        vm.getLatestTransactions();


    }

})();