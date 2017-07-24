(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserSwitchModalCtrl', UserSwitchModalCtrl);

    function UserSwitchModalCtrl($scope,$uibModalInstance,userSwitches,uuid,toastr,$http,environmentConfig,cookieManagement,errorToasts,errorHandler) {

        var vm = this;

        $scope.userSwitches = userSwitches;
        vm.uuid = uuid;
        $scope.deletingUserSwitches = false;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.deleteUserSwitch = function () {
            $scope.deletingUserSwitches = true;
            $http.delete(environmentConfig.API + '/admin/users/' + vm.uuid + '/switches/' + $scope.userSwitches.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingUserSwitches = false;
                if (res.status === 200) {
                    toastr.success('User switch successfully deleted');
                    $uibModalInstance.close($scope.userSwitches);
                }
            }).catch(function (error) {
                $scope.deletingUserSwitches = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
