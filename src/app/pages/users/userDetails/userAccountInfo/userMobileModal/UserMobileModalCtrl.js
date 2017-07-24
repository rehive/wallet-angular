(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserMobileModalCtrl', UserMobileModalCtrl);

    function UserMobileModalCtrl($scope,$uibModalInstance,mobile,user,toastr,$http,environmentConfig,cookieManagement,errorToasts,errorHandler) {

        var vm= this;

        $scope.mobile = mobile;
        $scope.user = user;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.verifyingMobile = false;

        $scope.verifyMobile = function () {
            $scope.verifyingMobile = true;
            $http.patch(environmentConfig.API + '/admin/users/mobiles/' + mobile.id + '/', {verified: true}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.verifyingMobile = false;
                if (res.status === 200) {
                    toastr.success('Mobile number successfully verified');
                    $uibModalInstance.close($scope.mobile);
                }
            }).catch(function (error) {
                $scope.verifyingMobile = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };
    }
})();
