(function () {
    'use strict';

    angular.module('BlurAdmin.pages.confirmMobile')
        .controller('ConfirmMobileCtrl', ConfirmMobileCtrl);

    /** @ngInject */
    function ConfirmMobileCtrl($rootScope,$scope,$http,cookieManagement,environmentConfig,$location,errorToasts,toastr,userVerification) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingMobileConfirmView = true;
        $scope.showAuthNav = false;
        $scope.mobile = {
            otp: ''
        };

        $scope.goBack = function(){
            $location.path('mobile/verify');
        };

        vm.checkIfMobileVerified = function(number){
            $scope.loadingMobileConfirmView = true;
            userVerification.verifyMobile(function(err,verified){
                if(verified){
                    $scope.loadingMobileConfirmView = false;
                    toastr.success('Mobile Number verified','Message');
                    $location.path('/identity/verification');
                } else {
                    $scope.loadingMobileConfirmView = false;
                }
            },number);
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
                    $scope.showAuthNav = true;
                    if(res.data.data.mobile_number){
                        vm.checkIfMobileVerified(res.data.data.mobile_number);
                    } else{
                        $scope.loadingMobileConfirmView = false;
                    }
                }
            }).catch(function (error) {
                errorToasts.evaluateErrors(error.data);
            });
        };
        vm.getUserInfo();

        $scope.verifyMobileNumber = function(){
            $http.post(environmentConfig.API + '/auth/mobile/verify/',{otp: $scope.mobile.otp}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $location.path('/identity/verification');
                }
            }).catch(function (error) {
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.resendMobileOtp =  function(){
            $http.post(environmentConfig.API + '/auth/mobile/verify/resend/',{mobile: $scope.user.mobile_number,company: $scope.user.company}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                if (res.status === 200) {
                    toastr.success('Verification otp has been re-sent');
                }
            }).catch(function (error) {
                errorToasts.evaluateErrors(error.data);
            });
        }

    }
})();
