(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserAddressCtrl', UserAddressCtrl);

    /** @ngInject */
    function UserAddressCtrl($scope,environmentConfig,$stateParams,$http,cookieManagement,errorToasts,$uibModal,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.uuid = $stateParams.uuid;
        $scope.userAddressParams = {
            country: 'US'
        };
        vm.updatedUserAddress = {};
        $scope.loadingUserAddress = true;
        $scope.addingUserAddress = false;
        $scope.editingUserAddress = false;
        $scope.editUserAddress = {};

        vm.getUserAddress = function(){
            if(vm.token) {
                $scope.loadingUserAddress = true;
                $http.get(environmentConfig.API + '/admin/users/addresses/?user=' + vm.uuid, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingUserAddress = false;
                    if (res.status === 200) {
                      $scope.userAddresses = res.data.data.results;
                    }
                }).catch(function (error) {
                    $scope.loadingUserAddress = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getUserAddress();

        $scope.toggleAddUserAddressView = function () {
            $scope.addingUserAddress = !$scope.addingUserAddress;
        };

        $scope.addUserAddress = function(userAddressParams){
            if(vm.token) {
                userAddressParams.user = vm.uuid;
                $scope.loadingUserAddress = true;
                $scope.toggleAddUserAddressView();
                $http.post(environmentConfig.API + '/admin/users/addresses/',userAddressParams,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingUserAddress = false;
                    if (res.status === 201) {
                        $scope.userAddressParams = {country: 'US'};
                        toastr.success('Successfully added user address!');
                        vm.getUserAddress()
                    }
                }).catch(function (error) {
                    $scope.loadingUserAddress = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.toggleEditUserAddressView = function (userAddress) {
            if(userAddress){
                vm.getAddress(userAddress);
            } else {
                $scope.editUserAddress = {};
                vm.getUserAddress();
            }

            $scope.editingUserAddress = !$scope.editingUserAddress;
        };

        vm.getAddress = function (userAddress) {
            $scope.loadingUserAddress = true;
            $http.get(environmentConfig.API + '/admin/users/addresses/' + userAddress.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingUserAddress = false;
                if (res.status === 200) {
                    $scope.editUserAddress = res.data.data;
                }
            }).catch(function (error) {
                $scope.loadingUserAddress = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.userAddressChanged =  function (field) {
            vm.updatedUserAddress[field] = $scope.editUserAddress[field];
        };

        $scope.updateUserAddress = function(){
            if(vm.token) {
                $scope.loadingUserAddress = true;
                $scope.editingUserAddress = !$scope.editingUserAddress;
                $http.patch(environmentConfig.API + '/admin/users/addresses/' + $scope.editUserAddress.id + '/',vm.updatedUserAddress,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingUserAddress = false;
                    if (res.status === 200) {
                        vm.updatedUserAddress = {};
                        $scope.editUserAddress = {};
                        toastr.success('Successfully updated user address!');
                        vm.getUserAddress();
                    }
                }).catch(function (error) {
                    $scope.loadingUserAddress = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.openUserAddressModal = function (page, size,address) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'UserAddressModalCtrl',
                scope: $scope,
                resolve: {
                    address: function () {
                        return address;
                    }
                }
            });

            vm.theModal.result.then(function(address){
                if(address){
                    vm.getUserAddress();
                }
            }, function(){
            });
        };


    }
})();
