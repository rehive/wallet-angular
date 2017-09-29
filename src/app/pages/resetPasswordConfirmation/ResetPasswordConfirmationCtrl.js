(function () {
    'use strict';

    angular.module('BlurAdmin.pages.resetPasswordConfirmation')
        .controller('ResetPasswordConfirmationCtrl', ResetPasswordConfirmationCtrl);

    /** @ngInject */
    function ResetPasswordConfirmationCtrl($scope,$stateParams,$http,toastr,$location,environmentConfig,errorToasts) {

        var vm = this;
        $scope.passwordResetDone = false;
        $scope.resettingPassword = false;
        $scope.passwordResetParams = {};
        vm.passwordResetObj = $location.search();

        $scope.resetPassword = function(passwordResetParams){
            $scope.resettingPassword = true;
            $http.post(environmentConfig.API + '/auth/password/reset/confirm/', {
                new_password1: passwordResetParams.new_password1,
                new_password2: passwordResetParams.new_password2,
                uid: vm.passwordResetObj.uid,
                token: vm.passwordResetObj.token
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.resettingPassword = true;
                    $scope.passwordResetDone = true;
                    $location.search('uid', null);
                    $location.search('token', null);
                    toastr.success(res.data.message);
                }
            }).catch(function (error) {
                toastr.error("Password reset failed");
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.goToLogin = function(){
            $location.path('/login');
        }

    }
})();
