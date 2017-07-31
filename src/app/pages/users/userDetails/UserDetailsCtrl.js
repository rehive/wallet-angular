(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserDetailsCtrl', UserDetailsCtrl);

    /** @ngInject */
    function UserDetailsCtrl($scope,environmentConfig,$http,cookieManagement,Upload,$timeout,errorToasts,$stateParams,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.uuid = $stateParams.uuid;
        $scope.user = {};
        $scope.user.profile = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";
        $scope.loadingUser = true;
        $scope.updatingProfilePic = false;
        $scope.profilePictureFile = {
            file: {}
        };

        vm.getUser = function(){
            if(vm.token) {
                $scope.loadingUser = true;
                $http.get(environmentConfig.API + '/admin/users/' + vm.uuid + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingUser = false;
                    if (res.status === 200) {
                        $scope.user = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingUser = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getUser();

        $scope.toggleProfilePictureView = function () {
            $scope.updatingProfilePic = !$scope.updatingProfilePic;
        };

        $scope.uploadProfilePicture = function () {
            $scope.loadingUser = true;
            $scope.updatingProfilePic = !$scope.updatingProfilePic;
            Upload.upload({
                url: environmentConfig.API + '/admin/users/' + vm.uuid + '/',
                data: {
                    profile: $scope.profilePictureFile.file
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token},
                method: "PATCH"
            }).then(function (res) {
                if (res.status === 200) {
                    $timeout(function(){
                        toastr.success('User profile picture successfully changed');
                        vm.getUser();
                    },0);
                }
            }).catch(function (error) {
                $scope.loadingUser = false;
                errorToasts.evaluateErrors(error.data);
            })
        };

    }
})();
