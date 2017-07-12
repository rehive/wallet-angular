(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings.tierFees')
        .controller('TierFeesModalCtrl', TierFeesModalCtrl);

    function TierFeesModalCtrl($scope,$uibModalInstance,tierFee,selectedTier,toastr,$http,API,cookieManagement,errorToasts,errorHandler) {

        var vm = this;

        console.log(selectedTier);
        $scope.tierFee = tierFee;
        $scope.selectedTier = selectedTier;
        $scope.deletingTierFees = false;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.deleteTierFee = function () {
            $scope.deletingTierFees = true;
            $http.delete(API + '/admin/tiers/' + $scope.selectedTier.id + '/fees/' + $scope.tierFee.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingTierFees = false;
                if (res.status === 200) {
                    toastr.success('Tier fee successfully deleted');
                    $uibModalInstance.close($scope.tierFee);
                }
            }).catch(function (error) {
                $scope.deletingTierFees = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
