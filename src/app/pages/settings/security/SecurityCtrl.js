(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.security')
        .controller('SecurityCtrl', SecurityCtrl);

    /** @ngInject */
    function SecurityCtrl($scope,$uibModal,$location,environmentConfig,$http,cookieManagement,toastr,errorToasts) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingAPITokens = true;
        $scope.addingToken = false;
        $scope.createTokenData = {};
        $scope.createTokenData.tokenPassword = '';
        $scope.password = {};

        $scope.enableTwoFactorAuth = function(){
            $location.path('/authentication/two-factor');
        };

        $scope.changePassword = function(){
            console.log($scope.password);
            $scope.loadingSecurity=true;
            $http.post(environmentConfig.API + '/auth/password/change/',$scope.password,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                    if (res.status === 200) {
                        $scope.password={};
                        toastr.success(res.data.message);
                        $scope.loadingSecurity=false;
                    }
            }).catch(function (error) {
                $scope.loadingSecurity=false;
                errorToasts.evaluateErrors(error.data);
            });
        }

    }
})();
