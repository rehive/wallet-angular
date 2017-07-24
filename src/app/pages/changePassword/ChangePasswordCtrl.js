(function () {
    'use strict';

    angular.module('BlurAdmin.pages.changePassword')
        .controller('ChangePasswordCtrl', ChangePasswordCtrl);

    /** @ngInject */
    function ChangePasswordCtrl($rootScope,$scope,$http,environmentConfig,cookieManagement,errorToasts,$location,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.passwordChanged = false;

        $scope.goToDashboard = function(){
            $rootScope.securityConfigured = true;
            $location.path('/dashboard');
        };

        $scope.changePassword = function (passwordChangeParams) {
            $scope.changingPassword = true;
            $http.post(environmentConfig.API + '/auth/password/change/', passwordChangeParams, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.changingPassword = false;
                if (res.status === 200) {
                  $scope.passwordChanged = true;
                  toastr.success('You have successfully changed the password!');
                }
            }).catch(function (error) {
                $scope.changingPassword = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };


    }
})();
