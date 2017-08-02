(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserBasicInfoCtrl', UserBasicInfoCtrl);

    /** @ngInject */
    function UserBasicInfoCtrl($scope,environmentConfig,$stateParams,$http,cookieManagement,errorToasts,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.uuid = $stateParams.uuid;
        vm.updatedUserBasicInfo = {};
        $scope.editUserBasicInfo = {};
        $scope.loadingUserBasicInfo = true;
        $scope.editingUserBasicInfo = false;

        vm.getUser = function(){
            if(vm.token) {
                $scope.loadingUserBasicInfo = true;
                $http.get(environmentConfig.API + '/admin/users/' + vm.uuid + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingUserBasicInfo = false;
                    if (res.status === 200) {
                        $scope.user = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingUserBasicInfo = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getUser();

        $scope.toggleUserBasicInfoView = function (user) {
            if(user){
                vm.getUserBasicInfo(user);
            } else {
                $scope.editUserBasicInfo = {};
                vm.getUser();
            }
            $scope.editingUserBasicInfo = !$scope.editingUserBasicInfo;
        };

        vm.getUserBasicInfo = function(){
            if(vm.token) {
                $scope.loadingUserBasicInfo = true;
                $http.get(environmentConfig.API + '/admin/users/' + vm.uuid + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingUserBasicInfo = false;
                    if (res.status === 200) {
                        $scope.editUserBasicInfo = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingUserBasicInfo = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.userBasicInfoChanged = function(field){
            vm.updatedUserBasicInfo[field] = $scope.editUserBasicInfo[field];
        };

        $scope.updateUserBasicInfo = function(){
            $scope.editingUserBasicInfo = !$scope.editingUserBasicInfo;
            if(vm.token) {
                $scope.loadingUserBasicInfo = true;
                $http.patch(environmentConfig.API + '/admin/users/' + vm.uuid + '/',vm.updatedUserBasicInfo, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingUserBasicInfo = false;
                    if (res.status === 200) {
                        toastr.success('Successfully updated the user info!');
                        vm.getUser();
                    }
                }).catch(function (error) {
                    $scope.loadingUserBasicInfo = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

    }
})();
