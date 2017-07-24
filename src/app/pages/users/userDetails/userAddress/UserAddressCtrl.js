(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserAddressCtrl', UserAddressCtrl);

    /** @ngInject */
    function UserAddressCtrl($scope,environmentConfig,$stateParams,$http,cookieManagement,errorToasts,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.uuid = $stateParams.uuid;
        $scope.loadingUser = true;


    }
})();
