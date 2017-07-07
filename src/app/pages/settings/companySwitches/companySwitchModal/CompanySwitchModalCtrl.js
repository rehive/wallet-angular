(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('CompanySwitchModalCtrl', CompanySwitchModalCtrl);

    function CompanySwitchModalCtrl($scope,$uibModalInstance,companySwitches,toastr,$http,API,cookieManagement,errorToasts,errorHandler) {

        var vm = this;

        $scope.companySwitches = companySwitches;
        $scope.deletingCompanySwitches = false;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.deleteCompanySwitch = function () {
            $scope.deletingCompanySwitches = true;
            $http.delete(API + '/admin/company/switches/' + $scope.companySwitches.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingCompanySwitches = false;
                if (res.status === 200) {
                    toastr.success('Company Switch successfully deleted');
                    $uibModalInstance.close($scope.companySwitches);
                }
            }).catch(function (error) {
                $scope.deletingCompanySwitches = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
