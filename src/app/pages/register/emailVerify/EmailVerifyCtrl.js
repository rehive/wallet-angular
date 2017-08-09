(function () {
    'use strict';

    angular.module('BlurAdmin.pages.emailVerify')
        .controller('EmailVerifyCtrl', EmailVerifyCtrl);

    /** @ngInject */
    function EmailVerifyCtrl($rootScope,$scope,$http,toastr,cookieManagement,environmentConfig,$location,errorToasts,userVerification,_) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.verifyUser = function(){
            $rootScope.$pageFinishedLoading = false;
            userVerification.verify(function(err,verified){
                if(verified){
                    $rootScope.$pageFinishedLoading = true;
                    $rootScope.userEmailVerified = true;
                    $location.path('/mobile/verify');
                } else {
                    $rootScope.$pageFinishedLoading = true;
                    toastr.error('Please verify your account','Message');
                }
            });
        };

        vm.getUserInfo = function(){
            $http.get(environmentConfig.API + '/user/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.user = res.data.data;
                }
            }).catch(function (error) {
                errorToasts.evaluateErrors(error.data);
            });
        };
        vm.getUserInfo();

        $scope.resendEmail = function(){
            $http.post(environmentConfig.API + '/auth/email/verify/resend/',{email: $scope.user.email,company: $scope.user.company}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                if (res.status === 200) {
                    toastr.success('Verification email has been re-sent');
                }
            }).catch(function (error) {
                errorToasts.evaluateErrors(error.data);
            });
        };


    }
})();
