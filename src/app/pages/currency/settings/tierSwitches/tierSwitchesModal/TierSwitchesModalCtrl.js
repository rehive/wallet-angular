(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings.tierSwitches')
        .controller('TierSwitchesModalCtrl', TierSwitchesModalCtrl);

    function TierSwitchesModalCtrl($scope,$uibModalInstance,tierSwitch,selectedTier,toastr,$http,API,cookieManagement,errorToasts,errorHandler) {

        var vm = this;

        console.log(selectedTier);
        $scope.tierSwitch = tierSwitch;
        $scope.selectedTier = selectedTier;
        $scope.deletingTierSwitches = false;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.deleteTierSwitch = function () {
            $scope.deletingTierSwitches = true;
            $http.delete(API + '/admin/tiers/' + $scope.selectedTier.id + '/switches/' + $scope.tierSwitch.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingTierSwitches = false;
                if (res.status === 200) {
                    toastr.success('Tier switch successfully deleted');
                    $uibModalInstance.close($scope.tierSwitch);
                }
            }).catch(function (error) {
                $scope.deletingTierSwitches = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
