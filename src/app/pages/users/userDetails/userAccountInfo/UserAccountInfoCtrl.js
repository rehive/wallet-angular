(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserAccountInfoCtrl', UserAccountInfoCtrl);

    /** @ngInject */
    function UserAccountInfoCtrl($scope,API,$stateParams,$http,cookieManagement,errorToasts,toastr) {

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

        $scope.verifyEmail = function(email){
            if(vm.token) {
                $http.get(API + '/admin/users/emails/' + email.id + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        toastr.success('Email successfully verified.');
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

        $scope.verifyMobile = function(mobile){
            if(vm.token) {
                $scope.loadingUserAccountInfo = true;
                $http.get(API + '/admin/users/emails/' + mobile.id + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        toastr.success('Mobile number successfully verified.');
                    }
                }).catch(function (error) {
                    $scope.loadingUserAccountInfo = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

    }
})();
