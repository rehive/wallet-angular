(function () {
    'use strict';

    angular.module('BlurAdmin.pages.smsAuth')
        .controller('SmsAuthenticationCtrl', SmsAuthenticationCtrl);

    /** @ngInject */
    function SmsAuthenticationCtrl($scope,$http,environmentConfig,cookieManagement,errorToasts,toastr,$location) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.smsAuthObj = {mobile_number: ''};
        $scope.numberFromGetCall = false;

        $scope.getSmsAuthNumber = function(){
            if(vm.token) {
                $scope.loadingSmsAuth = true;
                $http.get(environmentConfig.API + '/auth/mfa/sms/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        if(res.data.data && res.data.data.mobile_number){
                            $scope.smsAuthObj.mobile_number = res.data.data.mobile_number;
                            $scope.numberFromGetCall = true;
                        }
                        $scope.loadingSmsAuth = false;
                    }
                }).catch(function (error) {
                    $scope.loadingSmsAuth = false;
                    if(error.status == 403 || error.status == 401){
                        errorHandler.handle403();
                        return
                    }
                    //errorToasts.evaluateErrors(error.data);
                });
            }
        };
        $scope.getSmsAuthNumber();

        $scope.deleteSmsAuthNumber = function(){
            if(vm.token) {
                $scope.loadingSmsAuth = true;
                $http.delete(environmentConfig.API + '/auth/mfa/sms/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        toastr.success('Sms authentication disabled successfully');
                        $scope.smsAuthObj = {mobile_number: ''};
                        $scope.numberFromGetCall = false;
                        $scope.loadingSmsAuth = false;
                    }
                }).catch(function (error) {
                    $scope.loadingSmsAuth = false;
                    if(error.status == 403 || error.status == 401){
                        errorHandler.handle403();
                        return
                    }
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.postSmsAuthNumber = function(){
            if(vm.token) {
                $scope.loadingSmsAuth = true;
                $http.post(environmentConfig.API + '/auth/mfa/sms/',{mobile_number: $scope.smsAuthObj.mobile_number}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 201) {
                        toastr.success('Mobile number successfully saved, please enter the OTP to enable sms multi factor authentication');
                        $location.path('/authentication/multi-factor/verify/sms');
                        $scope.loadingSmsAuth = false;
                    }
                }).catch(function (error) {
                    console.log(error)
                    $scope.loadingSmsAuth = false;
                    if(error.status == 403 || error.status == 401){
                        errorHandler.handle403();
                        return
                    }
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };


    }
})();
