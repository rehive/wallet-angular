(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verification')
        .controller('VerificationCtrl', VerificationCtrl);

    /** @ngInject */
    function VerificationCtrl($rootScope,$scope,$http,toastr,cookieManagement,API,$location,errorToasts,userVerification,_) {

        var vm = this;
        vm.user = {};
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.verifyUser = function(){
            userVerification.verify(function(err,verified){

                if(verified){
                    $rootScope.userVerified = true;
                    $location.path('/company/name_request');
                } else {
                    toastr.error('Please verify your account','Message');
                }
            });
        };

        vm.getUserInfo = function(){
            $http.get(API + '/user/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    vm.user = res.data.data;
                }
            }).catch(function (error) {
                errorToasts.evaluateErrors(error.data);
            });
        };
        vm.getUserInfo();

        $scope.resendEmail = function(){
            $http.post(API + '/auth/email/verify/resend/',{identifier: vm.user.email,company_id: vm.user.company}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
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
