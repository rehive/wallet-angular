(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.credit')
        .controller('PendingCreditModalCtrl', PendingCreditModalCtrl);

    /** @ngInject */
    function PendingCreditModalCtrl($uibModalInstance,$scope,$http,environmentConfig,cookieManagement,toastr,transaction,errorToasts,errorHandler,metadataTextService,$location) {
        $scope.metadata = metadataTextService.convertToText(transaction.metadata);
        $scope.transaction = transaction;

        $scope.goToUser = function () {
            $uibModalInstance.close();
            $location.path('/user/' + $scope.transaction.user.identifier);
        };

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.updateTransaction = function(status){
            $http.put(environmentConfig.API + '/admin/transactions/' + $scope.transaction.id + '/', { status: status },
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
                    $uibModalInstance.close($scope.transaction);
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
