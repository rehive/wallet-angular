(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserControlsCtrl', UserControlsCtrl);

    /** @ngInject */
    function UserControlsCtrl($scope,API,$stateParams,$http,cookieManagement,errorToasts,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.uuid = $stateParams.uuid;
        $scope.companyImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";
        $scope.loadingUser = true;


    }
})();
