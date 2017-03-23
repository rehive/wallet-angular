(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.history')
        .controller('HistoryCtrl', HistoryCtrl);

    /** @ngInject */
    function HistoryCtrl($scope,API,$http,cookieManagement) {

        var vm = this;
        $scope.transactions = [];
        $scope.transactionsStateMessage = 'Loading Transactions...';
        vm.token = cookieManagement.getCookie('TOKEN');

        vm.getLatestTransactions = function(){
            $http.get(API + '/admin/transactions/?orderby=-created', {
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