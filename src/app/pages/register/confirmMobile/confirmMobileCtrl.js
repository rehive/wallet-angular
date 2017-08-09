(function () {
    'use strict';

    angular.module('BlurAdmin.pages.confirmMobile')
        .controller('ConfirmMobileCtrl', ConfirmMobileCtrl);

    /** @ngInject */
    function ConfirmMobileCtrl($rootScope,$scope,$http,cookieManagement,environmentConfig,$location,errorToasts,toastr,userVerification) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.mobile = {
            otp: ''
        };

        $scope.goBack = function(){
            $location.path('mobile/verify');
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

        $scope.verifyMobileNumber = function(){
            $http.post(environmentConfig.API + '/auth/mobile/verify/',{otp: $scope.mobile.otp}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $location.path('ethereum/address');
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
