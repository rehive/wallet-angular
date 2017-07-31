(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserAddressModalCtrl', UserAddressModalCtrl);

    function UserAddressModalCtrl($scope,$uibModalInstance,address,toastr,$http,environmentConfig,cookieManagement,errorToasts,errorHandler) {

        var vm = this;

        $scope.userAddress = address;
        $scope.deletingUserAddress = false;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.deleteUserAddress = function () {
            $scope.deletingUserAddress = true;
            $http.delete(environmentConfig.API + '/admin/users/addresses/' + $scope.userAddress.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingUserAddress = false;
                if (res.status === 200) {
                    toastr.success('User address successfully deleted');
                    $uibModalInstance.close($scope.userAddress);
                }
            }).catch(function (error) {
                $scope.deletingUserAddress = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
