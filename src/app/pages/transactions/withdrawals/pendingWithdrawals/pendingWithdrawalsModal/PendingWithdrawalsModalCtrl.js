(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.withdrawals')
        .controller('PendingWithdrawalsModalCtrl', PendingWithdrawalsModalCtrl);

    /** @ngInject */
    function PendingWithdrawalsModalCtrl($rootScope,$scope,$http,API,cookieManagement,toastr,transaction) {
        $scope.transaction = transaction;

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.updateTransaction = function(status){
            $http.put(API + '/admin/transactions/' + $scope.transaction.tx_code + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + vm.token
                },
                data: {
                    status: status
                }
            }).then(function (res) {
                console.log(res);
                if (res.status === 200) {
                    toastr.success('Transaction successfully updated');
                }
            }).catch(function (error) {
                console.log(error);
            });
        };
    }
})();