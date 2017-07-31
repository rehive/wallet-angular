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
            country: 'ZA'
        };
        $scope.loadingUserAddress = true;
        $scope.addingUserAddress = false;

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
                        $scope.userAddressParams = {country: 'ZA'};
                        toastr.success('Successfully added user address!');
                        vm.getUserAddress()
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
