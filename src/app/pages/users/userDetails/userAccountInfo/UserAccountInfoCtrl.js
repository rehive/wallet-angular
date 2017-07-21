(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserAccountInfoCtrl', UserAccountInfoCtrl);

    /** @ngInject */
    function UserAccountInfoCtrl($scope,API,$stateParams,$uibModal,$http,cookieManagement,errorToasts,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.uuid = $stateParams.uuid;
        $scope.loadingUserAccountInfo = true;

        vm.getUser = function(){
            if(vm.token) {
                $scope.loadingUserAccountInfo = true;
                $http.get(API + '/admin/users/' + vm.uuid + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        $scope.user = res.data.data;
                        vm.getUserEmails();
                    }
                }).catch(function (error) {
                    $scope.loadingUserAccountInfo = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getUser();

        vm.getUserEmails = function(){
            if(vm.token) {
                $http.get(API + '/admin/users/emails/?user=' + vm.uuid, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        $scope.emailsList = res.data.data.results;
                        vm.getUserMobileNumbers();
                    }
                }).catch(function (error) {
                    $scope.loadingUserAccountInfo = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.getUserMobileNumbers = function(){
            if(vm.token) {
                $scope.loadingUserAccountInfo = true;
                $http.get(API + '/admin/users/mobiles/?user=' + vm.uuid, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        $scope.mobilesList = res.data.data.results;
                        $scope.loadingUserAccountInfo = false;
                    }
                }).catch(function (error) {
                    $scope.loadingUserAccountInfo = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.openUserEmailModal = function (page,size,email) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'UserEmailModalCtrl',
                scope: $scope,
                resolve: {
                    email: function () {
                        return email;
                    },
                    user: function () {
                        return $scope.user;
                    }
                }
            });

            vm.theModal.result.then(function(email){
                if(email){
                    vm.getUserEmails();
                }
            }, function(){
            });
        };

        $scope.openUserMobileModal = function (page, size,mobile) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'UserMobileModalCtrl',
                scope: $scope,
                resolve: {
                    mobile: function () {
                        return mobile;
                    },
                    user: function () {
                        return $scope.user;
                    }
                }
            });

            vm.theModal.result.then(function(mobile){
                if(mobile){
                    vm.getUserMobileNumbers();
                }
            }, function(){
            });
        };

    }
})();
