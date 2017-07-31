(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserAddressCtrl', UserAddressCtrl);

    /** @ngInject */
    function UserAddressCtrl($scope,environmentConfig,$stateParams,$http,cookieManagement,errorToasts,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.uuid = $stateParams.uuid;
        $scope.loadingUserAddress = true;

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


    }
})();
