(function () {
    'use strict';

    angular.module('BlurAdmin.pages.emailVerify')
        .controller('EmailVerifyCtrl', EmailVerifyCtrl);

    /** @ngInject */
    function EmailVerifyCtrl($rootScope,$scope,$http,toastr,cookieManagement,environmentConfig,$location,errorToasts,userVerification,_) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.showAuthNav = false;
        $scope.loadingEmailVerifyView = true;

        vm.checkIfEmailVerified = function(email){
            $scope.loadingEmailVerifyView = true;
            userVerification.verifyEmail(function(err,verified){
                        if(verified){
                            $scope.loadingEmailVerifyView = false;
                            toastr.success('Email verified','Message');
                            $location.path('/mobile/verify');
                        } else {
                            $scope.loadingEmailVerifyView = false;
                        }
                    },email);
        };

        vm.getUserInfo = function(){
            $scope.loadingEmailVerifyView = true;
            $http.get(environmentConfig.API + '/user/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.user = res.data.data;
                    $scope.showAuthNav = true;
                    vm.checkIfEmailVerified(res.data.data.email);
                }
            }).catch(function (error) {
                $scope.loadingEmailVerifyView = false;
                errorToasts.evaluateErrors(error.data);
            });
        };
        vm.getUserInfo();

        $scope.verifyUser = function(email){
            $rootScope.$pageFinishedLoading = false;
            userVerification.verifyEmail(function(err,verified){
                if(verified){
                    $rootScope.$pageFinishedLoading = true;
                    $location.path('/mobile/verify');
                } else {
                    $rootScope.$pageFinishedLoading = true;
                    toastr.error('Please verify your account','Message');
                }
            },email);
        };


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

        $scope.goToNextView = function () {
            $location.path('/mobile/verify');
        }


    }
})();
