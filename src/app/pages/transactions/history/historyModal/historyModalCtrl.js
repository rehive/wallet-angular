(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.history')
        .controller('historyModalCtrl', historyModalCtrl);

    function historyModalCtrl($uibModalInstance,$http,$scope,errorToasts,toastr,transaction,metadataTextService,$location,environmentConfig,cookieManagement,$ngConfirm) {
        $scope.metadata = metadataTextService.convertToText(transaction.metadata);
        $scope.transaction = transaction;
        $scope.updatingTransaction = false;

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.updateTransactionConfirm = function (status) {
                $ngConfirm({
              title: 'Critical Decision',
              content: 'Are you sure you want to edit this transaction?',
              animationBounce: 1,
              animationSpeed: 100,
              scope: $scope,
              buttons: {
                close: {
                    text: "No!",
                    btnClass: 'btn-default'
                },
                ok: {
                    text: "Yes!",
                    btnClass: 'btn-primary',
                    keys: ['enter'], // will trigger when enter is pressed
                    action: function(scope){
                      $scope.updateTransaction(status);
                    }
                }
            },
          });
        }

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
