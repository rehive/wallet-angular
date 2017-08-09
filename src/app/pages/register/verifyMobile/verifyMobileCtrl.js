(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verifyMobile')
        .controller('VerifyMobileCtrl', VerifyMobileCtrl);

    /** @ngInject */
    function VerifyMobileCtrl($rootScope,$scope,$http,cookieManagement,environmentConfig,$location,errorToasts,userVerification) {

        var vm = this;
        $scope.path = $location.path();
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.userTel = {
            number: ''
        };

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
                errorToasts.evaluateErrors(error.data);
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
    }
})();
