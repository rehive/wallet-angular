(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.deposits')
        .controller('PendingDepositsModalCtrl', PendingDepositsModalCtrl);

    /** @ngInject */
    function PendingDepositsModalCtrl($uibModalInstance,$scope,$http,API,cookieManagement,toastr,transaction,errorToasts) {
        $scope.transaction = transaction;

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.updateTransaction = function(status){
            console.log(status);
            $http.put(API + '/admin/transactions/' + $scope.transaction.tx_code + '/', { status: status },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
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
                errorToasts.evaluateErrors(error.data);
            });
        };
    }
})();
