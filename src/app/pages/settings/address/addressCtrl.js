(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.address')
        .controller('AddressCtrl', AddressCtrl);

    /** @ngInject */
    function AddressCtrl($scope,environmentConfig,errorHandler,$http,cookieManagement,errorToasts,toastr,$location) {
        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingAccountInfo = true;
        $scope.showAdminEmails = false;
        vm.updatedAddress = {};

        $scope.accountInfoChanged = function(field){
            vm.updatedAddress[field] = $scope.address[field];
        };

        vm.getAdminAccountInfo = function () {
            if(vm.token) {
                $http.get(environmentConfig.API + '/user/address/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingAccountInfo = false;
                    if (res.status === 200) {
                        $scope.address = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingAccountInfo = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getAdminAccountInfo();

        $scope.updateAddress = function(){
            $scope.loadingAccountInfo = true;
            $http.patch(environmentConfig.API + '/user/address/', vm.updatedAddress ,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingAccountInfo = false;
                if (res.status === 200) {
                    $scope.address = res.data.data;
                    toastr.success('You have successfully updated the administrator info!');
                }
                vm.updatedAdministrator = {};
            }).catch(function (error) {
                vm.updatedAddress = {};
                $scope.loadingAccountInfo = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

    }
})();
