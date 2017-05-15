(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserControlsCtrl', UserControlsCtrl);

    /** @ngInject */
    function UserControlsCtrl($scope,API,$stateParams,$http,cookieManagement,errorToasts,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.uuid = $stateParams.uuid;
        $scope.loadingUser = true;


    }
})();
