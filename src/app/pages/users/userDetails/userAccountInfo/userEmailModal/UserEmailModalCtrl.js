(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserEmailModalCtrl', UserEmailModalCtrl);

    function UserEmailModalCtrl($scope,$uibModalInstance,email,user,toastr,$http,environmentConfig,cookieManagement,errorToasts,errorHandler) {

        var vm= this;

        $scope.email = email;
        $scope.user = user;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.verifyingEmail = false;


        $scope.verifyEmail = function () {
            $scope.verifyingEmail = true;
            $http.patch(environmentConfig.API + '/admin/users/emails/' + email.id + '/', {verified: true}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.verifyingEmail = false;
                if (res.status === 200) {
                    toastr.success('Email successfully verified');
                    $uibModalInstance.close($scope.email);
                }
            }).catch(function (error) {
                $scope.verifyingEmail = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

    }
})();
