(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.history')
        .controller('historyModalCtrl', historyModalCtrl);

    function historyModalCtrl($uibModalInstance,$http,$scope,errorToasts,toastr,transaction,metadataTextService,$location,environmentConfig,cookieManagement) {
        $scope.metadata = metadataTextService.convertToText(transaction.metadata);
        $scope.transaction = transaction;
        $scope.updatingTransaction = false;

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.updateTransaction = function(status){
            $scope.updatingTransaction = true;
            $http.patch(environmentConfig.API + '/admin/transactions/' + $scope.transaction.id + '/', { status: status },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                if (res.status === 200) {
                    $scope.updatingTransaction = false;
                    if(status == 'Complete'){
                        toastr.success('Transaction successfully updated, marked as Complete');
                    } else {
                        toastr.success('Transaction successfully updated, marked as Failed');
                    }
                    $uibModalInstance.close($scope.transaction);
                }
            }).catch(function (error) {
                console.log('error format needs to be fixed');
                console.log(error);
                $scope.updatingTransaction = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.goToUser = function () {
            $uibModalInstance.close();
            $location.path('/user/' + $scope.transaction.user.identifier);
        }
    }

})();
