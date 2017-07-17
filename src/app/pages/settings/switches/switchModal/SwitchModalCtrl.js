(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.switches')
        .controller('SwitchModalCtrl', SwitchModalCtrl);

    function SwitchModalCtrl($scope,$uibModalInstance,switches,toastr,$http,API,cookieManagement,errorToasts,errorHandler) {

        var vm = this;

        $scope.switches = switches;
        $scope.deletingSwitches = false;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.deleteSwitches = function () {
            $scope.deletingSwitches = true;
            $http.delete(API + '/admin/switches/' + $scope.switches.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingSwitches = false;
                if (res.status === 200) {
                    toastr.success('Switch successfully deleted');
                    $uibModalInstance.close($scope.switches);
                }
            }).catch(function (error) {
                $scope.deletingSwitches = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
