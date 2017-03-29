(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.withdrawals')
        .controller('PendingWithdrawalsModalCtrl', PendingWithdrawalsModalCtrl);

    /** @ngInject */
    function PendingWithdrawalsModalCtrl($uibModalInstance,$scope,$http,API,cookieManagement,toastr,transaction) {
        $scope.transaction = transaction;

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.updateTransaction = function(status){
            $http.put(API + '/admin/transactions/' + $scope.transaction.tx_code + '/',{ status: status },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'JWT ' + vm.token
                    }
            }).then(function (res) {
                console.log(res);
                if (res.status === 200) {
                    if(status == 'Complete'){
                        toastr.success('Transaction successfully updated, marked as Complete');
                    } else {
                        toastr.success('Transaction successfully updated, marked as Failed');
                    }
                    $uibModalInstance.dismiss('cancel');
                }
            }).catch(function (error) {
                console.log(error);
            });
        };
    }
})();