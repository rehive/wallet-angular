(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings.tiers')
        .controller('TierModalCtrl', TierModalCtrl);

    function TierModalCtrl($scope,tier,$uibModalInstance,toastr,$http,API,cookieManagement,errorToasts,errorHandler) {

        var vm = this;

        $scope.tier = tier;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.deletingTier = false;

        $scope.deleteTier = function(tier){
            if(vm.token) {
                $scope.deletingTier = true;
                $http.delete(API + '/admin/tiers/' + $scope.tier.id + '/' ,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                  $scope.deletingTier = false;
                  if (res.status === 200) {
                      toastr.success('Tier successfully deleted');
                      $uibModalInstance.close($scope.tier);
                  }
                }).catch(function (error) {
                    $scope.deletingTier = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };


    }
})();
