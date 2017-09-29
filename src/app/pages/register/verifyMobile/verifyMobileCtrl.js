(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verifyMobile')
        .controller('VerifyMobileCtrl', VerifyMobileCtrl);

    /** @ngInject */
    function VerifyMobileCtrl($rootScope,$scope,$http,cookieManagement,environmentConfig,$location,errorToasts,userVerification,toastr) {

        var vm = this;
        $scope.path = $location.path();
        $scope.showAuthNav = false;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingMobileVerifyView = true;
        $scope.userTel = {
            number: ''
        };

        vm.checkIfMobileVerified = function(number){
            $scope.loadingMobileVerifyView = true;
            userVerification.verifyMobile(function(err,verified){
                if(verified){
                    $scope.loadingMobileVerifyView = false;
                    $rootScope.mobileVerified = true;
                    $location.path('/identity/verification');
                } else {
                    $scope.loadingMobileVerifyView = false;
                }
            },number);
        };

        vm.getUserInfo = function(){
            $scope.loadingMobileVerifyView = true;
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
                        $scope.loadingMobileVerifyView = false;
                    }
                }
            }).catch(function (error) {
                $scope.loadingMobileVerifyView = false;
                if(error.status == 403 || error.status == 401){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };
        vm.getUserInfo();

        $scope.addMobile = function(){
            $rootScope.$pageFinishedLoading = false;
            $http.post(environmentConfig.API + '/user/mobiles/',{number: $scope.userTel.number,primary: true}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $rootScope.$pageFinishedLoading = true;
                if (res.status === 201) {
                    $location.path('/mobile/confirm');
                }
            }).catch(function (error) {
                $rootScope.$pageFinishedLoading = true;
                if(error.status == 403 || error.status == 401){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.goToNextView = function(){
            $location.path('identity/verification');
        };
    }
})();
