(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.credit')
        .controller('PendingCreditModalCtrl', PendingCreditModalCtrl);

    /** @ngInject */
    function PendingCreditModalCtrl($uibModalInstance,$scope,$http,API,cookieManagement,toastr,transaction,errorToasts,errorHandler) {
        $scope.transaction = transaction;

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.updateTransaction = function(status){
            $http.put(API + '/admin/transactions/' + $scope.transaction.tx_code + '/', { status: status },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
            }).then(function (res) {
                if (res.status === 200) {
                    if(status == 'Complete'){
                        toastr.success('Transaction successfully updated, marked as Complete');
                    } else {
                        toastr.success('Transaction successfully updated, marked as Failed');
                    }
                    $uibModalInstance.dismiss('cancel');
                }
            }).catch(function (error) {
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };
    }
})();
